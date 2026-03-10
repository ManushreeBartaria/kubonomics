import requests

PROMETHEUS_URL = "http://192.168.59.100:30090/api/v1/query"

def query_prometheus(query):
    response = requests.get(
        PROMETHEUS_URL,
        params={"query": query}
    )
    return response.json()

if __name__ == "__main__":
    cpu_query = "sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)"
    mem_query = "sum(container_memory_usage_bytes) by (pod)"

    cpu_data = query_prometheus(cpu_query)
    mem_data = query_prometheus(mem_query)
    print("CPU Usage:")
    for metric in cpu_data["data"]["result"]:
        print(f"  {metric['metric']['pod']}: {metric['value'][1]}")
    print("Memory Usage:")
    for metric in mem_data["data"]["result"]:
        print(f"  {metric['metric']['pod']}: {metric['value'][1]}")