# Projects & Expenses Tracker

A simple full-stack internal tool for managing construction projects and
tracking expenses against project budgets.

Built with:

-   Frontend: Next.js (React)
-   Backend: Node.js + Express
-   Database: PostgreSQL

------------------------------------------------------------------------

## Setup Instructions

### 1. Clone Repository

git clone `https://github.com/Georges910/projects-expenses-tracker.git` cd projects-expenses-tracker

------------------------------------------------------------------------

## Database Setup (PostgreSQL)

1.  Make sure PostgreSQL is installed and running.

2.  Create the database:

CREATE DATABASE tracker;

3.  Connect to the database:

\c tracker

4.  Create the tables:

CREATE TABLE projects ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT
NULL, client_name VARCHAR(255) NOT NULL, estimated_budget NUMERIC(12,2)
NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

CREATE TABLE expenses ( id SERIAL PRIMARY KEY, project_id INTEGER
REFERENCES projects(id) ON DELETE CASCADE, description TEXT NOT NULL,
amount NUMERIC(12,2) NOT NULL CHECK (amount \> 0), category VARCHAR(50)
CHECK (category IN ('material','labor','other')), created_at TIMESTAMP
DEFAULT CURRENT_TIMESTAMP );

------------------------------------------------------------------------

## Backend Setup

cd backend npm install

Update db.js with your PostgreSQL credentials.

Start backend server:

npm run dev

Backend runs on: http://localhost:4000

------------------------------------------------------------------------

## Frontend Setup

cd frontend npm install npm run dev

Frontend runs on: http://localhost:3000

------------------------------------------------------------------------

## Database Schema Explanation

The system uses two related tables:

Projects table stores project information including name, client name,
estimated budget, and creation timestamp.

Expenses table stores expenses linked to projects. Each expense includes
description, amount, category (material, labor, other), and a foreign
key project_id.

Relationship: One Project --> Many Expenses

The ON DELETE CASCADE rule ensures that when a project is deleted, all
related expenses are automatically removed.

Monetary values use NUMERIC to avoid floating-point precision issues.

------------------------------------------------------------------------

## Budget Calculation

Budget summaries (total expenses and remaining budget) are calculated in
the backend using SQL aggregation (SUM).

This ensures: - Single source of truth - Data consistency - No
duplicated business logic in the frontend

Projects without expenses are handled using LEFT JOIN and COALESCE to
return 0 instead of NULL.

------------------------------------------------------------------------

## Assumptions Made

-   No authentication required (internal tool)
-   Single-user environment
-   Currency not specified (generic monetary values)
-   Basic validation is sufficient (required fields, positive amounts)

------------------------------------------------------------------------

## What I Would Improve With More Time

-   Add project search and filtering (by client or category)
-   Add expense filtering by category
-   Add stronger validation and better error handling
-   Add confirmation dialogs before deleting expenses
-   Improve UI responsiveness and animations

------------------------------------------------------------------------

Author: Georges El Sous
