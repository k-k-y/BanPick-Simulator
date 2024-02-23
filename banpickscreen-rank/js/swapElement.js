function swapElements(element1, element2) {
	const temp = document.createElement('div');
	element1.parentNode.insertBefore(temp, element1);
	element2.parentNode.insertBefore(element1, element2);
	temp.parentNode.insertBefore(element2, temp);
	temp.parentNode.removeChild(temp);
}

function swapChampInfo(index1, index2) {
	let color;
	index1 >= 0 && index1 <= 4 ? (color = 'blue') : (color = 'red');
	const lineText = document.querySelectorAll('.banpick__champ-text .banpick__text-line');
	const champImg = document.querySelectorAll('.banpick__body__champ-info .banpick__champ-img');

	swapElements(lineText[index1], lineText[index2]);

	line1 = whatLine(lineText[index1]);
	line2 = whatLine(lineText[index2]);
	if (!isChampSelected[index1]) {
		champImg[
			index1
		].style.backgroundImage = `url("https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-${line2}-${color}.png")`;
	}
	if (!isChampSelected[index2]) {
		champImg[
			index2
		].style.backgroundImage = `url("https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-${line1}-${color}.png")`;
	}
}

function handleClickSwapBtn(event) {
	let index;

	for (let i = 0; i < swapBtns.length; i++) {
		if (event.target === swapBtns[i]) {
			index = i;
		}
	}

	isClicked[index] = !isClicked[index]; // toggle

	if (index >= 0 && index <= 4) {
		// left side
		if (isClicked[index] === true) {
			for (let i = 0; i < 5; i++) {
				if (i !== index && isClicked[i] === true) {
					swapChampInfo(index, i);
					isClicked[index] = false;
					isClicked[i] = false;
					break;
				}
			}
		}
	} else if (index >= 5 && index <= 9) {
		// right side
		if (isClicked[index] === true) {
			for (let i = 5; i < 10; i++) {
				if (i !== index && isClicked[i] === true) {
					swapChampInfo(index, i);
					isClicked[index] = false;
					isClicked[i] = false;
					break;
				}
			}
		}
	}
}

function whatLine(elem) {
	if (elem.innerText === '상단 (탑)') return 'top';
	else if (elem.innerText === '정글') return 'jungle';
	else if (elem.innerText === '중단 (미드)') return 'middle';
	else if (elem.innerText === '하단 (봇)') return 'bottom';
	else if (elem.innerText === '서포터') return 'utility';
}

// EventListener
const champInfos = document.querySelectorAll('.banpick__body__champ-info');
const swapBtns = document.querySelectorAll('.banpick__body__champ-info .swap-button');
const isClicked = [false, false, false, false, false, false, false, false, false, false];
const isChampSelected = [false, false, false, false, false, false, false, false, false, false];

for (let button of swapBtns) {
	button.addEventListener('click', handleClickSwapBtn);
}
