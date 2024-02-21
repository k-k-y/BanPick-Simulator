const countText = document.querySelector('.banpick__header-middle__num-count span');
const leftCountBar = document.querySelector('.banpick__header-middle__left-bar');
const rightCountBar = document.querySelector('.banpick__header-middle__right-bar');
let intervalId;

function countDown(sec) {
	stopCountDown(sec);
	leftCountBar.classList.add(`bar-decrease-${sec}`);
	rightCountBar.classList.add(`bar-decrease-${sec}`);

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
	leftCountBar.classList.remove(`bar-decrease-${sec}`);
	rightCountBar.classList.remove(`bar-decrease-${sec}`);

	void leftCountBar.offsetWidth; // trick for reset animation
	void rightCountBar.offsetWidth;

	clearInterval(intervalId);
}
