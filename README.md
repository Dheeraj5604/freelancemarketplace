# Freelancer Marketplace
Welcome to my full-stack Freelancer Marketplace application! This platform is built to connect freelancers and clients seamlessly. Users can register, create gigs, hire talent, and manage orders efficiently. The goal was to build a modern, responsive platform to practice full-stack web development with real-world workflows.

 Features
User authentication with role-based access (client/freelancer)

Create, view, and manage freelance gigs

Order placement and order tracking system

Clean and responsive UI built with Tailwind CSS

RESTful API integration using Axios

Dashboard for both freelancers and clients

Admin panel and real-time messaging (coming soon)

 Tech Stack
Frontend: Next.js, Tailwind CSS, Axios
Backend: Node.js, Express.js, MongoDB (Mongoose), JWT
Tools: Postman, Git & GitHub, dotenv, VS Code

 Getting Started
Clone the repository
git clone https://github.com/Dheeraj5604/freelancemarketplace.git
cd freelancer-marketplace

Install dependencies

Frontend:
cd client
npm install

Backend:
cd ../server
npm install

Set up environment variables

Create a .env file inside the server/ folder:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

Create a .env.local file inside the client/ folder:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Run the development servers

Backend:
cd server
npm run dev

Frontend:
cd client
npm run dev

Then open your browser and go to http://localhost:3000 to use the app.

 Project Structure
freelancer-marketplace/
├── client/ # Frontend - Next.js
├── server/ # Backend - Express.js, MongoDB
└── README.md

 Roadmap
AI-powered gig summaries and keyword generation

Real-time chat between clients and freelancers

Payment gateway integration (Stripe or Razorpay)

Admin dashboard for platform management

Notifications and email integration

 Contributing
Contributions, suggestions, and ideas are welcome! Feel free to fork the project, create a new branch, and submit a pull request. You can also open issues to report bugs or propose features.

 License
This project is licensed under the MIT License. See the LICENSE file for more information.

Thanks for visiting!
— Dheeraj Kumar
