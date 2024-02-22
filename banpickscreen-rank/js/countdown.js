// implement countDown start, stop

function countDown(sec) {
	console.log('count down!');
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
	console.log('stop!');
	leftCountBar.classList.remove(`bar-decrease-${sec}`);
	rightCountBar.classList.remove(`bar-decrease-${sec}`);

	void leftCountBar.offsetWidth; // trick for reset animation
	void rightCountBar.offsetWidth;

	clearInterval(intervalId);
}
