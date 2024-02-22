// implement countDown start, stop

function countDown(sec) {
	resetCountDown(sec);
	leftCountBar.classList.add(`bar-decrease-${sec}`);
	rightCountBar.classList.add(`bar-decrease-${sec}`);

	let count = sec;
	countText.innerText = count;

	intervalId = setInterval(() => {
		if (count > 0) {
			countText.innerText = count - 1;
			count--;
		} else if (count <= 0 && count > -3) {
			countText.innerText = 0;
			count--;
		} else if (count <= -3) {
			timeOut();
		}
	}, 1000);
}

function resetCountDown(sec) {
	clearInterval(intervalId);
	leftCountBar.classList.remove(`bar-decrease-${sec}`);
	rightCountBar.classList.remove(`bar-decrease-${sec}`);
	void leftCountBar.offsetWidth; // trick for reset animation
	void rightCountBar.offsetWidth;
}

// if clickedElement === 'timeout', turnCounter++ & animation changed.
function timeOut() {
	clickedElement = 'timeout';
	readyBtn.click();
}
