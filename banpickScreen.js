// create default banpick screen

const championsInfoURL = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json';
const championsDiv = document.querySelector('.banpick__body-middle__champions');
const allChampNames = [];

function getAllChampNames(array, jsonData) {
	for (let name in jsonData) {
		array.push(name);
	}
}

// add all champion's image

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

	if (clickedElement !== null && clickedElement.firstChild.firstChild.alt === name) {
		champDiv.classList.add('champ-block-pointer');
		imgBox.classList.add('champ-selected__border', 'champ-block-pointer');
		img.classList.add('champ-selected', 'champ-block-pointer');
		clickedElement = champDiv;
	}
}

// request champion infors

async function sequentialRequests() {
	try {
		const res = await axios.get(championsInfoURL);
		const jsonData = res.data.data;
		getAllChampNames(allChampNames, jsonData);
		setChampImageByArray(allChampNames);
	} catch (e) {
		console.log(e);
	}
}

sequentialRequests();

// ------------------------------------------------------------------------------------

// about roleOpButtons

const topBtn = document.querySelector('.role-op__top-disabled');
const jungleBtn = document.querySelector('.role-op__jungle-disabled');
const midBtn = document.querySelector('.role-op__mid-disabled');
const adcBtn = document.querySelector('.role-op__adc-disabled');
const supportBtn = document.querySelector('.role-op__support-disabled');

const btnArray = [topBtn, jungleBtn, midBtn, adcBtn, supportBtn];
const btnName = ['top', 'jungle', 'mid', 'adc', 'support'];
let sortingBy = 0; // 0: default, 1: top ... 5: support

// handle event functions of roleOpButtons.

function handleMouseoverBtn(num, name) {
	if (sortingBy !== num + 1) btnArray[num].classList.add(`role-op__${name}-hover`);
}

function handleMouseoutBtn(num, name) {
	if (sortingBy !== num + 1) btnArray[num].classList.remove(`role-op__${name}-hover`);
}

// change button image & sorting champion image by position

function handleClickBtn(num, name, champArray) {
	if (sortingBy === num + 1) {
		// click already selected -> set default
		btnArray[num].classList.remove(`role-op__${name}-hover`);
		sortingBy = 0;
		deleteAllChampImage();
		setChampImageByArray(allChampNames);
	} else {
		// click not selected -> set selected to disabled, clicked to selected
		for (let i = 0; i < 5; i++) {
			if (btnArray[i].classList.contains(`role-op__${btnName[i]}-hover`)) {
				btnArray[i].classList = `role-op__${btnName[i]}-disabled`;
			}
		}
		btnArray[num].classList.add(`role-op__${name}-hover`);
		sortingBy = num + 1;
		deleteAllChampImage();
		setChampImageByArray(champArray);
	}
}

// delete image & create image functions

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

// ------------------------------------------------------------------------------------

// implement search function

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

// implement champion hover, clicked function

let clickedElement = null;

function deleteDisabled() {
	if (clickedElement !== null) {
		clickedElement.classList.remove('champ-block-pointer');
		clickedElement.firstChild.classList.remove('champ-block-pointer', 'champ-selected__border');
		clickedElement.firstChild.firstChild.classList.remove('champ-block-pointer', 'champ-selected');
	}
}

function selectChamp(cur) {
	if (cur.tagName === 'BUTTON') {
		cur.classList.add('champ-block-pointer');
		cur.firstChild.classList.add('champ-selected__border', 'champ-block-pointer');
		cur.firstChild.firstChild.classList.add('champ-selected', 'champ-block-pointer');
		clickedElement = cur;
	} else if (cur.tagName === 'DIV') {
		cur.parentElement.classList.add('champ-block-pointer');
		cur.classList.add('champ-selected__border', 'champ-block-pointer');
		cur.firstChild.classList.add('champ-selected', 'champ-block-pointer');
		clickedElement = cur.parentElement;
	} else if (cur.tagName === 'IMG') {
		cur.parentElement.parentElement.classList.add('champ-block-pointer');
		cur.parentElement.classList.add('champ-selected__border', 'champ-block-pointer');
		cur.classList.add('champ-selected', 'champ-block-pointer');
		clickedElement = cur.parentElement.parentElement;
	}
}

function handleClickChamp(event) {
	event.stopPropagation();

	const cur = event.target;

	if (cur.matches('.banpick__body-middle__champ, .banpick__body-middle__champ div, .banpick__body-middle__champ img')) {
		deleteDisabled();
		selectChamp(cur);
	}
}

// implement of text input functions

const inputBox = document.querySelector('#banpick-input');
let composing = false;

function handlePressEnter(event) {
	// prevent to enter twice (Korean language)
	if (event.isComposing) {
		return;
	}

	if (event.key === 'Enter' && inputBox.value !== '') {
		createText(inputBox.value);
	}
}

function createText(value) {
	const textBox = document.querySelector('.banpick__chat__text-box');
	const text = document.createElement('div');
	text.classList.add('banpick__chat__text');

	const span1 = document.createElement('span');
	const span2 = document.createElement('span');
	span1.innerText = 'Player 1';
	span2.innerText = ` : ${value}`;

	text.appendChild(span1);
	text.appendChild(span2);
	textBox.prepend(text);

	// clear input
	inputBox.value = '';

	// place scrollbar to bottom
	textBox.scrollTop = textBox.scrollHeight;
}
// add eventlistener

