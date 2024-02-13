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

function handleClickBtn(num, name) {
	if (btnArray[num].classList.contains(`role-op__${name}-selected`)) {
		btnArray[num].classList.remove(`role-op__${name}-selected`);
		isBtnChange = false;
	} else if (!btnArray[num].classList.contains(`role-op__${name}-selected`) && !isBtnChange) {
		btnArray[num].classList.add(`role-op__${name}-selected`);
		isBtnChange = true;
	}
}

for (let i = 0; i < 5; i++) {
	btnArray[i].addEventListener('mouseover', () => {
		handleMouseoverBtn(i, btnName[i]);
	});
	btnArray[i].addEventListener('mouseout', () => {
		handleMouseoutBtn(i, btnName[i]);
	});
	btnArray[i].addEventListener('click', () => {
		handleClickBtn(i, btnName[i]);
	});
}
