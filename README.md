# Kubonomics

A comprehensive Kubernetes monitoring and cost analysis dashboard that integrates with Prometheus and Grafana to provide real-time cluster metrics and cost calculations.

## Features

- **Cluster Metrics**: Monitor CPU, memory, and pod-level resource usage
- **Custom Prometheus Queries**: Execute PromQL queries directly from the dashboard
- **Cost Calculator**: Calculate infrastructure costs based on CPU and memory usage
- **Real-time Dashboard**: Interactive web-based monitoring interface
- **Kubernetes Integration**: Seamless integration with Kubernetes clusters via Prometheus

## Project Structure

```
kubonomics/
├── backend/
│   ├── main.py              # FastAPI backend server
│   ├── api.py               # API endpoints
│   ├── client.py            # Prometheus client
│   ├── schemas.py           # Data schemas
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── index.html           # Dashboard UI
│   ├── script.js            # Frontend logic
│   └── style.css            # Styling
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── prometheus-service.yaml
│   └── grafana-service.yaml
├── docker-compose.yml       # Local development setup
└── README.md
```

## Prerequisites

- Python 3.8+
- Node.js (for frontend development)
- Docker & Docker Compose (optional, for containerized setup)
- Kubernetes cluster with Prometheus installed

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd kubonomics
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Start a local web server:
```bash
python -m http.server 5500
```

3. Open your browser and navigate to:
```
http://localhost:5500
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3000
API_PORT=8000
```

### Kubernetes Deployment

Use the provided Kubernetes manifests to deploy:

```bash
kubectl apply -f k8s/
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

## Docker Deployment

```bash
docker-compose up
```

This will start:
- Prometheus (port 9090)
- Grafana (port 3000)
- Backend API (port 8000)
- Frontend (port 5500)

## Technologies Used

- **Backend**: Python, FastAPI
- **Frontend**: HTML, CSS, JavaScript
- **Monitoring**: Prometheus, Grafana
- **Container**: Docker, Kubernetes
- **Infrastructure**: Kubernetes, Prometheus ServiceMonitor

## License

MIT License

## Support

For issues or questions, please contact the development team.
