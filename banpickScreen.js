// create default banpick screen
const championsInfoURL = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json';
const championsDiv = document.querySelector('.banpick__body-middle__champions');
const allChampNames = [];

function getAllChampNames(array, jsonData) {
	for (let name in jsonData) {
		array.push(name);
	}
}

// add champion's images in body-middle__champions
function addChampImage(imgURL, name, count) {
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

// request champion infors
async function sequentialRequests() {
	try {
		const res = await axios.get(championsInfoURL);
		const jsonData = res.data.data;
		getAllChampNames(allChampNames, jsonData);
		setChampImageByArray(allChampNames);
		console.log(allChampNames);
	} catch (e) {
		console.log(e);
	}
}

sequentialRequests();
// ------------------------------------------------------------------------------------

const topBtn = document.querySelector('.role-op__top-disabled');
const jungleBtn = document.querySelector('.role-op__jungle-disabled');
const midBtn = document.querySelector('.role-op__mid-disabled');
const adcBtn = document.querySelector('.role-op__adc-disabled');
const supportBtn = document.querySelector('.role-op__support-disabled');

const btnArray = [topBtn, jungleBtn, midBtn, adcBtn, supportBtn];
const btnName = ['top', 'jungle', 'mid', 'adc', 'support'];
let isBtnChange = false;

function handleMouseoverBtn(num, name) {
	if (!isBtnChange) btnArray[num].classList.add(`role-op__${name}-hover`);
}

function handleMouseoutBtn(num, name) {
	if (!isBtnChange) btnArray[num].classList.remove(`role-op__${name}-hover`);
}

function handleClickBtn(num, name, champArray) {
	if (btnArray[num].classList.contains(`role-op__${name}-selected`)) {
		btnArray[num].classList.remove(`role-op__${name}-selected`);
		isBtnChange = false;
		deleteAllChampImage();
		setChampImageByArray(allChampNames);
	} else if (!btnArray[num].classList.contains(`role-op__${name}-selected`) && !isBtnChange) {
		btnArray[num].classList.add(`role-op__${name}-selected`);
		isBtnChange = true;
		deleteAllChampImage();
		setChampImageByArray(champArray);
	}
}

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
