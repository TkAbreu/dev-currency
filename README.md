Dev Currency

Dev Currency is a React-based web application that displays real-time cryptocurrency market data.
The project consumes the CoinCap API to show updated information such as price, market capitalization, volume, and 24h variation for multiple cryptocurrencies.

This application was developed as part of a learning project inspired by the SujeitoProgramador course, with additional customizations, improvements, and architectural decisions made during development.

🚀 Features

Real-time cryptocurrency data using CoinCap API
List of top cryptocurrencies with pagination (load more / load less)
Individual coin details page
Search by cryptocurrency name
Price, market cap, supply, volume, and 24h change formatting
Dynamic loading indicator
Responsive table layout

🛠️ Technologies Used

React
TypeScript
Vite
Tailwind CSS
CSS Modules
React Router DOM
Shadcn/ui
CoinCap API

📦 Installation & Setup

Clone the repository:
git clone https://github.com/your-username/dev-currency.git
Navigate to the project folder:
cd dev-currency
Install dependencies:
npm install
Create an environment file:
cp .env.example .env
Add your CoinCap API token to .env
Start the development server:
npm run dev

🧩 Project Structure
src/
 ├─ assets/
 ├─ components/
 │   ├─ header
 |   ├─ layout
 │   └─ shadui
 ├─ pages/
 │   ├─ home
 │   ├─ details
 │   └─ notfound
 └─ routes/

📚 API Reference

CoinCap API
https://docs.coincap.io/

🎓 Credits

This project was built based on concepts learned in the SujeitoProgramador course and expanded with custom logic, styling, and improvements for portfolio and learning purposes.

📄 License

This project is for educational purposes and personal portfolio use.
