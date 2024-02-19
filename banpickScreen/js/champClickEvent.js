// implement champion hover, clicked function

let clickedElement = null;

function deleteDisabled() {
	if (clickedElement !== null) {
		clickedElement.classList.remove('champ-block-pointer');
		clickedElement.firstChild.classList.remove('champ-block-pointer', 'champ-selected__border');
		clickedElement.firstChild.firstChild.classList.remove('champ-block-pointer', 'champ-selected');
	}
}

function selectChamp(cur) {
	if (cur.tagName === 'BUTTON') {
		cur.classList.add('champ-block-pointer');
		cur.firstChild.classList.add('champ-selected__border', 'champ-block-pointer');
		cur.firstChild.firstChild.classList.add('champ-selected', 'champ-block-pointer');
		clickedElement = cur;
	} else if (cur.tagName === 'DIV') {
		cur.parentElement.classList.add('champ-block-pointer');
		cur.classList.add('champ-selected__border', 'champ-block-pointer');
		cur.firstChild.classList.add('champ-selected', 'champ-block-pointer');
		clickedElement = cur.parentElement;
	} else if (cur.tagName === 'IMG') {
		cur.parentElement.parentElement.classList.add('champ-block-pointer');
		cur.parentElement.classList.add('champ-selected__border', 'champ-block-pointer');
		cur.classList.add('champ-selected', 'champ-block-pointer');
		clickedElement = cur.parentElement.parentElement;
	}
}

function handleClickChamp(event) {
	event.stopPropagation();

	const cur = event.target;

	if (cur.matches('.banpick__body-middle__champ, .banpick__body-middle__champ div, .banpick__body-middle__champ img')) {
		deleteDisabled();
		selectChamp(cur);
	}
}

// eventListener

championsDiv.addEventListener('click', handleClickChamp);
