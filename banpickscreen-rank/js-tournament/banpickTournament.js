// implement whole banpick procedure

const tournamentBanIndex = [4, 5, 3, 6, 2, 7, 1, 8, 0, 9];
const tournamentPickIndex = [0, 5, 6, 1, 2, 7, 3, 8, 9, 4];
function handleClickReadyBtn() {
	// turnCounter === -1 : before start stage
	// turnCounter === 0 ~ 5 : first ban stage
	// turnCounter === 6 ~ 11 : first pick stage
	// turnCounter === 12 ~ 15 : second ban stage
	// turnCounter === 16 ~ 19 : second pick stage
	// turnCOunter === 20 : finish stage

	console.log(turnCounter);

	if (turnCounter === -1) {
		showAnimation();
		showBanImage();
		startBan();
	} else if (turnCounter >= 0 && turnCounter <= 4 && clickedElement !== null) {
		showAnimation();
		showBanImage();
		banChamps();
	} else if (turnCounter === 5 && clickedElement !== null) {
		showAnimation();
		banChamps();
		startPick();
	} else if (turnCounter >= 6 && turnCounter <= 10 && clickedElement !== null) {
		showAnimation();
		pickChamps();
	} else if (turnCounter === 11 && clickedElement != null) {
		showAnimation();
		pickChamps();
		showBanImage();
		restartBan();
	} else if (turnCounter >= 12 && turnCounter <= 14 && clickedElement != null) {
		showAnimation();
		showBanImage();
		banChamps();
	} else if (turnCounter === 15 && clickedElement != null) {
		showAnimation();
		banChamps();
		startPick();
	} else if (turnCounter >= 16 && turnCounter <= 18 && clickedElement != null) {
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
	turnCounter++;
	isElementDisabled = false;
}

function restartBan() {
	const headText = document.querySelector('.banpick__header-middle__top span');
	const leftBar = document.querySelector('.banpick__header-middle__left-bar');

	headText.innerText = '챔피언을 금지할 차례입니다!';
	readyBtn.innerText = '챔피언 선택 금지 (밴)';
	readyBtn.classList.add('banpick__footers__pick-btn__bg-ban');
	leftBar.classList.remove('banpick__header-middle__left-bar-blue');
	resetCountDown(30);
	countDown(15);
	isElementDisabled = false;
}

function banChamps() {
	let index;
	if (turnCounter >= 0 && turnCounter <= 5) {
		index = turnCounter;
	} else if (turnCounter >= 12 && turnCounter <= 15) {
		index = turnCounter - 6;
	}

	const targetImg = toBanChampArray[tournamentBanIndex[index]];

	if (clickedElement === 'timeout') {
		targetImg.src =
			'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/champions_rewards.svg';
		targetImg.style.filter = 'grayscale(100%)';
	} else {
		targetImg.src = clickedElement.firstChild.firstChild.src;
		bannedChampArray.push(clickedElement.firstChild.firstChild.alt);
		clickedElement.firstChild.classList.remove('champ-banned__border', 'champ-hover-banned__border');
	}

	targetImg.parentElement.style.borderColor = 'gray';
	clickedElement = null;
	turnCounter++;
	countDown(15);
}

function showBanImage() {
	let index;
	if (turnCounter >= -1 && turnCounter <= 5) {
		index = turnCounter + 1;
	} else if (turnCounter >= 11 && turnCounter <= 14) {
		index = turnCounter - 5;
	}
	toBanChampArray[tournamentBanIndex[index]].src =
		'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-fill-red.png';
	toBanChampArray[tournamentBanIndex[index]].parentElement.style.opacity = 0.7;
	toBanChampArray[tournamentBanIndex[index]].parentElement.style.borderColor = '#c5223d';
}

function startPick() {
	const headText = document.querySelector('.banpick__header-middle__top span');
	const leftBar = document.querySelector('.banpick__header-middle__left-bar');

	headText.innerText = '챔피언을 선택하세요!';
	readyBtn.innerText = '챔피언 선택';

	leftBar.classList.add('banpick__header-middle__left-bar-blue');
	readyBtn.classList.remove('banpick__footers__pick-btn__bg-ban');

	resetCountDown(15);
	countDown(30);
}

function pickChamps() {
	if (clickedElement === 'timeout') {
		randomPick();
	}

	let index;
	if (turnCounter >= 6 && turnCounter <= 11) {
		index = turnCounter - 6;
	} else if (turnCounter >= 16 && turnCounter <= 19) {
		index = turnCounter - 10;
	}

	const target = champImg[tournamentPickIndex[index]];
	const img = clickedElement.firstChild.firstChild;

	target.style.backgroundImage = `url(${img.src})`;
	bannedChampArray.push(img.alt);
	target.style.backgroundSize = 'cover';
	clickedElement.firstChild.classList.remove('champ-selected__border', 'champ-hover-selected__border');

	createChampSpan(infoTexts[tournamentPickIndex[index]]);

	clickedElement = null;
	turnCounter++;
	countDown(30);
}

function showAnimation() {
	if (turnCounter === -1 || turnCounter === 1 || turnCounter === 3 || turnCounter === 11 || turnCounter === 13) {
		removeAnimation(5);
		createAnimation(0);
	} else if (turnCounter === 0 || turnCounter === 2 || turnCounter === 4 || turnCounter === 12 || turnCounter === 14) {
		removeAnimation(0);
		createAnimation(5);
	}
	if (turnCounter === 5) {
		removeAnimation(5);
		createAnimation(tournamentPickIndex[turnCounter - 5]);
	} else if (turnCounter >= 6 && turnCounter <= 10) {
		removeAnimation(tournamentPickIndex[turnCounter - 6]);
		createAnimation(tournamentPickIndex[turnCounter - 5]);
	} else if (turnCounter === 11) {
		removeAnimation(tournamentPickIndex[turnCounter - 6]);
	} else if (turnCounter === 15) {
		removeAnimation(5);
		createAnimation(tournamentPickIndex[turnCounter - 9]);
	} else if (turnCounter >= 16 && turnCounter <= 18) {
		removeAnimation(tournamentPickIndex[turnCounter - 10]);
		createAnimation(tournamentPickIndex[turnCounter - 9]);
	} else if (turnCounter === 19) {
		removeAnimation(tournamentPickIndex[turnCounter - 10]);
	}
}

// Animation - sidebox, video, action span, countBar

function createAnimation(index) {
	infoSideBox[index].classList.remove('display-none');
	infoRingImg[index].classList.remove('display-none');
	infoVideo[index].classList.remove('display-none');
	createActionSpan(infoTexts[index]);

	if (index >= 0 && index <= 4) {
		leftCountBar.classList.remove('display-none');
	} else if (index >= 5 && index <= 9) {
		rightCountBar.classList.remove('display-none');
	}
}

function removeAnimation(index) {
	infoSideBox[index].classList.add('display-none');
	infoRingImg[index].classList.add('display-none');
	infoVideo[index].classList.add('display-none');
	removeActionSpan(infoTexts[index]);

	if (index >= 0 && index <= 4) {
		leftCountBar.classList.add('display-none');
	} else if (index >= 5 && index <= 9) {
		rightCountBar.classList.add('display-none');
	}
}

function createActionSpan(target) {
	const actionText = target.children[0];

	if ((turnCounter >= -1 && turnCounter <= 4) || (turnCounter >= 11 && turnCounter <= 14)) {
		actionText.innerText = '금지 중...';
	} else {
		actionText.innerText = '선택 중...';
	}
}

function removeActionSpan(target) {
	const actionText = target.children[0];
	actionText.innerText = '';
}

function createChampSpan(target) {
	const champText = target.children[2];
	champText.innerText = clickedElement.lastChild.innerText;
}

function finishPick() {
	const headText = document.querySelector('.banpick__header-middle__top span');
	isElementDisabled = true;
	resetCountDown(30);
	countText.innerText = '';
	headText.innerText = '밴픽이 끝났습니다! 버튼을 눌러 결과창으로 이동해주세요.';
	readyBtn.innerText = '결과창으로 이동';
}

function randomPick() {
	const elements = document.querySelectorAll('.banpick__body-middle__champ');
	let randomNumber = Math.floor(Math.random() * allChampNames.length);

	for (let ban of bannedChampArray) {
		if (allChampNames[randomNumber] === ban) {
			randomPick();
			return;
		}
	}

	clickedElement = elements[randomNumber];
}

// event listener
readyBtn.addEventListener('click', handleClickReadyBtn);
