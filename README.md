
## Getting Started

### Prerequisites

- Node.js
- npm
- Truffle
- Ganache (optional for local development)

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd telehealth
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Start the React application:
    ```sh
    npm start
    ```
2. The application will be available at `http://localhost:3000`.

### Smart Contracts

- Make sure you are in truffle console (command: truffle console)

1. Compile the smart contracts:
    ```sh
    truffle compile
    ```
2. Migrate the smart contracts to the network:
    ```sh
    truffle migrate
    ```
3. Run the tests for the smart contracts:
    ```sh
    truffle test
    ```
- Shortcut:
    ```sh
    npx truffle compile && npx truffle migrate
    ```

## Project Scripts

- `start`: Starts the React development server.
- `build`: Builds the React application for production.
- `test`: Runs the tests for the React application.
- `eject`: Ejects the Create React App configuration.

## Learn More

- [React Documentation](https://reactjs.org)
- [Truffle Documentation](https://archive.trufflesuite.com/docs/truffle)

## License

This project is licensed under the MIT License.
