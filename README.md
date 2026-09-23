# ANACAV Internship Project

A full-stack data engineering and analytics project for processing, storing, transforming, and visualizing work-order data.

The project starts with raw Excel data and implements a complete data pipeline including data analysis, PostgreSQL databases, ETL, a star-schema data warehouse, Flask REST APIs, and an interactive React dashboard.

---

## Project Overview

The purpose of this project is to demonstrate an end-to-end data workflow:

1. Analyze raw Excel data.
2. Clean and transform the dataset.
3. Load the cleaned data into a PostgreSQL source database.
4. Design a relational analytical data model.
5. Build a star-schema data warehouse.
6. Implement an ETL pipeline between the source and warehouse databases.
7. Develop REST APIs using Flask and SQLAlchemy.
8. Build an interactive analytical dashboard using React.

---

## Architecture

```text
Raw Excel File
      │
      ▼
Python / Pandas
Data Analysis & Cleaning
      │
      ▼
PostgreSQL
Source Database
      │
      ▼
Python ETL Pipeline
Extract → Validate → Transform → Load
      │
      ▼
PostgreSQL
Data Warehouse
      │
      ▼
SQLAlchemy ORM
      │
      ▼
Flask REST API
      │
      ▼
React Dashboard
      │
      ▼
Recharts Visualizations
```

---

## Data Processing

The original dataset is stored in:

```text
data/2016.xlsx
```

The raw Excel file required preprocessing because it contained:

- Multi-level headers
- Merged cells
- Aggregate rows
- Total columns mixed with detailed data
- Wide-format activity/status columns
- Duplicate activity labels

The dataset was analyzed and cleaned using Python and Pandas.

The cleaned dataset follows a long-format structure:

```text
city_name
city_code
year
month
activity
status
work_order_count
```

The resulting cleaned dataset contains **1,536 records** and is stored in:

```text
data/clean_work_orders.csv
```

Data quality checks included:

- Missing-value validation
- Duplicate detection
- Negative-value validation
- Month validation
- City-code consistency
- Business-key validation
- Comparison of calculated totals with source totals

The total number of work orders in the dataset is:

```text
3,875
```

---

## Database Design

The project uses two PostgreSQL databases.

### Source Database

```text
source_db
```

The source database represents the operational/source layer of the pipeline.

Main table:

```text
source_work_orders
```

The table includes constraints for:

- Primary key
- Unique business key
- Valid reporting month
- Non-negative work-order counts

The logical business key is:

```text
city_code
+ report_year
+ report_month
+ activity
+ status
```

---

## Data Warehouse

The analytical database is:

```text
warehouse_db
```

The warehouse follows a **Star Schema**.

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

The fact table contains the main analytical measure:

```text
work_order_count
```

and foreign keys to each dimension.

### Star Schema

```text
                    dim_date
                       │
                       │
dim_city ───── fact_work_orders ───── dim_activity
                       │
                       │
                   dim_status
```

Surrogate keys are used in the dimension tables, while the original identifiers such as `city_code` are preserved as business keys.

---

## ETL Pipeline

The standalone ETL implementation is located in:

```text
etl/
├── __init__.py
├── config.py
└── etl.py
```

The ETL process performs the following stages:

### Extract

Reads work-order records from `source_db`.

### Validate

Checks:

- Required columns
- Missing values
- Duplicate business keys
- Negative work-order counts
- Invalid reporting months

### Transform

Creates the required dimension datasets and maps source business values to warehouse surrogate keys.

### Load

Loads:

- Cities
- Dates
- Activities
- Statuses
- Work-order facts

into `warehouse_db`.

The ETL uses PostgreSQL upsert operations to make repeated executions safe and prevent duplicate records.

The warehouse loading process is transactional. Changes are committed when the ETL succeeds and rolled back if an error occurs.

Run the ETL with:

```bash
python -m etl.etl
```

A successful execution processes:

```text
16 cities
3 dates
7 activities
5 statuses
1536 fact records
```

---

## Backend

The backend is implemented using:

- Python
- Flask
- Flask-SQLAlchemy
- SQLAlchemy
- PostgreSQL
- Psycopg

Backend structure:

```text
app/
├── __init__.py
├── db.py
├── models.py
├── routes.py
└── services.py
```

Responsibilities are separated between layers:

```text
Routes
   │
   ▼
Services
   │
   ▼
SQLAlchemy Models
   │
   ▼
PostgreSQL Data Warehouse
```

`routes.py` defines the HTTP endpoints, while analytical database queries are implemented in `services.py`.

---

## REST API