for (let i = 0; i < 5; i++) {
	btnArray[i].addEventListener('mouseover', () => {
		handleMouseoverBtn(i, btnName[i]);
	});
	btnArray[i].addEventListener('mouseout', () => {
		handleMouseoutBtn(i, btnName[i]);
	});
}

btnArray[0].addEventListener('click', () => {
	handleClickBtn(0, btnName[0], topChampNames);
});
btnArray[1].addEventListener('click', () => {
	handleClickBtn(1, btnName[1], jungleChampNames);
});
btnArray[2].addEventListener('click', () => {
	handleClickBtn(2, btnName[2], midChampNames);
});
btnArray[3].addEventListener('click', () => {
	handleClickBtn(3, btnName[3], adcChampNames);
});
btnArray[4].addEventListener('click', () => {
	handleClickBtn(4, btnName[4], supportChampNames);
});

// eventListener for search function

searcher.addEventListener('input', searchByInput);

// eventListener for select champion function

championsDiv.addEventListener('click', handleClickChamp);

// eventListener for input text

inputBox.addEventListener('keydown', handlePressEnter);

// ------------------------------------------------------------------------------------

// champ name arrays by position

const topChampNames = [
	'Aatrox',
	'Akali',
	'Camille',
	'Chogath',
	'Darius',
	'DrMundo',
	'Fiora',
	'Gangplank',
	'Garen',
	'Gnar',
	'Gragas',
	'Gwen',
	'Illaoi',
	'Irelia',
	'Jax',
	'Jayce',
	'Kayle',
	'Kennen',
	'Kled',
	'Lillia',
	'Malphite',
	'Mordekaiser',
	'Nasus',
	'Olaf',
	'Ornn',
	'Quinn',
	'Renekton',
	'Riven',
	'Rumble',
	'Sejuani',
	'Sett',
	'Shen',
	'Shyvana',
	'Singed',
	'Sion',
	'TahmKench',
	'Teemo',
	'Tryndamere',
	'Urgot',
	'Vayne',
	'Volibear',
	'MonkeyKing',
	'Yasuo',
	'Yone',
	'Yorick',
];

const jungleChampNames = [
	'Amumu',
	'Belveth',
	'Diana',
	'Ekko',
	'Elise',
	'Evelynn',
	'Fiddlesticks',
	'Graves',
	'Hecarim',
	'Ivern',
	'JarvanIV',
	'Karthus',
	'Kayn',
	'Khazix',
	'Kindred',
	'LeeSin',
	'Lillia',
	'MasterYi',
	'Nidalee',
	'Nocturne',
	'Nunu',
	'Pantheon',
	'Poppy',
	'Rammus',
	'RekSai',
	'Rengar',
	'Sejuani',
	'Shaco',
	'Shyvana',
	'Skarner',
	'Taliyah',
	'Talon',
	'Trundle',
	'Udyr',
	'Vi',
	'Viego',
	'Volibear',
	'Warwick',
	'MonkeyKing',
	'XinZhao',
	'Zac',
	'Zed',
];

const midChampNames = [
	'Ahri',
	'Akali',
	'Akshan',
	'Anivia',
	'Annie',
	'AurelionSol',
	'Azir',
	'Cassiopeia',
	'Corki',
	'Ekko',
	'Fizz',
	'Galio',
	'Gangplank',
	'Heimerdinger',
	'Irelia',
	'Kassadin',
	'Katarina',
	'Leblanc',
	'Lissandra',
	'Lux',
	'Malzahar',
	'Neeko',
	'Orianna',
	'Qiyana',
	'Ryze',
	'Swain',
	'Sylas',
	'Syndra',
	'Taliyah',
	'Talon',
	'TwistedFate',
	'Veigar',
	'Vex',
	'Viktor',
	'Vladimir',
	'Xerath',
	'Yasuo',
	'Yone',
	'Zed',
	'Ziggs',
	'Zoe',
];

const adcChampNames = [
	'Aphelios',
	'Ashe',
	'Caitlyn',
	'Draven',
	'Ezreal',
	'Jhin',
	'Jinx',
	'Kaisa',
	'Kalista',
	'KogMaw',
	'Lucian',
	'MissFortune',
	'Nilah',
	'Samira',
	'Sivir',
	'Smolder',
	'Tristana',
	'Twitch',
	'Varus',
	'Vayne',
	'Xayah',
	'Yasuo',
	'Zeri',
	'Ziggs',
];

const supportChampNames = [
	'Alistar',
	'Amumu',
	'Ashe',
	'Bard',
	'Blitzcrank',
	'Brand',
	'Braum',
	'Janna',
	'Karma',
	'Leona',
	'Lulu',
	'Lux',
	'Maokai',
	'MissFortune',
	'Morgana',
	'Nami',
	'Nautilus',
	'Pantheon',
	'Pyke',
	'Rakan',
	'Rell',
	'Renata',
	'Senna',
	'Seraphine',
	'Sona',
	'Soraka',
	'Swain',
	'Taric',
	'Thresh',
	'Velkoz',
	'Xerath',
	'Yuumi',
	'Zilean',
	'Zyra',
];

// ------------------------------------------------------------------------------------
