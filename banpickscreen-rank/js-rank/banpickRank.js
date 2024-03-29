// implement whole banpick procedure

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
	toBanChampArray[turnCounter + 1].src =
		'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-fill-red.png';
	toBanChampArray[turnCounter + 1].parentElement.style.opacity = 0.7;
	toBanChampArray[turnCounter + 1].parentElement.style.borderColor = '#c5223d';
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

	const index = turnCounter - 10;
	const target = champImg[pickOrder[index]];
	const img = clickedElement.firstChild.firstChild;

	target.style.backgroundImage = `url(${img.src})`;
	bannedChampArray.push(img.alt);
	target.style.backgroundSize = 'cover';
	clickedElement.firstChild.classList.remove('champ-selected__border', 'champ-hover-selected__border');

	createChampSpan(infoTexts[pickOrder[index]]);

	clickedElement = null;
	turnCounter++;
	countDown(30);
}

function showAnimation() {
	const pickIndex = turnCounter - 9;
	if (turnCounter === -1) {
		createAnimation(turnCounter + 1);
	} else if (turnCounter >= 0 && turnCounter <= 8) {
		createAnimation(turnCounter + 1);
		removeAnimation(turnCounter);
	} else if (turnCounter === 9) {
		removeAnimation(turnCounter);
		createAnimation(pickOrder[pickIndex]);
	} else if (turnCounter >= 10 && turnCounter <= 18) {
		removeAnimation(pickOrder[pickIndex - 1]);
		createAnimation(pickOrder[pickIndex]);
	} else if (turnCounter === 19) {
		removeAnimation(pickOrder[pickIndex - 1]);
	}
}

// Animation - sidebox, video, action span, countBar

function createAnimation(index) {
	infoSideBox[index].classList.remove('display-none');
	infoRingImg[index].classList.remove('display-none');
	infoVideo[index].classList.remove('display-none');
	createActionSpan(infoTexts[index]);

	if (turnCounter >= 9) {
		if (turnCounter >= index >= 0 && index <= 4) {
			leftCountBar.classList.remove('display-none');
		} else if (index >= 5 && index <= 9) {
			rightCountBar.classList.remove('display-none');
		}
	}
}

function removeAnimation(index) {
	infoSideBox[index].classList.add('display-none');
	infoRingImg[index].classList.add('display-none');
	infoVideo[index].classList.add('display-none');
	removeActionSpan(infoTexts[index]);

	if (turnCounter >= 9) {
		if (index >= 0 && index <= 4) {
			leftCountBar.classList.add('display-none');
		} else if (index >= 5 && index <= 9) {
			rightCountBar.classList.add('display-none');
		}
	}
}

function createActionSpan(target) {
	const actionText = target.children[0];

	if (turnCounter >= -1 && turnCounter <= 8) {
		actionText.innerText = '금지 중...';
	} else if (turnCounter >= 9 && turnCounter <= 18) {
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
