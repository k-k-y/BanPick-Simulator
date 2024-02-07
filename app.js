const champ_imgs = document.querySelectorAll('.banpick__champ-img img');
const champ_names = document.querySelectorAll('.banpick__champ-name span');
const champ_roles = document.querySelectorAll('.banpick__champ-role span');
const role_imgs = document.querySelectorAll('.banpick__body-middle__role-op img');

for (let img of champ_imgs) {
	img.src = 'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg';
}

for (let name of champ_names) {
	name.innerText = 'garen';
}

for (let role of champ_roles) {
	role.innerText = 'jungle';
}

for (let img of role_imgs) {
	img.src = 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/03/urban-20230310112234917676.jpg';
}
