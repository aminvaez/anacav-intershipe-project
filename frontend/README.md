# ANACAV Data Engineering & Analytics Project

ANACAV is an end-to-end data engineering and analytics project developed to demonstrate data analysis, relational database design, ETL development, REST API implementation, dashboard development, and containerization.

The project processes raw Excel data, stores cleaned data in a PostgreSQL source database, transforms it into a dimensional data warehouse through an ETL pipeline, exposes analytical data through a Flask REST API, and visualizes the results in a React dashboard.

The complete application is **Dockerized** and can be started using Docker Compose.

---

## Project Architecture

```text
Raw Excel Data
      │
      ▼
Data Analysis & Cleaning
Python / Pandas
      │
      ▼
Clean CSV
      │
      ▼
┌─────────────────────┐
│ Source PostgreSQL   │
│ source_db           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Python ETL          │
│ Extract             │
│ Transform           │
│ Load                │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Data Warehouse      │
│ PostgreSQL          │
│ warehouse_db        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Flask REST API      │
│ Backend             │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ React Dashboard     │
│ Vite + Recharts     │
└─────────────────────┘
```

---

## Main Objectives

The project demonstrates the following concepts:

- Raw data analysis
- Data cleaning and validation
- Relational database design
- Primary and foreign keys
- Data normalization
- Fact and Dimension modeling
- Star Schema design
- ETL pipeline development
- PostgreSQL database integration
- REST API development with Flask
- Analytical dashboard development with React
- Dynamic API filtering
- Docker containerization
- Multi-service orchestration with Docker Compose

---

## Data Processing

The original dataset was provided as an Excel file with a non-standard structure.

The raw data contained:

- Multi-row headers
- Merged cells
- Activity groups
- Multiple work-order statuses
- Aggregate rows
- Total columns
- Wide-format analytical data

The dataset was analyzed and transformed using Python and Pandas.

After cleaning, the data was converted into the following structure:

```text
city_name
city_code
year
month
activity
status
work_order_count
```

The final cleaned dataset contains:

```text
1536 records
16 cities
3 months
7 activity types
5 statuses
```

The total number of work orders is:

```text
3875
```

---

## Source Database

The cleaned data is loaded into a PostgreSQL source database:

```text
source_db
```

Main source table:

```text
source_work_orders
```

The table represents the operational/source layer before the ETL process loads data into the analytical warehouse.

---

## Data Warehouse

The destination PostgreSQL database is:

```text
warehouse_db
```

A **Star Schema** is used for analytical queries.

### Dimension Tables

```text
dim_city
dim_date
dim_activity
dim_status
```

### Fact Table

```text
fact_work_orders
```

The fact table contains the numerical measure:

```text
work_order_count
```

and references the dimension tables using foreign keys.

### Star Schema

```text
                 dim_city
                    │
                    │
dim_date ─── fact_work_orders ─── dim_activity
                    │
                    │
                dim_status
```

This structure separates descriptive information into dimensions while keeping analytical measures in the fact table.

---

## ETL Pipeline

The ETL process is implemented in Python.

Main ETL module:

```text
etl/etl.py
```

The pipeline performs three main stages.

### Extract

Data is extracted from:

```text
source_db.source_work_orders
```

### Transform

The ETL process:

- Validates source data
- Checks missing values
- Checks duplicate records
- Validates months
- Validates negative work-order counts
- Prepares dimension records
- Maps business keys to warehouse surrogate keys
- Prepares fact records

### Load

The ETL process loads:

```text
dim_city
dim_date
dim_activity
dim_status
fact_work_orders
```

The ETL process is designed to be idempotent using PostgreSQL conflict handling.

A successful ETL run produces:

```text
Starting ETL...
Extracted 1536 rows from source_db.
Source validation passed.
Dimensions prepared: 16 cities, 3 dates, 7 activities, 5 statuses.
Dimensions loaded.
Prepared 1536 fact records.
Loaded 1536 fact records.
ETL completed successfully.
```

---

## Backend API

The backend is developed using:

- Python
- Flask
- SQLAlchemy
- PostgreSQL
- Flasgger / Swagger
- Flask-CORS

The API reads analytical data from the warehouse rather than directly from the raw source data.

### API Endpoints

```text
GET /api/summary
GET /api/monthly
GET /api/statuses
GET /api/activities
GET /api/cities
GET /api/filters
```

The analytical endpoints support filters such as:

```text
year
month
city_id
activity_id
status_id
```

Example:

```text
GET /api/activities?year=1401&month=8&city_id=1
```

---

## React Dashboard

The analytical dashboard is developed using:

- React
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- Fetch API

The dashboard provides:

- Total work-order KPI
- Number of cities
- Number of activities
- Monthly work-order trend
- Work orders by status
- Work orders by activity
- Work orders by city
- Dynamic filtering
- Responsive user interface

Available dashboard filters include:

```text
Year
Month
City
Activity
Status
```

Changing a filter updates the analytical API requests and refreshes the dashboard.

---

# Docker

The complete project has been **Dockerized**.

Docker Compose manages four services:

| Service | Description | Host Port |
|---|---|---:|
| `db` | PostgreSQL source and warehouse databases | 5432 |
| `etl` | Python ETL job | - |
| `backend` | Flask REST API | 5001 |
| `frontend` | React/Vite dashboard | 5173 |

The backend listens on port `5000` inside the Docker container and is exposed as port `5001` on the host:

```text
localhost:5001 → backend:5000
```

Port `5001` is used on the host to avoid conflicts with services that may already use port `5000`.

---

# Running the Project with Docker

## Prerequisites

Install:

- Docker
- Docker Compose

Docker Desktop can be used on macOS.

When using Docker, PostgreSQL, Python, Flask, and Node.js do not need to be started manually.

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd anacav
```

---

## 2. Environment Configuration

The project uses environment variables for database and frontend configuration.

Example configuration:

```env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres

SOURCE_DB=source_db
WAREHOUSE_DB=warehouse_db

VITE_API_URL=http://localhost:5001/api
```

A `.env.example` file can be used as a configuration template.

Do not commit sensitive credentials in the real `.env` file.

---

## 3. Build and Run the Application

From the project root directory, run:

```bash
docker compose up --build
```

Docker Compose automatically performs the following workflow:

```text
Start PostgreSQL
        ↓
Create source_db and warehouse_db
        ↓
Create source schema
        ↓
Load clean_work_orders.csv
        ↓
Create warehouse Star Schema
        ↓
Run ETL
        ↓
Populate dimensions and fact table
        ↓
Start Flask API
        ↓
Start React Dashboard
```

On the first database initialization, the CSV should load:

```text
COPY 1536
```

The ETL should then complete successfully:

```text
Extracted 1536 rows from source_db.
Source validation passed.
Dimensions prepared: 16 cities, 3 dates, 7 activities, 5 statuses.
Loaded 1536 fact records.
ETL completed successfully.
```

---

## 4. Open the Dashboard

After the containers start, open:

```text
http://localhost:5173
```

---

## 5. Test the Backend API

The backend is available at:

```text
http://localhost:5001
```

Example endpoint:

```text
http://localhost:5001/api/summary
```

Expected result:

```json
{
  "total_activities": 7,
  "total_cities": 16,
  "total_work_orders": 3875
}
```

---

## Check Docker Containers

Run:

```bash
docker compose ps
```

The database, backend, and frontend services should be running.

The ETL service is expected to finish with:

```text
Exited (0)
```

This is normal because ETL is a processing job and does not need to run continuously.

---

## Stop the Application

To stop the containers while preserving database data:

```bash
docker compose down
```

To stop the containers and delete the PostgreSQL volume:

```bash
docker compose down -v
```

> **Warning:** The `-v` option deletes the Docker database volume. On the next startup, the databases will be created and populated again.

---

## Rebuild the Application

After changing dependencies, Dockerfiles, or application code:

```bash
docker compose up --build
```

---

## Run ETL Manually

The ETL process can also be executed manually inside Docker:

```bash
docker compose run --rm etl
```

The ETL is designed to handle repeated execution without creating duplicate fact records.

---

## Project Structure

```text
anacav/
├── app/
│   ├── __init__.py
│   ├── db.py
│   ├── models.py
│   ├── routes.py
│   ├── services.py
│   └── Dockerfile
│
├── data/
│   ├── 2016.xlsx
│   └── clean_work_orders.csv
│
├── docker/
│   └── postgres/
│       ├── 01-create-databases.sql
│       └── 02-init-databases.sh
│
├── etl/
│   ├── __init__.py
│   ├── config.py
│   └── etl.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── notebooks/
│   ├── 01_analysis.ipynb
│   ├── 02_connect_to_source_db.ipynb
│   └── 03_ETL.ipynb
│
├── sql/
│   └── warehouse_schema.sql
│
├── docker-compose.yml
├── requirements.txt
├── run.py
├── .env.example
├── .gitignore
├── .dockerignore
└── README.md
```

---

## Data Validation

The final pipeline has been validated across the source database, warehouse, API, and dashboard.

Expected results:

| Validation | Result |
|---|---:|
| Source records | 1536 |
| Fact records | 1536 |
| Cities | 16 |
| Dates | 3 |
| Activities | 7 |
| Statuses | 5 |
| Total work orders | 3875 |

The source and warehouse totals were compared to ensure that the ETL process preserved the analytical results.

---

## Technology Stack

### Data Processing
- Python
- Pandas
- Jupyter Notebook

### Database
- PostgreSQL

### ETL
- Python
- Psycopg

### Backend
- Flask
- SQLAlchemy
- Flask-SQLAlchemy
- Flask-CORS
- Flasgger

### Frontend
- React
- Vite
- Tailwind CSS
- Recharts
- Lucide React

### Infrastructure
- Docker
- Docker Compose

---

## Development Note

The current Docker configuration is designed for development, demonstration, and evaluation purposes.

The React application currently runs using the Vite development server, and Flask runs using its development server.

For a production deployment, the frontend could be built into static assets and served using Nginx, while the Flask backend could be served using a production WSGI server such as Gunicorn.