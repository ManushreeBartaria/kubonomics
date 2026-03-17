# Kubonomics - Kubernetes Cost Calculator using Prometheus & Minikube

**Student Name:** Manushree Bartaria  
**Registration No:** 23FE10CSE00257  
**Course:** CSE3253 DevOps [PE6]  
**Semester:** VI (2025-2026)  
**Project Type:** Kubernetes cost calculator 
**Difficulty:** Intermediate  

---

## Project Overview

### Problem Statement
Kubernetes dynamically allocates resources, making it difficult to track the actual cost of running applications. Most cost monitoring tools require cloud platforms, making them unsuitable for local environments like Minikube. Kubonomics solves this by providing a comprehensive, local-first solution for monitoring and calculating infrastructure costs using Prometheus metrics.

### Objectives
- Deploy applications using Kubernetes (Minikube)
- Collect real-time resource usage metrics using Prometheus
- Estimate infrastructure costs based on CPU and memory usage
- Provide a web-based dashboard for cost visualization
- Create a fully local setup with no cloud platform dependency

### Key Features
- **Real-time Kubernetes Resource Monitoring** - Monitor CPU, memory, and pod-level resource usage in real-time
- **Cost Estimation Engine** - Calculate infrastructure costs based on actual resource consumption
- **Prometheus Integration** - Execute custom PromQL queries directly from the dashboard
- **Interactive Dashboard** - Web-based monitoring interface with responsive design
- **Fully Local Setup** - Deploy on Minikube with no cloud dependency
- **Containerized Deployment** - Docker and Kubernetes-ready with included manifests
- **Multi-environment Support** - Development and production setups

## Features

- **Real-time Cluster Metrics**: Monitor CPU, memory, and pod-level resource usage in real-time
- **Custom Prometheus Queries**: Execute PromQL queries directly from the dashboard
- **Cost Calculator**: Calculate infrastructure costs based on CPU and memory usage
- **Interactive Dashboard**: Web-based monitoring interface with responsive design
- **Kubernetes Integration**: Seamless integration with Kubernetes clusters via Prometheus
- **Containerized Deployment**: Docker and Kubernetes-ready with included manifests
- **Multi-environment Support**: Development and production setups

## Technology Stack

### Core Technologies
- **Programming Language:** Python 3.8+
- **Backend Framework:** FastAPI
- **Frontend Framework:** Node.js with Express.js
- **Template Engine:** EJS
- **Database:** None (Real-time metrics from Prometheus)

### DevOps Tools
- **Version Control:** Git
- **Containerization:** Docker (via Minikube)
- **Orchestration:** Kubernetes (Minikube)
- **Monitoring:** Prometheus, Grafana
- **API Integration:** Python Kubernetes client, Requests library

### Dependencies
**Backend:**
- FastAPI - Web framework
- Uvicorn - ASGI server
- Kubernetes - K8s client
- Requests - HTTP library
- PyYAML - YAML processing
- Pandas, NumPy - Data processing
- python-dotenv - Environment variables

**Frontend:**
- Express - Web server
- Cors - Cross-origin requests
- EJS - Template engine
- Nodemon - Development auto-reload

## Project Structure

```
kubonomics/
├── backend/
│   ├── main.py                      # FastAPI application entry point
│   ├── api.py                       # API route handlers & endpoints
│   ├── client.py                    # Prometheus client for metrics collection
│   ├── schemas.py                   # Pydantic data validation schemas
│   ├── requirements.txt              # Python dependencies
│   ├── Dockerfile                   # Backend container image definition
│   ├── __init__.py                  # Package initialization
│   └── .dockerignore                # Docker build exclusions
│
├── frontend/
│   ├── server.js                    # Express.js server setup
│   ├── package.json                 # Node.js dependencies & scripts
│   ├── Dockerfile                   # Frontend container image definition
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git exclusions
│   ├── public/                      # Static assets
│   │   ├── css/                     # Stylesheets (style.css)
│   │   └── js/                      # Client-side scripts (app.js)
│   └── views/                       # EJS templates
│       ├── index.html               # Main dashboard UI
│       └── components/              # Reusable dashboard components
│
├── k8s/                             # Kubernetes manifests
│   ├── prometheus-service.yaml      # Prometheus service & deployment
│   ├── grafana-service.yaml         # Grafana service & deployment
│   ├── kubo-backend-deployment.yaml # Backend Pod & Deployment config
│   ├── kubo-backend-service.yaml    # Backend service exposure
│   ├── kubo-frontend-deployment.yaml# Frontend Pod & Deployment config
│   └── kubo-frontend-service.yaml   # Frontend service exposure
│
├── README.md                        # Project documentation
├── .gitignore                       # Git exclusions
└── .git/                            # Version control repository
```

