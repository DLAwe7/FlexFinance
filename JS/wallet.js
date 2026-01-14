import {fetchData} from './Components/fetchData.js';
import { formatNumber } from './functionality.js';

let fetchedData;


document.addEventListener("DOMContentLoaded", function(){
   
    (async function (){
        const userData = await fetchData("./JSON/user-data.json");

        fetchedData = userData

        displayGraph(userData);

        document.querySelector(".portfolio-value").textContent = `💰 Total Portfolio Value: ${fetchedData.crypto.balance}$`;
    })();


});

function displayGraph(userData){

    let themeColor;
    if(localStorage.getItem("theme") === "light"){
      themeColor = "black";
    } else{
      themeColor = "white"
    };

    function percentage(total, percentage){
        return (total * percentage) / 100;
    } 

    const walletData = userData.crypto.coins.map(coin => ({
        reason: coin.name, value: percentage(userData.crypto.balance, coin.amount), percentage: coin.amount
    }));
    
    const doughnutCtx = document.getElementById("wallet-chart");

if (doughnutCtx) {
const chart = new Chart(doughnutCtx, {
        type: "doughnut",
        data: {
            labels: walletData.map((row) => row.reason),
            datasets: [
                {
                    label: `${userData.currency}`,
                    data: walletData.map((row) => row.value),
                    backgroundColor: [
                        "hsl(50, 100%, 50%)",
                        "hsl(210, 80%, 35%)",
                        "hsl(140, 70%, 35%)",
                        "hsl(350, 70%, 45%)",
                        "hsl(25, 80%, 50%)",
                        "hsl(280, 60%, 45%)",
                        "hsl(190, 70%, 40%)",
                        "hsl(0, 0%, 65%)"
                    ]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    const htmlLegend = document.getElementById("html-legend");
        htmlLegend.innerHTML = "";

        walletData.forEach((coin, index) => {
            const li = document.createElement("li");

            const box = document.createElement("span");
            box.classList.add("little-box");
            box.setAttribute("aria-hidden", true);
            const reason = document.createElement("span");
            reason.textContent = `${coin.reason}`
            const coinPercentage = document.createElement("span");
            coinPercentage.textContent = `${coin.percentage}%`;

            box.style.backgroundColor = chart.data.datasets[0].backgroundColor[index];
       
            li.appendChild(box);
            li.appendChild(reason);
            li.appendChild(coinPercentage);
            htmlLegend.appendChild(li);
        });

} else {
    console.error("Doughnut Chart canvas element not found!");
}


}

