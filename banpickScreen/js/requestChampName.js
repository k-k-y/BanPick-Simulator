// create default banpick screen

function getAllChampNames(array, jsonData) {
	for (let name in jsonData) {
		array.push(name);
	}
}

// request champion infors

async function sequentialRequests() {
	try {
		const res = await axios.get(championsInfoURL);
		const jsonData = res.data.data;
		getAllChampNames(allChampNames, jsonData);
		setChampImageByArray(allChampNames); // show all champion images
	} catch (e) {
		console.log(e);
	}
}

sequentialRequests();
