const champ_imgs = document.querySelectorAll('.banpick__champ-img img');
const champ_names = document.querySelectorAll('.banpick__champ-name span');
const champ_roles = document.querySelectorAll('.banpick__champ-role span');

for (let img of champ_imgs) {
	img.src = 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg';
}

for (let name of champ_names) {
	name.innerText = 'garen';
}

for (let role of champ_roles) {
	role.innerText = 'jungle';
}
