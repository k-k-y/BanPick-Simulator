// implement countdown function (Rough version)

let isCounting = false;

function countDown(sec) {
	const countText = document.querySelector('.banpick__header-middle__num-count span');
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

const readyBtn = document.querySelector('#ready-btn');
readyBtn.addEventListener('click', () => {
	countDown(10);
});
