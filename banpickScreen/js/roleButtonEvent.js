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

// eventListener

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
