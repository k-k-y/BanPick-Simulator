let turnCounter = -1;
const readyBtn = document.querySelector('#ready-btn');
// 10 ban boxs
const toBanChampArray = document.querySelectorAll('.banpick__header .banpick__champ-img img');

// 10 side champion elements
const leftRingImg = document.querySelectorAll('.banpick__ring-img-rotate-blue');
const rightRingImg = document.querySelectorAll('.banpick__ring-img-rotate-red');

const sideBlueBox = document.querySelectorAll('#blue-box');
const sideRedBox = document.querySelectorAll('#red-box');

function handleClickReadyBtn() {
	// turnCounter === -1 : before start stage
	// turnCounter === 0 ~ 9 : ban stage
	// turnCounter === 10 ~ 15 : pick stage
	// turnCounter === 16 : finish stage

	console.log(turnCounter);

	if (turnCounter === -1) {
		startBan();
	} else if (turnCounter >= 0 && turnCounter <= 8 && clickedElement !== null) {
		showSideBox();
		showBanImage();
		banChamps();
	} else if (turnCounter === 9) {
		showPickAnimation();
		banChamps();
		startPick();
	} else if (turnCounter >= 10 && turnCounter <= 15) {
		showPickAnimation();
		pickChamps();
	}
}

function startBan() {
	const headText = document.querySelector('.banpick__header-middle__top span');

	headText.innerText = '챔피언을 금지할 차례입니다!';
	readyBtn.innerText = '챔피언 선택 금지 (밴)';
	readyBtn.classList.add('banpick__footers__pick-btn__bg-ban');

	countDown(30);
	showBanImage();
	turnCounter++;
	isElementDisabled = false;
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

function showBanImage() {
	toBanChampArray[turnCounter + 1].src =
		'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-fill-red.png';
	toBanChampArray[turnCounter + 1].parentElement.style.opacity = 0.7;
	toBanChampArray[turnCounter + 1].parentElement.style.borderColor = '#c5223d';
}

function startPick() {
	const headText = document.querySelector('.banpick__header-middle__top span');
	const rightBar = document.querySelector('.banpick__header-middle__left-bar');

	headText.innerText = '챔피언을 선택하세요!';
	readyBtn.innerText = '챔피언 선택';

	rightBar.classList.add('banpick__header-middle__left-bar-blue');
	readyBtn.classList.remove('banpick__footers__pick-btn__bg-ban');
}

function pickChamps() {
	turnCounter++;
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
		sideBlueBox[0].classList.add('banpick__blue-box');
	} else if (turnCounter === 10) {
		sideBlueBox[0].classList.remove('banpick__blue-box');
		sideRedBox[0].classList.add('banpick__red-box');
		sideRedBox[1].classList.add('banpick__red-box');
	} else if (turnCounter === 11) {
		sideRedBox[0].classList.remove('banpick__red-box');
		sideRedBox[1].classList.remove('banpick__red-box');
		sideBlueBox[1].classList.add('banpick__blue-box');
		sideBlueBox[2].classList.add('banpick__blue-box');
	} else if (turnCounter === 12) {
		sideBlueBox[1].classList.remove('banpick__blue-box');
		sideBlueBox[2].classList.remove('banpick__blue-box');
		sideRedBox[2].classList.add('banpick__red-box');
		sideRedBox[3].classList.add('banpick__red-box');
	} else if (turnCounter === 13) {
		sideRedBox[2].classList.remove('banpick__red-box');
		sideRedBox[3].classList.remove('banpick__red-box');
		sideBlueBox[3].classList.add('banpick__blue-box');
		sideBlueBox[4].classList.add('banpick__blue-box');
	} else if (turnCounter === 14) {
		sideBlueBox[3].classList.remove('banpick__blue-box');
		sideBlueBox[4].classList.remove('banpick__blue-box');
		sideRedBox[4].classList.add('banpick__red-box');
	} else if (turnCounter === 15) {
		sideRedBox[4].classList.remove('banpick__red-box');
	}
}

function showRotateImg() {
	switch (turnCounter) {
		case 9:
			leftRingImg[0].classList.remove('hide');
			break;
		case 10:
			leftRingImg[0].classList.add('hide');
			rightRingImg[0].classList.remove('hide');
			rightRingImg[1].classList.remove('hide');
			break;
		case 11:
			rightRingImg[0].classList.add('hide');
			rightRingImg[1].classList.add('hide');
			leftRingImg[1].classList.remove('hide');
			leftRingImg[2].classList.remove('hide');
			break;
		case 12:
			leftRingImg[1].classList.add('hide');
			leftRingImg[2].classList.add('hide');
			rightRingImg[2].classList.remove('hide');
			rightRingImg[3].classList.remove('hide');
			break;
		case 13:
			rightRingImg[2].classList.add('hide');
			rightRingImg[3].classList.add('hide');
			leftRingImg[3].classList.remove('hide');
			leftRingImg[4].classList.remove('hide');
			break;
		case 14:
			leftRingImg[3].classList.add('hide');
			leftRingImg[4].classList.add('hide');
			rightRingImg[4].classList.remove('hide');
			break;
		case 15:
			rightRingImg[4].classList.add('hide');
		default:
			break;
	}
}
function showPickAnimation() {
	showSideBox();
	showRotateImg();
}

readyBtn.addEventListener('click', handleClickReadyBtn);
