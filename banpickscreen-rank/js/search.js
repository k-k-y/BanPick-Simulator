// implement searching funcition

function searchByInput(event) {
	deleteAllChampImage();
	const inputValue = event.target.value;
	let arr = [];
	let count = 0;

	switch (sortingBy) {
		case 0:
			arr = allChampNames;
			break;
		case 1:
			arr = topChampNames;
			break;
		case 2:
			arr = jungleChampNames;
			break;
		case 3:
			arr = midChampNames;
			break;
		case 4:
			arr = adcChampNames;
			break;
		case 5:
			arr = supportChampNames;
			break;
		default:
			break;
	}

	// if input is blank, set default state
	if (inputValue === '') {
		console.log(1);
		setChampImageByArray(arr);
		return;
	}
	// case of English
	else if (inputValue[0].toUpperCase() >= 'A' && inputValue[0].toUpperCase() <= 'Z') {
		console.log(2);
		for (let champ of arr) {
			let isSearched = true;
			if (inputValue.length <= champ.eng.length) {
				for (let i = 0; i < inputValue.length; i++) {
					if (inputValue[i].toUpperCase() !== champ.eng[i].toUpperCase()) {
						isSearched = false;
					}
				}
			} else {
				isSearched = false;
			}

			if (isSearched === true) {
				const imgURL = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ.eng}.png`;
				addChampImage(imgURL, champ, count);
				count++;
			}
		}
	}
	// case of Korean
	else if (inputValue.isComposing) {
		console.log(3);
		setChampImageByArray(arr);
		return;
	} else {
		console.log(4);
		const separatedInput = separateKoreanCharacters(inputValue);
		for (let champ of arr) {
			let isSearched = true;
			const separatedTarget = separateKoreanCharacters(champ.kor);
			if (separatedInput.length <= separatedTarget.length) {
				for (let i = 0; i < separatedInput.length; i++) {
					if (separatedInput[i] !== separatedTarget[i]) {
						isSearched = false;
					}
				}
			} else {
				isSearched = false;
			}

			if (isSearched === true) {
				const imgURL = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ.eng}.png`;
				addChampImage(imgURL, champ, count);
				count++;
			}
		}
	}
}

// eventListener

searcher.addEventListener('input', searchByInput);

// separating Korean Language to first, middle, last word.
// ex) "안녕" -> 'ㅇ', 'ㅏ', 'ㄴ', 'ㄴ', 'ㅕ', 'ㅇ'
function separateKoreanCharacters(koreanString) {
	const choSung = [
		'ㄱ',
		'ㄲ',
		'ㄴ',
		'ㄷ',
		'ㄸ',
		'ㄹ',
		'ㅁ',
		'ㅂ',
		'ㅃ',
		'ㅅ',
		'ㅆ',
		'ㅇ',
		'ㅈ',
		'ㅉ',
		'ㅊ',
		'ㅋ',
		'ㅌ',
		'ㅍ',
		'ㅎ',
	];
	const jungSung = [
		'ㅏ',
		'ㅐ',
		'ㅑ',
		'ㅒ',
		'ㅓ',
		'ㅔ',
		'ㅕ',
		'ㅖ',
		'ㅗ',
		'ㅘ',
		'ㅙ',
		'ㅚ',
		'ㅛ',
		'ㅜ',
		'ㅝ',
		'ㅞ',
		'ㅟ',
		'ㅠ',
		'ㅡ',
		'ㅢ',
		'ㅣ',
	];
	const jongSung = [
		'',
		'ㄱ',
		'ㄲ',
		'ㄳ',
		'ㄴ',
		'ㄵ',
		'ㄶ',
		'ㄷ',
		'ㄹ',
		'ㄺ',
		'ㄻ',
		'ㄼ',
		'ㄽ',
		'ㄾ',
		'ㄿ',
		'ㅀ',
		'ㅁ',
		'ㅂ',
		'ㅄ',
		'ㅅ',
		'ㅆ',
		'ㅇ',
		'ㅈ',
		'ㅊ',
		'ㅋ',
		'ㅌ',
		'ㅍ',
		'ㅎ',
	];

	const tempResult = [];

	for (let char of koreanString) {
		const unicode = char.charCodeAt(0) - 0xac00;

		if (unicode < 0 || unicode > 11171) {
			// 한글이 아닌 경우 처리
			tempResult.push(char);
			continue;
		}

		const jong = unicode % 28;
		const jung = ((unicode - jong) / 28) % 21;
		const cho = parseInt((unicode - jong) / 28 / 21);

		if (cho !== '') tempResult.push(choSung[cho]);
		if (jung !== '') tempResult.push(jungSung[jung]);
		if (jong !== '') tempResult.push(jongSung[jong]);
	}

	const result = tempResult.filter((elem) => {
		return elem !== '';
	});

	return result;
}
