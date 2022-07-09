async function getInfo() {
  const stopId = document.getElementById("stopId").value;
  const stopName = document.getElementById("stopName");
  const list = document.getElementById("buses");

  const url = `http://localhost:3030/jsonstore/bus/businfos/${stopId}`;

  try {
    list.textContent = ''
    stopName.textContent = 'Loading....'
    const response = await fetch(url);
   
    if (response.ok == false) {
		throw new Error(`${response.status} ${response.statusText}`);
	}
    const data = await response.json();
    stopName.textContent = data.name;

    Object.entries(data.buses).forEach(bus => {
        const liElement = document.createElement('li');
        liElement.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`
        list.appendChild(liElement)
    })


   

  } catch (error) {
    stopName.textContent = `Error`
  }
}
