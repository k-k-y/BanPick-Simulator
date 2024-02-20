let turnCounter = -1;
const readyBtn = document.querySelector('#ready-btn');
const toBanChampArray = document.querySelectorAll('.banpick__header .banpick__champ-img img');

const sideBlueBox = document.querySelectorAll('#blue-box');
const sideRedBox = document.querySelectorAll('#red-box');

function handleClickReadyBtn() {
	if (turnCounter === -1) {
		startBanpick();
	} else if (turnCounter >= 0 && turnCounter <= 8 && clickedElement !== null) {
		showBanningThings();
		banChamps();
	} else if (turnCounter === 9) {
		showSideBox();
		banChamps();
	}
}

function startBanpick() {
	const headText = document.querySelector('.banpick__header-middle__top span');
	headText.innerText = '챔피언을 금지할 차례입니다!';
	readyBtn.innerText = '챔피언 선택 금지 (밴)';
	readyBtn.classList.add('banpick__footers__pick-btn__bg-ban');

	countDown(30);
	showBanningThings();
	turnCounter++;
}

function banChamps() {
	const targetImg = toBanChampArray[turnCounter];
	targetImg.src = clickedElement.firstChild.firstChild.src;
	bannedChampArray.push(clickedElement.firstChild.firstChild.alt);
	clickedElement.firstChild.classList.remove('champ-banned__border', 'champ-hover-banned__border');
	clickedElement = null;
	targetImg.parentElement.style.borderColor = 'gray';

	turnCounter++;
	countDown(30);
}

function showBanningThings() {
	showSideBox();

	toBanChampArray[turnCounter + 1].src =
		'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-fill-red.png';
	toBanChampArray[turnCounter + 1].parentElement.style.opacity = 0.7;
	toBanChampArray[turnCounter + 1].parentElement.style.borderColor = '#c5223d';
}

function showSideBox() {
	if (turnCounter === -1) {
		sideBlueBox[turnCounter + 1].classList.add('banpick__blue-box');
	} else if (turnCounter >= 0 && turnCounter <= 3) {
		sideBlueBox[turnCounter + 1].classList.add('banpick__blue-box');
		sideBlueBox[turnCounter].classList.remove('banpick__blue-box');
	} else if (turnCounter === 4) {
		sideRedBox[turnCounter - 4].classList.add('banpick__red-box');
		sideBlueBox[turnCounter].classList.remove('banpick__blue-box');
	} else if (turnCounter >= 5 && turnCounter <= 8) {
		sideRedBox[turnCounter - 4].classList.add('banpick__red-box');
		sideRedBox[turnCounter - 5].classList.remove('banpick__red-box');
	} else if (turnCounter === 9) {
		sideRedBox[turnCounter - 5].classList.remove('banpick__red-box');
	}
}
readyBtn.addEventListener('click', handleClickReadyBtn);
