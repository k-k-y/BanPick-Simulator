// add all champion's image

let bannedChampArray = [];

function addChampImage(imgURL, name, count) {
	const champDiv = document.createElement('button');
	champDiv.classList.add('banpick__body-middle__champ');

	const imgBox = document.createElement('div');
	imgBox.classList.add('banpick__body-middle__champ-img-box');

	const img = document.createElement('img');
	img.src = imgURL;
	img.alt = name;

	// when champion is created 6 times, create new champ row
	if (count % 6 === 0) {
		const champRow = document.createElement('div');
		champRow.classList.add('banpick__body-middle__champs-row');
		championsDiv.appendChild(champRow);

		imgBox.appendChild(img);
		champDiv.appendChild(imgBox);
		champRow.appendChild(champDiv);
	} else {
		const champRow = document.querySelector('.banpick__body-middle__champs-row:last-of-type');

		imgBox.appendChild(img);
		champDiv.appendChild(imgBox);
		champRow.appendChild(champDiv);
	}

	const champName = document.createElement('span');
	champName.innerText = name;
	champDiv.appendChild(champName);

	// create selected champion just before
	if (clickedElement !== null && clickedElement.firstChild.firstChild.alt === name) {
		champDiv.classList.add('champ-block-pointer');
		imgBox.classList.add('champ-selected__border', 'champ-block-pointer');
		img.classList.add('champ-selected', 'champ-block-pointer');
		clickedElement = champDiv;
	}

	// create banned | selected champions
	if (bannedChampArray.includes(name)) {
		champDiv.classList.add('champ-block-pointer');
		imgBox.classList.add('champ-block-pointer');
		img.classList.add('champ-selected', 'champ-block-pointer');
	}
}

// delete image & create image functions

const inputBox = document.querySelector('#banpick-input');
let composing = false;

function deleteAllChampImage() {
	const allChampDivs = document.querySelectorAll('.banpick__body-middle__champ');
	const allChampRows = document.querySelectorAll('.banpick__body-middle__champs-row');

	for (let champ of allChampDivs) {
		champ.remove();
	}
	for (let row of allChampRows) {
		row.remove();
	}
}

function setChampImageByArray(nameArray) {
	deleteAllChampImage();
	let count = 0;
	for (let name of nameArray) {
		const imgURL = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${name}.png`;
		addChampImage(imgURL, name, count);
		count++;
	}
}
