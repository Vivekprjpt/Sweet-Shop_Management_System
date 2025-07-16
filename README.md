# Sweet-Shop_Management-System


## Objective
This project implements a simple Sweet Shop Management System that allows users to perform basic operations such as adding sweets, updating sweet details, deleting sweets, searching, sorting, and managing inventory (purchasing and restocking). It includes both a backend server for data management and a simple frontend interface for user interaction.

## Features

* **Add Sweets:** Add new sweets with a unique ID, name, category, price, and quantity.
* **Delete Sweets:** Remove sweets from the shop by their ID.
* **View Sweets:** Display a list of all sweets currently available in the shop.
* **Search Sweets:** Search for sweets by name, category, or price range.
* **Sort Sweets:** Sort the list of sweets by various criteria (e.g., name, category, price, quantity).
* **Purchase Sweets:** Decrease the quantity of sweets in stock, with checks for insufficient stock.
* **Restock Sweets:** Increase the quantity of sweets in stock.
* **Frontend Interface:** A basic web interface to interact with the system.

## Technologies Used

* **Backend:** Node.js (with Express.js, as indicated by `app.js` using `fetch` with `localhost:3000`)
* **Frontend:** HTML, CSS, JavaScript (ES Modules)
* **Testing:** Jest
* **Module System:** ES Modules (`"type": "module"` in `package.json`)

## Project Structure


sweet-shop/
├── package.json
├── jest.config.mjs
├── README.md
├── .gitignore
├── src/
│   ├── models/
│   │   └── Sweet.js         # Defines the Sweet data structure
│   ├── services/
│   │   └── SweetShop.js     # Core business logic for sweet management
│   └── server.js            # Backend server (e.g., Express.js API)
├── tests/
│   └── sweetshop.test.js    # Unit tests for SweetShop logic
└── frontend/
├── index.html           # Main HTML file for the UI
├── app.js               # Frontend JavaScript logic (interacts with backend API)
└── style.css            # Styling for the frontend


## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd sweet-shop
    ```
    (Replace `<your-repository-url>` with the actual URL of your Git repository.)

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install all necessary backend and testing dependencies.

## Running the Application

This application consists of a backend API and a frontend interface. Both need to be running to fully utilize the system.

### 1. Start the Backend Server

The frontend (`app.js`) expects a backend API running on `http://localhost:3000`.

To start the backend server:
```bash
node src/server.js


The server should start and typically indicate the port it's listening on (e.g., "Server running on port 3000").

2. Run the Frontend Interface
Once the backend is running, you can open the frontend in your browser.

Option A: Using a local server (Recommended)
For the best experience and to avoid CORS issues, use a simple local server.
If you don't have serve installed globally:

Bash

npm install -g serve
Then, navigate to the frontend directory and start the server:

Bash

cd frontend
serve
Open the URL provided by serve (e.g., http://localhost:3000 or http://127.0.0.1:5000) in your web browser.

Option B: Opening index.html directly (May have limitations)
You can directly open frontend/index.html in your web browser. However, due to browser security restrictions (CORS policy), the fetch calls to http://localhost:3000/sweets from a file:// URL might be blocked, preventing the frontend from communicating with the backend. Using a local server (Option A) is highly recommended.

Running Tests
To run the unit tests for the Sweet Shop logic:

Bash

npm test
This will execute the tests defined in tests/sweetshop.test.js using Jest.

Possible Enhancements
Error Handling: More robust error handling and user feedback in the UI.

Persistence: Store sweet data persistently (e.g., in a database like SQLite, MongoDB, or a JSON file) so it's not lost when the server restarts.

Authentication/Authorization: Implement user accounts and secure API endpoints.

Advanced Search/Sorting: Add more sophisticated search criteria and sorting options.

Responsive Design: Improve UI responsiveness for different screen sizes.

Input Validation: More comprehensive client-side and server-side input validation.