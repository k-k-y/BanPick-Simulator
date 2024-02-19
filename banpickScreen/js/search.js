// about search function

const searcher = document.querySelector('.banpick__body-middle__search-op input');

function searchByInput(event) {
	deleteAllChampImage();
	const inputValue = event.target.value;
	let arr = [];
	let count = 0;

	switch (sortingBy) {
		case 0:
			arr = allChampNames;
			break;
		case 1:
			arr = topChampNames;
			break;
		case 2:
			arr = jungleChampNames;
			break;
		case 3:
			arr = midChampNames;
			break;
		case 4:
			arr = adcChampNames;
			break;
		case 5:
			arr = supportChampNames;
			break;
		default:
			break;
	}

	// if input is blank, set default state
	if (inputValue === '') {
		setChampImageByArray(arr);
		return;
	}

	for (let champ of arr) {
		let isSearched = true;
		if (inputValue.length <= champ.length) {
			for (let i = 0; i < inputValue.length; i++) {
				// without distinction of upper, lower case
				if (inputValue[i].toUpperCase() !== champ[i].toUpperCase()) {
					isSearched = false;
				}
			}
		} else {
			isSearched = false;
		}

		if (isSearched === true) {
			const imgURL = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ}.png`;
			addChampImage(imgURL, champ, count);
			count++;
		}
	}
}

// eventListener

searcher.addEventListener('input', searchByInput);
