from fastapi import APIRouter, HTTPException
from .schemas import CustomQueryRequest, AllQueriesResponse, QueryResult
from .client import query_prometheus

router = APIRouter()

PREDEFINED_QUERIES = {

    "cpu_usage_per_pod":
    "sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)",

    "memory_usage_per_pod":
    "sum(container_memory_usage_bytes) by (pod)",

    "cpu_usage_per_namespace":
    "sum(rate(container_cpu_usage_seconds_total[5m])) by (namespace)",

    "memory_usage_per_namespace":
    "sum(container_memory_usage_bytes) by (namespace)",

    "cpu_requests":
    "kube_pod_container_resource_requests_cpu_cores",

    "memory_requests":
    "kube_pod_container_resource_requests_memory_bytes",

    "node_cpu_cores":
    "machine_cpu_cores",

    "node_memory_total":
    "node_memory_MemTotal_bytes",

    "running_pods":
    "count(kube_pod_info)"
}

@router.get("/metrics", response_model=AllQueriesResponse)
def run_all_queries():

    results = {}

    for name, promql in PREDEFINED_QUERIES.items():
        try:
            results[name] = query_prometheus(promql)
        except Exception as e:
            results[name] = {"error": str(e)}

    return {"results": results}


@router.post("/query", response_model=QueryResult)
def custom_query(payload: CustomQueryRequest):

    try:
        data = query_prometheus(payload.query)

        return {
            "query": payload.query,
            "result": data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))