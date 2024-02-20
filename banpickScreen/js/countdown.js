// implement countdown function (Rough version)

const countText = document.querySelector('.banpick__header-middle__num-count span');
const leftBar = document.querySelector('.banpick__header-middle__left-bar');
const rightBar = document.querySelector('.banpick__header-middle__right-bar');
let intervalId;

function countDown(sec) {
	stopCountDown(sec);
	leftBar.classList.add(`bar-decrease-${sec}`);
	rightBar.classList.add(`bar-decrease-${sec}`);

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

function stopCountDown(sec) {
	leftBar.classList.remove(`bar-decrease-${sec}`);
	rightBar.classList.remove(`bar-decrease-${sec}`);

	void leftBar.offsetWidth; // trick for reset animation
	void rightBar.offsetWidth;

	clearInterval(intervalId);
}
