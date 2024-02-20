// implement countdown function (Rough version)

const countText = document.querySelector('.banpick__header-middle__num-count span');
const leftBar = document.querySelector('.banpick__header-middle__left-bar');
const rightBar = document.querySelector('.banpick__header-middle__right-bar');
let intervalId;

function countDown(sec) {
	stopCountDown();
	leftBar.classList.add('bar-decrease-30');
	rightBar.classList.add('bar-decrease-30');

	let count = sec;

	intervalId = setInterval(() => {
		if (count === -1) {
			clearInterval(intervalId);
		} else {
			countText.innerText = count;
			count--;
		}
	}, 1000);
}

function stopCountDown() {
	leftBar.classList.remove('bar-decrease-30');
	rightBar.classList.remove('bar-decrease-30');

	void leftBar.offsetWidth; // trick for reset animation
	void rightBar.offsetWidth;

	clearInterval(intervalId);
}
