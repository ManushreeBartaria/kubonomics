const API_URL = "http://localhost:8000"

let latestMetrics = null


async function loadMetrics(){

const res = await fetch(`${API_URL}/metrics`)
const data = await res.json()

latestMetrics = data

const container = document.getElementById("metrics")
container.innerHTML = ""

for(const key in data.results){

const result = data.results[key]

const block = document.createElement("div")
block.className="metricBlock"

let table = `
<h3>${key}</h3>
<table>
<tr>
<th>Pod</th>
<th>Value</th>
</tr>
`

if(result.data && result.data.result){

result.data.result.forEach(item => {

const pod = item.metric.pod || "N/A"
const value = item.value ? item.value[1] : "-"

table += `
<tr>
<td>${pod}</td>
<td>${value}</td>
</tr>
`

})

}

table += "</table>"

block.innerHTML = table

container.appendChild(block)

}

}



async function runQuery(){

const query = document.getElementById("queryInput").value

const res = await fetch(`${API_URL}/query`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({query})

})

const data = await res.json()

const results = data.result.data.result

let table = `
<table>
<tr>
<th>Metric</th>
<th>Value</th>
</tr>
`

results.forEach(r => {

const metric = Object.values(r.metric).join(" | ")
const value = r.value[1]

table += `
<tr>
<td>${metric}</td>
<td>${value}</td>
</tr>
`

})

table += "</table>"

document.getElementById("queryResult").innerHTML = table

}



function calculateCost(){

if(!latestMetrics){
alert("Load metrics first")
return
}

const cpuPrice=parseFloat(document.getElementById("cpuPrice").value)
const memPrice=parseFloat(document.getElementById("memPrice").value)

const cpuData=latestMetrics.results.cpu_usage_per_pod?.data?.result || []
const memData=latestMetrics.results.memory_usage_per_pod?.data?.result || []

let table=`
<h3>Cost per Pod</h3>
<table>
<tr>
<th>Pod</th>
<th>CPU Cost</th>
<th>Memory Cost</th>
<th>Total</th>
</tr>
`

cpuData.forEach(cpu=>{

const pod=cpu.metric.pod
const cpuUsage=parseFloat(cpu.value[1])

const memEntry=memData.find(m=>m.metric.pod===pod)

let memUsage=0

if(memEntry){
memUsage=parseFloat(memEntry.value[1])/(1024*1024*1024)
}

const cpuCost=cpuUsage*cpuPrice
const memCost=memUsage*memPrice
const total=cpuCost+memCost

table+=`
<tr>
<td>${pod}</td>
<td>$${cpuCost.toFixed(4)}</td>
<td>$${memCost.toFixed(4)}</td>
<td>$${total.toFixed(4)}</td>
</tr>
`

})

table+="</table>"

document.getElementById("costResults").innerHTML=table

}