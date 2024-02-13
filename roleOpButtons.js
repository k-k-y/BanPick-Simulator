const topBtn = document.querySelector('.role-op__top-disabled');
const jungleBtn = document.querySelector('.role-op__jungle-disabled');
const midBtn = document.querySelector('.role-op__mid-disabled');
const adcBtn = document.querySelector('.role-op__adc-disabled');
const supportBtn = document.querySelector('.role-op__support-disabled');

const btnArray = [topBtn, jungleBtn, midBtn, adcBtn, supportBtn];
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

topBtn.addEventListener('mouseover', () => {
	handleMouseoverBtn(0, 'top');
});
jungleBtn.addEventListener('mouseover', () => {
	handleMouseoverBtn(1, 'jungle');
});
midBtn.addEventListener('mouseover', () => {
	handleMouseoverBtn(2, 'mid');
});
adcBtn.addEventListener('mouseover', () => {
	handleMouseoverBtn(3, 'adc');
});
supportBtn.addEventListener('mouseover', () => {
	handleMouseoverBtn(4, 'support');
});

topBtn.addEventListener('mouseout', () => {
	handleMouseoutBtn(0, 'top');
});
jungleBtn.addEventListener('mouseout', () => {
	handleMouseoutBtn(1, 'jungle');
});
midBtn.addEventListener('mouseout', () => {
	handleMouseoutBtn(2, 'mid');
});
adcBtn.addEventListener('mouseout', () => {
	handleMouseoutBtn(3, 'adc');
});
supportBtn.addEventListener('mouseout', () => {
	handleMouseoutBtn(4, 'support');
});

topBtn.addEventListener('click', () => {
	handleClickBtn(0, 'top');
});
jungleBtn.addEventListener('click', () => {
	handleClickBtn(1, 'jungle');
});
midBtn.addEventListener('click', () => {
	handleClickBtn(2, 'mid');
});
adcBtn.addEventListener('click', () => {
	handleClickBtn(3, 'adc');
});
supportBtn.addEventListener('click', () => {
	handleClickBtn(4, 'support');
});