## Prerequisites

### System Requirements
- **Minikube** - Local Kubernetes cluster with built-in Docker
- **Kubectl** - Kubernetes command-line tool
- **Python 3.8+** - Backend runtime
- **Node.js 14+** - Frontend runtime
- **npm** - Node package manager

### For Local Development
  - Python 3.8+ with pip
  - Node.js 14+ and npm
  - Minikube cluster running (Docker comes built-in)
  - kubectl configured to access your Minikube cluster

### For Kubernetes Deployment
  - Minikube with Docker engine (included by default)
  - Docker images built using Minikube's Docker environment
  - Basic understanding of Kubernetes manifests

## Quick Start

Get up and running in minutes:

```bash
# 1. Start Minikube
minikube start

# 2. Backend setup
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 3. In a new terminal - Frontend
cd frontend
npm install
npm start
```

Access the dashboard at `http://localhost:5173` and API at `http://localhost:8000/docs`

## Installation & Setup

### Option 1: Local Development

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a Python virtual environment:
```bash
python -m venv venv
source venv/Scripts/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, use `.env.example` as reference):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The dashboard will be available at `http://localhost:5173`

### Option 2: Docker Deployment with Minikube

1. Ensure Minikube is running:
```bash
minikube start
```

2. Set up Docker environment to use Minikube's Docker:
```bash
eval $(minikube docker-env)  # On Windows: minikube -p minikube docker-env | Invoke-Expression
```

