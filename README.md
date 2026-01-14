# FlexFinance

A responsive, accessible and modern finance multi-page application built with vanilla HTML, CSS, and JavaScript.

The project focused on UI state management, accessibility, and responsive behavior without using frameworks in a real-world scenario.

Live Demo Hosted on Github: https://dlawe7.github.io/FlexFinance/

Screenshot:
![FlexFinance dashboard preview](Assets/dashboard-preview.png)

## How It’s Made

Tech used: HTML5, CSS3, Vanilla JavaScript, Chart.js

What started as a simple dashboard evolved into a complete multi-page banking app, simulating many of the features you would expect in real digital banking all running entirely in the browser with no backend.

The application includes dynamic features such as fetching and displaying live cryptocurrency data, rendering interactive charts with Chart.js and filtering and sorting transactions data.

I structured the application around a shared layout system, where global elements like the header, footer, and sidebar are dynamically loaded and controlled through a central JavaScript handler. This allowed each page to remain lightweight while maintaining consistent behavior and accessibility across the entire app.

Each feature page (dashboard, transaction history, forum, etc.) manages its own state and logic independently while reusing shared utilities for data fetching, formatting, and UI toggling. This separation helped keep the codebase modular and easier to reason about as the project grew.

Special attention was given to accessibility and user experience, including keyboard navigation, focus management, ARIA attributes, and mobile-first responsive behavior.

The project was intentionally built with Vanilla JavaScript to deepen my understanding of core front-end concepts before moving on to frameworks.

## Optimizations

As the application grew, global elements such as the header, sidebar, and footer were required to be reused across pages. Dynamic loaded was needed and, hence, executed via a centralized JavaScript controller. This removed duplication, ensured consistent behavior throughout the app, and made it easier to evolve features without touching every page individually. 

That architectural change alone marked a major optimization in both maintainability and scalability.

Early versions of the code were repetitive and tightly coupled. As the application grew, I refactored heavily, extracting shared logic into general-purpose functions and utilities. Interactive behaviors were redesigned to work as a system rather than as isolated handlers. 

For example, elements marked with shared data attributes and toggleable classes are automatically handled by global listeners for Escape-key closing, click-outside behavior, and state cleanup.

This system-based approach significantly reduced redundant event listeners and allowed new interactive components to be added with minimal additional logic, improving both readability and long-term maintainability.

Accessibility became a natural part of optimization rather than a checklist item. Building the UI made it clear how frustrating it was when expected keyboard interactions, like closing menus with the Escape key, didn’t work. This led me to actively apply accessibility principles, including keyboard navigation, focus management, and semantic controls.

Rather than treating accessibility as an afterthought, it was integrated into the design of interactive components and guided many refactoring decisions.

Much of this optimization work came from revisiting earlier choices and deliberately improving them as my understanding of front-end architecture, user experience, and maintainability evolved.

## Lessons Learned

This project was my first serious front-end application. Diving straight into building it taught me more in a few months than I could have learned otherwise.  

Some of the key lessons included:

- **Modular thinking and component reuse:** I learned the importance of separating shared layout elements (header, footer, sidebar) from page-specific logic. This made the codebase easier to maintain, extend, and debug.  

- **Refactoring is not optional:** Early code was repetitive and scattered. Rebuilding parts of the project multiple times taught me how to write flexible, reusable utilities and event handlers that scale as the app grows.  

- **Accessibility is fundamental:** Trying to interact with my own UI made me realize accessibility isn’t just for compliance, it’s about meeting natural user expectations. Keyboard navigation, focus management, and semantic structure became key parts of my design process.  

- **Practical problem-solving:** Every challenge, from toggling menus to dynamically rendering data with Chart.js, reinforced how to break problems down and implement robust solutions with vanilla JavaScript.  

- **Front-end state management:** Handling independent page states while keeping shared logic centralized showed me how to manage UI state without a framework.
