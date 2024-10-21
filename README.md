Project Overview

This project allows users to:

Extract Data from Energy Invoices: The application processes PDF energy invoices to extract important data such as client number, reference month, energy consumption, energy compensations, and more.

Store Data in PostgreSQL: The extracted data is stored in a structured format within a PostgreSQL database, leveraging the power of ORMs like Sequelize, Prisma, or Knex for easier database management.

Present Data via Web Application: The web application has two main components:

Dashboard: Visual representation of energy consumption and financial results using graphs.

Invoice Library: A page to access and download specific energy invoices.

Features

Data Extraction

The core functionality involves extracting relevant information from energy invoices using libraries such as pdf-lib or pdf-parse. Extracted data includes:

Client Number

Reference Month

Energy Consumption (kWh)

Energy SCEE without ICMS

Energy Compensated (GD I)

Municipal Public Lighting Contribution

Database

Data is stored in a PostgreSQL database, enabling efficient querying and reporting.

Use of ORM tools like Prisma, Sequelize, or Knex to interact with the database.

Web Application

Built using React for a dynamic front-end experience.

The back-end API is developed using Node.js with either Fastify or Express.

Includes two main pages:

Dashboard: Displays energy consumption and financial data using visual elements like Chart.js or Recharts.

Invoice Library: Allows users to search, filter, and download invoices by selecting the client number and month.

Supports filters for client number and period, with user-friendly navigation.

Graphs and Visualization

The Dashboard includes graphs to represent:

Energy Results (kWh): Energy consumption vs. energy compensated.

Financial Results (R$): Total costs vs. savings.

The graphs are built using popular charting libraries like Chart.js or Recharts.

Automated Tests

Unit Tests ensure proper parsing of PDFs, correct database insertion, and API validation.

Automated tests help maintain high code quality and ensure robust functionality.

Hosting

Hosting is optional but recommended. Suggested platforms are Vercel or Render for deploying the web application.

Getting Started

Prerequisites

Node.js (v16 or above)

PostgreSQL (v13 or above)

npm or yarn for package management

Installation

Clone the repository:

Navigate to the project directory:

Install dependencies:

Set up environment variables:

Create a .env file based on the provided .env.example and configure your PostgreSQL connection.

Running the Project

Run database migrations:

Start the server:

Navigate to http://localhost:3000 to access the web application.

Testing

Run unit tests:

Project Structure

/src: Contains all source code.

/api: Backend API routes and services.

/database: Database models and ORM configuration.

/frontend: React application for the web interface.

/utils: Utilities for PDF parsing and data handling.

