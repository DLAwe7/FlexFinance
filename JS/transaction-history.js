import { fetchData } from './Components/fetchData.js';
import { formatNumber } from './functionality.js';

let allTransactions = [];
let filteredTransactions = [];
let visibleCount = 10;
let currentSort = { column: null, asc: true };

function formatDateEU(isoDate) {
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

const parseDate = (isoDate) => new Date(isoDate);

document.addEventListener("DOMContentLoaded", async () => {
    const userHistory = await fetchData("./JSON/user-history.json");

    allTransactions = userHistory;
    filteredTransactions = [...allTransactions];

    renderTransactions(filteredTransactions);
    setupFilters();
});

function renderTransactions(data) {
    const table = document.querySelector(".transactions-history");

    table.innerHTML = `
        <thead>
            <tr id="rowTitle">
                <th role="columnheader" tabindex="0" data-column="date" aria-label="Sort by date" aria-sort="none">
                    Date <i class="fa-solid fa-sort" aria-hidden="true"></i>
                </th>
                <th role="columnheader" tabindex="0" data-column="reason" aria-label="Sort by reason" aria-sort="none">
                    Reason <i class="fa-solid fa-sort" aria-hidden="true"></i>
                </th>
                <th role="columnheader" tabindex="0" data-column="amount" aria-label="Sort by transaction" aria-sort="none">
                    Transaction <i class="fa-solid fa-sort" aria-hidden="true"></i>
                </th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const dataToShow = data.slice(0, visibleCount);

    const tbody = table.querySelector("tbody");

    dataToShow.forEach(item => {
        const sign = item.expense ? "-" : "+";
        const row = document.createElement("tr");
        row.classList.add("table-row");

        row.innerHTML = `
            <td>${formatDateEU(item.date)}</td>
            <td>${item.reason}</td>
            <td>${sign} ${formatNumber(item.amount)}${item.currency}</td>
        `;

        tbody.append(row);
    });

    handleLoadMoreButton(data);
    attachSortingHandlers();
}

function handleLoadMoreButton(data) {
    const loadMoreBtn = document.getElementById("load-more");
    const wrapper = document.querySelector(".transaction-button-wrapper");

    if (data.length > visibleCount) {
        loadMoreBtn.style.display = "block";
        wrapper.style.display = "block";
    } else {
        loadMoreBtn.style.display = "none";
        wrapper.style.display = "none";
    }

    loadMoreBtn.onclick = () => {
        visibleCount += 10;
        renderTransactions(filteredTransactions);
    };
}

function attachSortingHandlers() {
    document.querySelectorAll("th[role='button']").forEach(th => {
        th.onclick = () => sortData(th.dataset.column);
    });
}

function sortData(column) {
    if (currentSort.column === column) {
        currentSort.asc = !currentSort.asc;
    } else {
        currentSort = { column, asc: true };
    }

    document.querySelectorAll(".transactions-history th[role='button']").forEach(th => {
        if (th.dataset.column === column) {
            th.setAttribute('aria-sort', currentSort.asc ? 'ascending' : 'descending');
        } else {
            th.setAttribute('aria-sort', 'none');
        }
    });

    filteredTransactions.sort((a, b) => {
        let valA = a[column], valB = b[column];

        if (column === "amount") return currentSort.asc ? valA - valB : valB - valA;
        if (column === "date") {
            const da = parseDate(valA);
            const db = parseDate(valB);
            return currentSort.asc ? da - db : db - da;
        }
        return currentSort.asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    renderTransactions(filteredTransactions);
}

function setupFilters() {
    const searchInput = document.getElementById("search-filter");
    const dateInput = document.getElementById("date-filter");

    searchInput.addEventListener("input", () => {
        const term = searchInput.value.toLowerCase();

        filteredTransactions = allTransactions.filter(t =>
            t.reason.toLowerCase().includes(term) ||
            String(t.amount).includes(term) ||
            formatDateEU(t.date).includes(term)
        );

        visibleCount = 10;
        renderTransactions(filteredTransactions);
    });

    dateInput.addEventListener("input", () => {
        const dateVal = dateInput.value;

        filteredTransactions = dateVal
            ? allTransactions.filter(t => t.date === dateVal)
            : [...allTransactions];

        visibleCount = 10;
        renderTransactions(filteredTransactions);
    });
}