The backend provides analytical REST endpoints for the dashboard.

### Dashboard Summary

```http
GET /api/summary
```

Returns key dashboard metrics such as total work orders, cities, and activities.

### Monthly Analysis

```http
GET /api/monthly
```

Returns work-order totals grouped by year and month.

### Status Analysis

```http
GET /api/statuses
```

Returns work-order totals grouped by status.

### Activity Analysis

```http
GET /api/activities
```

Returns work-order totals grouped by activity.

### City Analysis

```http
GET /api/cities
```

Returns work-order totals grouped by city.

### Filter Options

```http
GET /api/filters
```

Returns available values for dashboard filters.

---

## Dynamic Filtering

The analytical APIs support query parameters.

Available filters include:

```text
year
month
city_id
activity_id
status_id
```

Example:

```http
GET /api/activities?year=1401&month=8&city_id=1
```

Multiple filters can be combined, allowing the frontend dashboard to dynamically request analytical results from the warehouse.

---

## API Documentation

API documentation is provided using Swagger / Flasgger.

When the Flask application is running, the Swagger interface can be accessed at:

```text
http://127.0.0.1:5000/swagger/
```

The generated API specification describes the available REST endpoints.

---

## Frontend

The frontend is implemented using:

- React
- Vite
- Tailwind CSS
- Recharts
- Lucide React

The dashboard provides:

- KPI summary cards
- Dynamic filters
- Monthly work-order trends
- Work orders by status
- Work orders by activity
- Work orders by city
- Responsive user interface

Frontend components are separated into reusable components.

```text
frontend/src/
├── components/
│   ├── ActivityChart.jsx
│   ├── CityChart.jsx
│   ├── FilterBar.jsx
│   ├── Header.jsx
│   ├── MonthlyChart.jsx
│   ├── StatusChart.jsx
│   └── StatuseBox.jsx
├── pages/
│   ├── AboutProject.jsx
│   └── Dashboard.jsx
└── services/
    └── api.js
```

The API communication layer is separated into:

```text
frontend/src/services/api.js
```

This keeps HTTP requests separate from React presentation components.

---

## Dashboard Data Flow

```text
FilterBar
    │
    ▼
Dashboard State
    │
    ▼
API Service
    │
    ▼
Flask REST API
    │
    ▼
SQLAlchemy
    │
    ▼
Data Warehouse
    │
    ▼
JSON Response
    │
    ▼
React Components
    │
    ├── KPI Cards
    ├── Monthly Chart
    ├── Status Chart
    ├── Activity Chart
    └── City Chart
```

Changing a dashboard filter causes the analytical APIs to be called again using the selected query parameters.

---

## Project Structure

```text
.
├── anaconda_projects
│   └── db
│       └── project_filebrowser.db
│
├── app
│   ├── __init__.py
│   ├── db.py
│   ├── models.py
│   ├── routes.py
│   └── services.py
│
├── data
│   ├── 2016.xlsx
│   └── clean_work_orders.csv
│
├── etl
│   ├── __init__.py
│   ├── config.py
│   └── etl.py
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── ActivityChart.jsx
│   │   │   ├── CityChart.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MonthlyChart.jsx
│   │   │   ├── StatusChart.jsx
│   │   │   └── StatuseBox.jsx
│   │   ├── pages
│   │   │   ├── AboutProject.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── notebooks
│   ├── 01_analysis.ipynb
│   ├── 02_connect_to_source_db.ipynb
│   └── 03_ETL.ipynb
│
├── sql
│   └── warehouse_schema.sql
│
├── .env
├── .gitignore
├── requirements.txt
├── run.py
└── README.md
```

---

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd anacav
```

### 2. Create a Python Virtual Environment

macOS / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Backend Dependencies

```bash
python -m pip install -r requirements.txt
```

### 4. Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password

SOURCE_DB=source_db
WAREHOUSE_DB=warehouse_db
```

Do not commit the `.env` file to version control.

---

## Running the Project with Docker

The entire project is Dockerized and can be started using Docker Compose.

The Docker setup includes four services:

- PostgreSQL database
- Python ETL service
- Flask backend API
- React frontend dashboard

### Prerequisites

Before running the project, make sure the following are installed:

- Docker
- Docker Compose

On macOS, Docker Desktop can be used.

---

### 1. Clone the Repository

Clone the project and move to the project root directory:

```bash
git clone <repository-url>
```

---

### 2. Configure Environment Variables

Create a `.env` file in the project root if it does not already exist.

You can use `.env.example` as a template.

Example:

