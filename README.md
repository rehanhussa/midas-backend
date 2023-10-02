# midas-backend

![image](https://github.com/rehanhussa/Midas/blob/main/midas.png)

## Project Description: 

MIDAS is a replication of popular Stock Exchanges. 
It allows the user to paper trade and view their favorite stocks.

## Technologies Used

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Getting Started

[Deployed Front-End]()

## Screenshots

![image](https://github.com/rehanhussa/Midas/blob/main/test.png)


## Trello

[Trello Link](https://trello.com/b/W70a7V17/midas-simulated-stock-exchange)

## USER FLOW

![image](https://github.com/rehanhussa/Midas/blob/development/user.jpg)

## Wireframe 

1. Landing Page
2. Register Page
3. Login Page
4. Dashboard After Login
5. Paper Trade page
6. View Stocks page

## Motivation

We wanted to test our skills and build a application that would challenge us. We also wanted to build an application that would be useful to us and others.

## How to Use

Login to the webpage / create an account. 
A list of stocks should be displayed to the user on the home page.
A paper trade balance should be displayed to the user if they click the trading tab. 
With this they can Buy & Sell stocks.

Enjoy Trading!

## User Stories 

- As a new user, I want to be able to register for an account so that I can access the paper trading platform.
- As a registered user, I want to be able to log in to the platform using my credentials so that I can access my dashboard and trading features.
- As a user, I want to be able to search for stocks by ticker or company name so that I can view their details and make informed trading decisions.
- As a user, I want to be able to view a stock's current price, price change, and historical chart so that I can analyze its performance.
- As a user, I want to be able to execute paper trades (buy/sell) so that I can simulate real-world trading without risking real money.
- As a user, I want to view a summary of my portfolio, including total value, cash available, and total profit/loss, so that I can track my paper trading performance.
- As a user, I want to view a list of stocks I hold, including the number of shares, average purchase price, and current value, so that I can manage my holdings.
- As a user, I want to be able to log out of the platform to ensure the security of my account.

## API Endpoints

- **GET** `/`: Retrieve user stocks (dashboardController.getUserStocks)
- **GET** `/`: Fetch investment data (investmentController.getInvestmentData)
- **GET** `/:id`: Get a user by ID (stocksController.getUserById)
- **POST** `/:id`: Create a new stock for a user (stocksController.createStock)
- **PUT** `/:id`: Edit a user's stock (stocksController.editStock)
- **DELETE** `/:id`: Delete a user's stock (stocksController.deleteStock)

## Database Schema

- userSchema = { username: String, hash: String, balance: Number, handle: String, stocks: ref, trades: ref }

- tradesSchema = { symbol: String, quantity: Number, stake: Number, type: Boolean }

- userstocks = { symbol: String,quantity: Number, stake: Number }


## MVP Goals 

- User Registration & Authentication:
- Implement a registration system with form validation.
- Implement a login system with authentication and session management.
- Dashboard:
- Display portfolio summary (total value, cash available, profit/loss).
- List user's stock holdings with relevant details.
- Stock Search & Display:
- Implement a search bar to find stocks by ticker or company name.
- Display stock details including current price, price change, and a basic historical chart.
- Paper Trading:
- Allow users to execute buy/sell trades with form validation.
- Update user's portfolio and holdings in real-time after a trade.


## Stretch Goals 

- Mobile Application: Develop a mobile app version of MIDAS for both iOS and Android platforms, ensuring seamless trading on the go.

- Advanced Charting Tools: Integrate advanced charting tools that allow users to perform technical analysis with indicators like Moving Averages, RSI MACD, etc.

- API Integration: Offer a public API for third-party developers to build tools or integrations around the MIDAS platform.

- Chat & Social Features: Implement a real-time chat feature where users can discuss stocks, market trends, and share insights.

- Machine Learning Insights: Use machine learning to provide users with personalized stock recommendations based on their trading behavior and preferences.

- Real-time News Feed: Integrate a real-time news feed that curates relevant news articles related to the stocks in a user's portfolio or watchlist.

- Advanced Security Features: Implement biometric authentication, two-factor authentication, and other security measures to enhance user account security.

- Integration with Real Brokers: Partner with real stock brokers to allow users to transition from paper trading to real trading seamlessly.


## One-Week Development Timeline 

- Day 1: Planning, Setup & Backend Infrastructure
Finalize the project scope and gather requirements.
Set up the development environment.
Design the database schema and set up the backend infrastructure.

- Day 2: User Registration, Authentication & Dashboard Development
Develop the user registration & authentication system.
Start working on the dashboard to display portfolio summary and user's stock holdings.

- Day 3: Stock Search, Display & Paper Trading
Implement the stock search & display feature.
Begin development of the paper trading feature, allowing users to execute buy/sell trades.

- Day 4: Advanced Features & Additional Tools
Implement trend analysis and stock comparisons.
Add predictive analytics and news sentiment analysis.
Work on additional features like notifications and watchlist.

- Day 5: Testing, Bug Fixes & Optimization
Conduct thorough testing of all developed features.
Fix any identified bugs and optimize performance.

- Day 6: Deployment & Launch (Ideally Day 5)
Conduct final testing.
Deploy the application.
Announce the launch and gather initial user feedback.

## Credits 

- [Rehan Hussain](https://www.linkedin.com/in/rehan-hussain-371697279/)
- [Zubin Sood](https://www.linkedin.com/in/zubinsood/)
- [Tenzing Lhagyal](https://www.linkedin.com/in/tenzing-lhagyal/)
- [Emre Surmeli](https://www.linkedin.com/in/emresurmeli/)
- [Gregorio Moreta](https://www.linkedin.com/in/gregorio-moreta/)
- [Santiago Dimaren](https://www.linkedin.com/in/santiago-dimaren/)
- [Finnhub (API)](https://finnhub.io/)
- [Nivo (React Chart Library)](https://nivo.rocks/)
- [Full Calendar (React Calendar Library)](https://fullcalendar.io/)
- [MUI](https://mui.com/)
