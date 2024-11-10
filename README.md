![Mockup of UnPassword landing page](https://i.imgur.com/FHh0JEM.jpeg)

# UnPassword

A Secure Password Management System

This repository contains a secure password management system developed for the MEC Programming Competition 2024. The project is designed to protect users' sensitive information by securely storing passwords, verifying user identity, and preventing unauthorized access. Built using a **React + Vite** frontend and an **Express.js** backend, this system leverages **Auth0** for authentication and **Google Firebase** for data storage, with a strong focus on cybersecurity.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Assumptions and Limitations](#assumptions-and-limitations)
- [Future Enhancements](#future-enhancements)

## About the Project

With the growing risk of cyber-attacks and data breaches, password security is a major concern for users and organizations alike. This project provides a robust password management solution, designed to:

- Enable users to store, view, and manage complex passwords in a secure environment.
- Protect stored passwords with advanced encryption and secure access controls.
- Mitigate risks of unauthorized access using multi-factor authentication (MFA) and secure token-based sessions.

## Features

- **Multi-Factor Authentication (MFA)** via Auth0 for secure user verification.
- **Encrypted Password Storage** using Firebase to protect passwords both at rest and in transit.
- **Role-Based Access Control (RBAC)** for data privacy, ensuring only authenticated users access their data.
- **User-Friendly Interface** built with React + Vite, allowing easy password management.

## Technologies Used

- **Frontend**: React + Vite for a fast, responsive user interface.
- **Backend**: Express.js for handling API requests and managing business logic.
- **Authentication**: Auth0 for secure, scalable user authentication.
- **Database & Hosting**: Google Firebase for secure data storage and retrieval.
- **Package Manager**: pnpm for efficient dependency management.

## Project Structure

This repository is organized into two main folders:

- **client/**: Contains the frontend code built with React + Vite.
  - `public/`: Public assets.
  - `src/`: Contains the main React components, pages, and API service layer.
- **server/**: Contains the backend code, implemented with Express.js.
  - `routes/`: Defines the server API routes.
  - `controllers/`: Handles business logic for incoming requests.
  - `models/`: Contains data models for database interactions.

For a complete file structure, please refer to the repository.

## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

- Ensure you have **pnpm** installed globally (`npm install -g pnpm`).
- Create a **Firebase** project and enable authentication and Firestore.
- Set up an **Auth0** account and configure a new application for secure authentication.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/MEC-Programming-2024.git
   cd MEC-Programming-2024
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   pnpm install
   cd client
   pnpm install
   cd ../server
   pnpm install
   ```

3. Configure Environment Variables:
   - Create `.env` files in both `client` and `server` folders.
   - Add Auth0 and Firebase credentials to `.env` as required.

### Running the Application

1. Start the backend server:

   ```bash
   cd server
   pnpm run dev
   ```

2. Start the frontend:
   ```bash
   cd client
   pnpm run dev
   ```

The frontend will be available at `http://localhost:5173`, and the backend at `http://localhost:8080`.

## Usage

1. **User Registration and Login**: Register or log in through Auth0, which provides additional security with Multi-Factor Authentication.
2. **Password Management**: Use the app to securely add, view, and delete stored passwords. Passwords are encrypted before storage in Firebase.
3. **Access Control**: Only authenticated users can access their stored passwords, ensuring that data privacy is maintained.

## Assumptions and Limitations

- **User Knowledge**: The system assumes users are comfortable with basic password management and MFA.
- **Internet Dependency**: An active internet connection is required, as Firebase is a cloud-based service.
- **Auth0 and Firebase**: The system is bound to the capabilities and limitations of Auth0 and Firebase.
