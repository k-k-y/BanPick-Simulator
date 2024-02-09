const topLineURL =
	'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png';
const jungleLineURL =
	'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png';
const midLineURL =
	'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png';
const adcLineURL =
	'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png';
const supportLineURL =
	'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png';

const championsInfoURL = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json';

const championsDiv = document.querySelector('.banpick__body-middle__champions');

function getChampNames(array, jsonData) {
	for (let name in jsonData) {
		array.push(name);
	}
}

function addImage(imgURL, name, count) {
	const champDiv = document.createElement('button');
	champDiv.classList.add('banpick__body-middle__champ');

	const img = document.createElement('img');
	img.src = imgURL;
	img.alt = name;

	// when champion is created 6 times, create new champ row
	if (count % 6 === 0) {
		const champRow = document.createElement('div');
		champRow.classList.add('banpick__body-middle__champs-row');
		championsDiv.appendChild(champRow);

		champDiv.appendChild(img);
		champRow.appendChild(champDiv);
	} else {
		const champRow = document.querySelector('.banpick__body-middle__champs-row:last-of-type');

		champDiv.appendChild(img);
		champRow.appendChild(champDiv);
	}
}

async function sequentialRequests() {
	try {
		const res = await axios.get(championsInfoURL);

		const jsonData = res.data.data;
		const champNames = [];
		getChampNames(champNames, jsonData);

		let count = 0;
		for (let name of champNames) {
			const imgURL = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${name}.png`;
			addImage(imgURL, name, count);
			count++;
		}
	} catch (e) {
		console.log(e);
	}
}

function addLineIcons() {
	const line_imgs = document.querySelectorAll('.banpick__body-middle__role-op img');
	const lineImgURLs = [topLineURL, jungleLineURL, midLineURL, adcLineURL, supportLineURL];

	for (let i = 0; i < 5; i++) {
		line_imgs[i].src = lineImgURLs[i];
	}
}

addLineIcons();
sequentialRequests();
