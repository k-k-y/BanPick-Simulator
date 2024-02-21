let turnCounter = -1; // turn counter
let clickedElement = null; // selected element. if turn is changed, clickedElement become null.
let bannedChampArray = []; // push champion if champion is selected.
let isElementDisabled = true; // if element disabled, cannot listen events.

const readyBtn = document.querySelector('#ready-btn'); // main select button

// about search.js
const searcher = document.querySelector('.banpick__body-middle__search-op input'); // search input element
// ---------------------------------------------------------------------------------

// about banpickSimulation.js
const pickOrder = [0, 5, 6, 1, 2, 7, 8, 3, 4, 9]; // pick stage's order
const toBanChampArray = document.querySelectorAll('.banpick__header .banpick__champ-img img'); // 10 ban boxs
// 10 side champ-info elements. Showed when champ-info activated
const infoVideo = document.querySelectorAll('.banpick__body .banpick__body__champ-info video'); // side video
const infoRingImg = document.querySelectorAll("[class*='banpick__ring-img-rotate']"); // side rotate ring
const infoSideBox = document.querySelectorAll("[class*='champ-info__box']"); // side colored box
const infoTexts = document.querySelectorAll('.banpick__champ-text'); // champ-info's 3 spans
const champImg = document.querySelectorAll('.banpick__body__champ-info .banpick__champ-img'); // champ-info's image place
// ---------------------------------------------------------------------------------

// about roleButtonEvent.js
let sortingBy = 0; // 0: default, 1: top ... 5: support. using for position buttons.
const topBtn = document.querySelector('.role-op__top-disabled');
const jungleBtn = document.querySelector('.role-op__jungle-disabled');
const midBtn = document.querySelector('.role-op__mid-disabled');
const adcBtn = document.querySelector('.role-op__adc-disabled');
const supportBtn = document.querySelector('.role-op__support-disabled');
const btnArray = [topBtn, jungleBtn, midBtn, adcBtn, supportBtn];
const btnName = ['top', 'jungle', 'mid', 'adc', 'support'];
// ---------------------------------------------------------------------------------

// about countdown.js
let intervalId; // identifier of setInterval() function in countDown() function.
const countText = document.querySelector('.banpick__header-middle__num-count span'); // counter number span
const leftCountBar = document.querySelector('.banpick__header-middle__left-bar'); // left count bar
const rightCountBar = document.querySelector('.banpick__header-middle__right-bar'); // right count bar
// ---------------------------------------------------------------------------------

// about chatting
const inputBox = document.querySelector('#banpick-input'); // chatting input box
let composing = false; // Korean lauguage have composing, it means completion of one letter.
