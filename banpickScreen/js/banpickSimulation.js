let turnCounter = -1;
const readyBtn = document.querySelector('#ready-btn');
// 10 ban boxs
const toBanChampArray = document.querySelectorAll('.banpick__header .banpick__champ-img img');

// 10 side champion elements
const leftVideo = document.querySelectorAll('.banpick__body-left .banpick__body__champ-info video');
const rightVideo = document.querySelectorAll('.banpick__body-right .banpick__body__champ-info video');

const leftRingImg = document.querySelectorAll('.banpick__ring-img-rotate-blue');
const rightRingImg = document.querySelectorAll('.banpick__ring-img-rotate-red');

const leftBlueBox = document.querySelectorAll('#blue-box');
const rightRedBox = document.querySelectorAll('#red-box');

const leftActionText = document.querySelectorAll('.banpick__body-left .banpick__text-action');
const rightActionText = document.querySelectorAll('.banpick__body-right .banpick__text-action');

const leftCountBar = document.querySelector('.banpick__header-middle__left-bar');
const rightCountBar = document.querySelector('.banpick__header-middle__right-bar');

// pick order
const pickOrder = [0, 5, 6, 1, 2, 7, 8, 3, 4, 9];
const champImg = document.querySelectorAll('.banpick__body__champ-info .banpick__champ-img');

function handleClickReadyBtn() {
	// turnCounter === -1 : before start stage
	// turnCounter === 0 ~ 9 : ban stage
	// turnCounter === 9 : ban stage end, pick stage start
	// turnCounter === 9 ~ 19 : pick stage
	// turnCounter === 20 : finish stage

	console.log(turnCounter);

	if (turnCounter === -1) {
		showAnimation();
		startBan();
	} else if (turnCounter >= 0 && turnCounter <= 8 && clickedElement !== null) {
		showAnimation();
		showBanImage();
		banChamps();
	} else if (turnCounter === 9 && clickedElement !== null) {
		showAnimation();
		banChamps();
		startPick();
	} else if (turnCounter >= 10 && turnCounter <= 18 && clickedElement !== null) {
		showAnimation();
		pickChamps();
	} else if (turnCounter === 19 && clickedElement != null) {
		showAnimation();
		pickChamps();
		finishPick();
	}
}

function startBan() {
	const headText = document.querySelector('.banpick__header-middle__top span');

	headText.innerText = '챔피언을 금지할 차례입니다!';
	readyBtn.innerText = '챔피언 선택 금지 (밴)';
	readyBtn.classList.add('banpick__footers__pick-btn__bg-ban');

	countDown(15);
	showBanImage();
	turnCounter++;
	isElementDisabled = false;
}

function banChamps() {
	const targetImg = toBanChampArray[turnCounter];

	targetImg.src = clickedElement.firstChild.firstChild.src;
	bannedChampArray.push(clickedElement.firstChild.firstChild.alt);
	clickedElement.firstChild.classList.remove('champ-banned__border', 'champ-hover-banned__border');
	targetImg.parentElement.style.borderColor = 'gray';

	clickedElement = null;
	turnCounter++;
	countDown(15);
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
	stopCountDown(15);
	countDown(30);
}

function pickChamps() {
	const index = turnCounter - 10;
	const target = champImg[pickOrder[index]];
	const img = clickedElement.firstChild.firstChild;

	target.style.backgroundImage = `url(${img.src})`;
	bannedChampArray.push(img.alt);
	target.style.backgroundSize = 'cover';
	clickedElement.firstChild.classList.remove('champ-selected__border', 'champ-hover-selected__border');
	clickedElement = null;
	turnCounter++;
	countDown(30);
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

// Animation - sidebox, video, span, countBar

function createAnimation(index, side) {
	if (side === 'left') {
		leftBlueBox[index].classList.add('banpick__blue-box');
		leftRingImg[index].classList.remove('display-none');
		leftVideo[index].classList.remove('display-none');
		createSpan(leftActionText[index]);

		if (turnCounter >= 9 && turnCounter <= 19) {
			leftCountBar.classList.remove('display-none');
		}
	} else if (side === 'right') {
		rightRedBox[index].classList.add('banpick__red-box');
		rightRingImg[index].classList.remove('display-none');
		rightVideo[index].classList.remove('display-none');
		createSpan(rightActionText[index]);

		if (turnCounter >= 9 && turnCounter <= 19) {
			rightCountBar.classList.remove('display-none');
		}
	}
}

function removeAnimation(index, side) {
	if (side === 'left') {
		leftBlueBox[index].classList.remove('banpick__blue-box');
		leftRingImg[index].classList.add('display-none');
		leftVideo[index].classList.add('display-none');
		removeSpan(leftActionText[index]);

		if (turnCounter >= 9 && turnCounter <= 19) {
			leftCountBar.classList.add('display-none');
		}
	} else if (side === 'right') {
		rightRedBox[index].classList.remove('banpick__red-box');
		rightRingImg[index].classList.add('display-none');
		rightVideo[index].classList.add('display-none');
		removeSpan(rightActionText[index]);

		if (turnCounter >= 9 && turnCounter <= 19) {
			rightCountBar.classList.add('display-none');
		}
	}
}

function createSpan(target) {
	if (turnCounter >= -1 && turnCounter <= 8) {
		target.innerText = '금지 중...';
	} else if (turnCounter >= 9 && turnCounter <= 18) {
		target.innerText = '선택 중...';
	}
}

function removeSpan(target) {
	target.innerText = '';
}

function finishPick() {
	const headText = document.querySelector('.banpick__header-middle__top span');
	isElementDisabled = true;
	stopCountDown(30);
	countText.innerText = '';
	headText.innerText = '밴픽이 끝났습니다! 버튼을 눌러 결과창으로 이동해주세요.';
	readyBtn.innerText = '결과창으로 이동';
}

readyBtn.addEventListener('click', handleClickReadyBtn);
