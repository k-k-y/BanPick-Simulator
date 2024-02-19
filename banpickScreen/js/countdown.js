// implement countdown function (Rough version)

let isCounting = false;

function countDown(sec) {
	const countText = document.querySelector('.banpick__header-middle__num-count span');
	const leftBar = document.querySelector('.banpick__header-middle__left-bar');
	const rightBar = document.querySelector('.banpick__header-middle__right-bar');

	leftBar.classList.add('bar-decrease-30');
	rightBar.classList.add('bar-decrease-30');

	let count = sec;
	if (!isCounting) {
		isCounting = true;
		const id = setInterval(() => {
			if (count === -1) {
				clearInterval(id);
				isCounting = false;
			} else {
				countText.innerText = count;
				count--;
			}
		}, 1000);
	}
}
