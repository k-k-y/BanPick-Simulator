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
	// turnCounter === 10 ~ 19 : pick stage
	// turnCounter === 20 : finish stage

	console.log(turnCounter);

	showAnimation();

	if (turnCounter === -1) {
		startBan();
	} else if (turnCounter >= 0 && turnCounter <= 8 && clickedElement !== null) {
		showBanImage();
		banChamps();
	} else if (turnCounter === 9) {
		banChamps();
		startPick();
	} else if (turnCounter >= 10 && turnCounter <= 20) {
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

function showAnimation() {
	if (turnCounter === -1) {
		createAnimation(turnCounter + 1, 'left');
	} else if (turnCounter >= 0 && turnCounter <= 3) {
		createAnimation(turnCounter + 1, 'left');
		removeAnimation(turnCounter, 'left');
	} else if (turnCounter === 4) {
		removeAnimation(turnCounter, 'left');
		createAnimation(turnCounter - 4, 'right');
	} else if (turnCounter >= 5 && turnCounter <= 8) {
		createAnimation(turnCounter - 4, 'right');
		removeAnimation(turnCounter - 5, 'right');
	} else if (turnCounter === 9) {
		removeAnimation(turnCounter - 5, 'right');
		createAnimation(0, 'left');
	} else if (turnCounter === 10) {
		removeAnimation(0, 'left');
		createAnimation(0, 'right');
	} else if (turnCounter === 11) {
		removeAnimation(0, 'right');
		createAnimation(1, 'right');
	} else if (turnCounter === 12) {
		removeAnimation(1, 'right');
		createAnimation(1, 'left');
	} else if (turnCounter === 13) {
		removeAnimation(1, 'left');
		createAnimation(2, 'left');
	} else if (turnCounter === 14) {
		removeAnimation(2, 'left');
		createAnimation(2, 'right');
	} else if (turnCounter === 15) {
		removeAnimation(2, 'right');
		createAnimation(3, 'right');
	} else if (turnCounter === 16) {
		removeAnimation(3, 'right');
		createAnimation(3, 'left');
	} else if (turnCounter === 17) {
		removeAnimation(3, 'left');
		createAnimation(4, 'left');
	} else if (turnCounter === 18) {
		removeAnimation(4, 'left');
		createAnimation(4, 'right');
	} else if (turnCounter === 19) {
		removeAnimation(4, 'right');
	}
}

function createAnimation(index, side) {
	if (side === 'left') {
		sideBlueBox[index].classList.add('banpick__blue-box');
		leftRingImg[index].classList.remove('hide');
	} else if (side === 'right') {
		sideRedBox[index].classList.add('banpick__red-box');
		rightRingImg[index].classList.remove('hide');
	}
}

function removeAnimation(index, side) {
	if (side === 'left') {
		sideBlueBox[index].classList.remove('banpick__blue-box');
		leftRingImg[index].classList.add('hide');
	} else if (side === 'right') {
		sideRedBox[index].classList.remove('banpick__red-box');
		rightRingImg[index].classList.add('hide');
	}
}

readyBtn.addEventListener('click', handleClickReadyBtn);