3. Build the Docker images (using Minikube's Docker):
```bash
docker build -t kubonomics-backend ./backend
docker build -t kubonomics-frontend ./frontend
```

4. Deploy to Kubernetes:
```bash
kubectl apply -f k8s/kubo-backend-deployment.yaml
kubectl apply -f k8s/kubo-frontend-deployment.yaml
kubectl apply -f k8s/kubo-backend-service.yaml
kubectl apply -f k8s/kubo-frontend-service.yaml
```

5. Access the dashboard at `http://localhost:5173`

## Configuration

### Environment Variables

#### Backend
Create a `.env` file in the backend directory:
```
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3000
API_PORT=8000
```

#### Frontend
Create a `.env` file in the frontend directory:
```
PORT=5173
BACKEND_URL=http://localhost:8000
```

### Kubernetes Deployment

1. **Apply Kubernetes configuration:**
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

2. **Deploy Prometheus:**
```bash
kubectl apply -f k8s/prometheus-service.yaml
kubectl apply -f k8s/grafana-service.yaml
```

3. **Deploy Kubonomics services:**
```bash
kubectl apply -f k8s/kubo-backend-deployment.yaml
kubectl apply -f k8s/kubo-backend-service.yaml
kubectl apply -f k8s/kubo-frontend-deployment.yaml
kubectl apply -f k8s/kubo-frontend-service.yaml
```

4. **Verify deployments:**
```bash
kubectl get pods
kubectl get services
kubectl describe pod <pod-name>
```

## Monitoring & Cost Calculation

### Monitoring Setup

Prometheus collects real-time metrics from:
- **Pods** - Container-level resource consumption
- **Nodes** - Node-level resource metrics
- **Custom Metrics** - Application-specific metrics

### Metrics Used

The cost calculator uses the following Prometheus metrics:

- **`container_cpu_usage_seconds_total`** - Cumulative CPU time consumed by container
- **`container_memory_usage_bytes`** - Memory currently used by container
- **`node_cpu_seconds_total`** - Total CPU time on node
- **`node_memory_MemAvailable_bytes`** - Available memory on node

### Cost Calculation Logic

```
CPU Cost = (CPU Usage in millicores / 1000) × Cost per CPU unit × Time period
Memory Cost = (Memory Usage in GB) × Cost per GB × Time period
Total Cost = CPU Cost + Memory Cost
```

**Default Pricing:**
- CPU: $0.031 per core/hour
- Memory: $0.004 per GB/hour

### Query Examples

**Get CPU usage per pod:**
```
sum by (pod_name) (rate(container_cpu_usage_seconds_total[5m]))
```

**Get memory usage per pod:**
```
container_memory_usage_bytes / (1024^3)
```

## Usage

### Load Metrics
1. Click "Load Metrics" to fetch current cluster metrics from Prometheus
2. Metrics are displayed in real-time with pod-level breakdown

### Custom Prometheus Query
1. Enter a PromQL query in the input field
2. Click "Run Query" to execute
3. Results displayed in table format

### Cost Calculator
1. Input CPU price ($ per core/hour) - default: $0.031
2. Input Memory price ($ per GB/hour) - default: $0.004
3. Click "Calculate Cost" to compute pod-level costs
4. View cost breakdown by pod

## API Endpoints

### GET `/metrics`
Fetches cluster metrics including CPU and memory usage

**Response:**
```json
{
  "results": {
    "cpu_usage_per_pod": { ... },
    "memory_usage_per_pod": { ... }
  }
}
```

### POST `/query`
Execute custom PromQL queries

**Request Body:**
```json
{
  "query": "cpu_usage_per_pod"
}
```

## Technologies Used

- **Backend**: Python 3.8+, FastAPI, Uvicorn
- **Frontend**: Node.js, Express, EJS, HTML, CSS, JavaScript
- **Containerization**: Docker (via Minikube)
- **Orchestration**: Kubernetes (Minikube)
- **Monitoring**: Prometheus, Grafana
- **API Integration**: Python Kubernetes client, Requests library

## Kubernetes Commands

Essential commands for managing the Kubonomics deployment:

```bash
# View pods and services
kubectl get pods
kubectl get services
kubectl get deployments

# Describe resources
kubectl describe pod <pod-name>
kubectl describe service <service-name>

# View logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # Follow logs

# Port forwarding
kubectl port-forward service/<service-name> <local-port>:<service-port>

# Delete resources
kubectl delete pod <pod-name>
kubectl delete service <service-name>

# Scale deployments
kubectl scale deployment <deployment-name> --replicas=3

# Get more details
kubectl get all
kubectl get events
```

## Performance Metrics

| Metric | Value |
|--------|-------|
| Environment | Minikube |
| Monitoring | Real-time |
| Cost Accuracy | Approximate (based on metrics) |
| Deployment Time | < 2 minutes |
| API Response Time | < 500ms |
| Dashboard Load Time | < 1 second |
| Supported Pods | Unlimited |
| Metrics Retention | Configurable (default: 15 days) |

## Getting Help

1. Check the frontend dashboard at `http://localhost:5173`
2. Access the API documentation at `http://localhost:8000/docs`
3. Review Prometheus metrics at `http://localhost:9090`
4. View Grafana dashboards at `http://localhost:3000`

## Challenges & Learnings

### Challenges Overcome

1. **Setting up Prometheus with Minikube**
   - Challenge: Configuring Prometheus to scrape metrics from Minikube pods
   - Solution: Used service discovery and proper labeling in Kubernetes manifests

2. **Querying Correct Metrics**
   - Challenge: Identifying the right Prometheus metrics for CPU and memory
   - Solution: Explored Prometheus metrics endpoint and tested PromQL queries

3. **Converting Metrics into Cost Values**
   - Challenge: Translating raw Prometheus metrics into meaningful cost estimations
   - Solution: Developed conversion algorithms accounting for time periods and unit conversions

4. **Docker Integration with Minikube**
   - Challenge: Building Docker images without a separate Docker Desktop installation
   - Solution: Configured Minikube's built-in Docker environment using `minikube docker-env` and integrated image builds with Kubernetes deployments

5. **Full-Stack Integration**
   - Challenge: Connecting FastAPI backend with Express.js frontend and Prometheus metrics
   - Solution: Implemented proper CORS configuration, RESTful API endpoints, and real-time dashboard updates

### Key Learnings

- **Kubernetes Deployment**: Understanding pods, services, deployments, and resource management
- **Prometheus Monitoring**: Learning PromQL syntax and real-time metrics collection
- **Cost Estimation Algorithms**: Understanding how to calculate infrastructure costs from raw metrics
- **DevOps Practices**: Containerization, CI/CD concepts, and infrastructure as code
- **API Development**: Building RESTful APIs with FastAPI and proper data validation
- **Full-Stack Development**: Integrating backend APIs with frontend dashboards
- **Minikube Local Development**: Setting up local Kubernetes environments for testing


