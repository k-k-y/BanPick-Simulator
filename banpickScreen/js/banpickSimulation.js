let turnCounter = -1;
const readyBtn = document.querySelector('#ready-btn');
const toBanChampArray = document.querySelectorAll('.banpick__header .banpick__champ-img img');

function handleClickReadyBtn() {
	if (turnCounter === -1) {
		startBanpick();
	}

	if (turnCounter >= 0 && turnCounter <= 9 && clickedElement !== null) {
		banChamps();
	}
}

function startBanpick() {
	const headText = document.querySelector('.banpick__header-middle__top span');
	headText.innerText = '챔피언을 금지할 차례입니다!';
	readyBtn.innerText = '챔피언 선택 금지 (밴)';
	readyBtn.classList.add('banpick__footers__pick-btn__bg-ban');

	countDown(30);

	turnCounter++;
}

function banChamps() {
	const targetImg = toBanChampArray[turnCounter];
	targetImg.src = clickedElement.firstChild.firstChild.src;
	turnCounter++;
	bannedChampArray.push(clickedElement.firstChild.firstChild.alt);

	clickedElement = null;
}

readyBtn.addEventListener('click', handleClickReadyBtn);