```env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres

SOURCE_DB=source_db
WAREHOUSE_DB=warehouse_db

VITE_API_URL=http://localhost:5001/api
```

> When running inside Docker, `DB_HOST` must be `db`, because `db` is the PostgreSQL service name defined in `docker-compose.yml`.

---

### 3. Build and Start the Project

From the root directory, run:

```bash
docker compose up --build
```

On the first run, Docker Compose will automatically:

1. Build the backend, ETL, and frontend images.
2. Start the PostgreSQL container.
3. Create `source_db`.
4. Create `warehouse_db`.
5. Create the source database schema.
6. Load `clean_work_orders.csv` into the source database.
7. Create the warehouse Star Schema.
8. Run the ETL pipeline.
9. Load the Dimension and Fact tables.
10. Start the Flask backend.
11. Start the React frontend.

A successful first initialization should include:

```text
COPY 1536
```

A successful ETL execution should include:

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

The ETL container will then exit with code `0`. This is expected because ETL is a one-time processing job.

---

### 4. Open the Application

After all services have started, open the dashboard in your browser:

```text
http://localhost:5173
```

The Flask REST API is available at:

```text
http://localhost:5001
```

For example, the summary endpoint can be tested at:

```text
http://localhost:5001/api/summary
```

Expected response:

```json
{
  "total_activities": 7,
  "total_cities": 16,
  "total_work_orders": 3875
}
```

---

### 5. Check Container Status

Open another terminal and run:

```bash
docker compose ps
```

The expected state is:

```text
db         Running (healthy)
backend    Running
frontend   Running
etl        Exited (0)
```

`etl` exiting with code `0` is normal and indicates that the ETL job completed successfully.

---

### 6. Stop the Project

To stop the containers:

```bash
docker compose down
```

This stops and removes the containers while preserving the PostgreSQL data volume.

To start the project again:

```bash
docker compose up
```

---

### 7. Rebuild After Code Changes

If application code, dependencies, Dockerfiles, or Docker configuration have changed, rebuild the project:

```bash
docker compose up --build
```

---

### 8. Reset the Databases

If you want to completely reset the Docker databases and rerun database initialization from the beginning:

```bash
docker compose down -v
docker compose up --build
```

> **Warning:** `docker compose down -v` permanently deletes the PostgreSQL Docker volume used by this project. The source database and warehouse will be recreated from the project data on the next startup.

---

### 9. Run the ETL Manually

The ETL process can be executed manually with:

```bash
docker compose run --rm etl
```

The ETL process is designed to be idempotent, so running it again does not create duplicate Fact or Dimension records.

---

## Docker Data Flow

When the project starts for the first time, the following workflow is executed automatically:

```text
clean_work_orders.csv
        │
        ▼
PostgreSQL
source_db
        │
        ▼
Python ETL
        │
        ▼
PostgreSQL
warehouse_db
        │
        ▼
Flask REST API
localhost:5001
        │
        ▼
React Dashboard
localhost:5173
```

Therefore, the complete application can be initialized and started with:

```bash
docker compose up --build
```

## Data Validation

Several validation checks were performed throughout the project.

The final warehouse was validated against the source dataset.

```text
Source rows      = 1536
Warehouse facts  = 1536

Total work orders = 3875
```

Monthly totals:

| Month | Work Orders |
|------:|------------:|
| 7 | 1559 |
| 8 | 1210 |
| 9 | 1106 |

The analytical APIs were also checked to ensure that grouped totals reconcile with the overall work-order total.

---

## Technologies

| Layer | Technology |
|---|---|
| Data Analysis | Python, Pandas, Jupyter |
| Source Database | PostgreSQL |
| Data Warehouse | PostgreSQL |
| ETL | Python, Psycopg |
| ORM | SQLAlchemy |
| Backend | Flask |
| API Documentation | Swagger / Flasgger |
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| Visualization | Recharts |
| Icons | Lucide React |

---

## Development Workflow

The project was developed incrementally:

```text
Raw Data Analysis
        ↓
Data Cleaning
        ↓
Source Database
        ↓
Warehouse Design
        ↓
ETL Development
        ↓
ETL Validation
        ↓
Backend Development
        ↓
REST API Development
        ↓
React Dashboard
        ↓
Dynamic Filtering
```

This separation allows each layer of the application to be tested and developed independently.

---

## Future Improvements

Possible future improvements include:

- Dockerizing the application
- Automated ETL scheduling
- Automated testing
- API pagination where required
- Authentication and authorization
- Production deployment
- Improved logging and monitoring
- Additional analytical metrics and visualizations

---

## Author

ANACAV Internship Project