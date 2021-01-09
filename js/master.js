//random background option
let backGroundOption = true;
//variable to control the Interval
let backgroundInterval;
//check if there's local storage random background item's
let backgroundItem = localStorage.getItem('background_option');
if (backgroundItem !== null){
	document.querySelectorAll(".random-background span").forEach(element => {
		element.classList.remove("active");
	});
	
	if(backgroundItem === "true"){
		backGroundOption = true;
		document.querySelector(".random-background .yes").classList.add("active");
	} else{
		backGroundOption = false;
		document.querySelector(".random-background .no").classList.add("active");
		}
	
};
//check if there's local storage color option
let mainColors = localStorage.getItem("color_option");
if(mainColors !== null) {
	document.documentElement.style.setProperty('--main--color', mainColors);
// make array of list of colors
	const colorsList = document.querySelectorAll(".color-list li");
	colorsList.forEach(li => {
		if(li.dataset.color === mainColors){
			//remove active class
			li.parentElement.querySelectorAll(".active").forEach(element => {
				element.classList.remove("active");
			});
			//add active class
			li.classList.add("active");
		};
	});
};
//togle spin class on icon
document.querySelector(".container-for-icon .fa-cog").onclick = function () {
	this.classList.toggle("fa-spin");
	//togle open class on setting box
	document.querySelector(".setting-box").classList.toggle("open");
};
// Switch color
const colorsLi = document.querySelectorAll(".color-list li");
colorsLi.forEach(li=> {
	li.addEventListener("click", (e) => {
//set color on root
		document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
//set color in local storage
		localStorage.setItem("color_option", e.target.dataset.color);
		handleActiveState(e);
	})
});
//Switch Random background color
const randomBackEl = document.querySelectorAll(".random-background span");
//loop on all spans
randomBackEl.forEach(span=> {
//click on span
	span.addEventListener("click", (e) => {
 handleActiveState(e);
//check yes or no
		if(e.target.dataset.bg === 'yes'){
			backGroundOption = true;
			localStorage.setItem('background_option', true);
			randomizeImgs();
		}else {
			backGroundOption = false;
			clearInterval(backgroundInterval);
			localStorage.setItem('background_option', false);
		}
	})
});
//select landing page element
let landingPage= document.querySelector(".landing-page");
//get array of images
let imgsArray = ["01.jpg","02.jpg","03.png","04.jpg","05.jpg"];
//function to randomize imgs
function randomizeImgs(){
	if(backGroundOption === true){
	backgroundInterval = setInterval(()=>{
	//get random number for image
	let randomnumber  = Math.floor(Math.random() * imgsArray.length);
	//change background url
	landingPage.style.backgroundImage = 'url("images/'+imgsArray[randomnumber]+'")';
	}, 7000);	
	
	};
}
randomizeImgs();
//select span kills
let ourskills = document.querySelector(".skills");
window.onscroll = function() {
	//skills offset top
	let skillsOffsetTop = ourskills.offsetTop;
	//skills outer height
	let skillsOuterHeight = ourskills.offsetHeight;
	//window height
	let windowHeight = this.innerHeight; 
	//scroll Top
	let windowScrollTop = this.pageYOffset;
	if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight -windowHeight)) {
		let allSkillsBox = document.querySelectorAll('.skills .skill-box .skill-progress span');
		allSkillsBox.forEach(skill => {
			skill.style.width = skill.dataset.progress;
		});
	}
}
//create pop with image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img =>{
	img.addEventListener("click",(e)=>{
		let overlay = document.createElement("div");
		//add class to overlay
		overlay.className= 'popup-overlay';
		//append overlay to body
		document.body.appendChild(overlay);
		//create popup
		let popupbox = document.createElement("div");
		//add class to popub-box
		popupbox.className= 'popup-box';
		//create heading
		if(img.alt !== null){
			//Create heading 
			let imageHeadingo = document.createElement("h3");
			//crate image text
			let imgtxt = document.createTextNode(img.alt);
			//add text to heading
			imageHeadingo.appendChild(imgtxt);
			//append the heading to popup box
			popupbox.appendChild(imageHeadingo);
		}
		//create img in popup box
		let photo = document.createElement("img");
		//add src to phott
		photo.src = img.src;
		//add image to popupbox
		popupbox.appendChild(photo);
		//add popbox to body
		document.body.appendChild(popupbox);
		//create close span
		let closebutton = document.createElement("span");
		//create span Text
		let closebuttontext = document.createTextNode("x");
		//append text to close button
		closebutton.appendChild(closebuttontext);
		//add class to close buttom
		closebutton.className = 'close-button';
		//add colse button to popup box
		popupbox.appendChild(closebutton);
	});
});
//close popup
document.addEventListener("click", function(e){
  if(e.target.className == 'close-button'){
	  //remove popup
	  e.target.parentNode.remove();
	  //remove overlay 
	  document.querySelector('.popup-overlay').remove();
  }
  });
//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//select All links
const allLinks = document.querySelectorAll(".links a");
//function to scroll to links and bullets
function scrollToSection(elements){
	elements.forEach(element =>{
	element.addEventListener("click", (e) => {
		e.preventDefault();
		document.querySelector(e.target.dataset.section).scrollIntoView({
			behavior:'smooth'
		});
	});
});
}
scrollToSection(allBullets);
scrollToSection(allLinks);
//handle active state
function handleActiveState(ev){
//remove active class
ev.target.parentElement.querySelectorAll(".active").forEach(element => {
	element.classList.remove("active");
});
//add active class
ev.target.classList.add("active");
}
//select bullets option
let bulletSpan = document.querySelectorAll(".bullets-Option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");
if(bulletLocalItem !== null){
	bulletSpan.forEach(span=>{
		span.classList.remove("active");
		});
	if(bulletLocalItem === 'yes'){
		bulletsContainer.style.display = "block";
		document.querySelector(".bullets-Option .yes").classList.add("active");
	}else{
		bulletsContainer.style.display = "none";
		document.querySelector(".bullets-Option .no").classList.add("active");
	}
	}
bulletSpan.forEach(span=>{
	span.addEventListener("click",(e)=>{
		if(span.dataset.display === 'yes'){
			bulletsContainer.style.display = "block";
			localStorage.setItem("bullets-option" , "yes");
		}else{
			bulletsContainer.style.display = "none";
			localStorage.setItem("bullets-option" , "no");
		}
		handleActiveState(e);
	});
});
//Reset Button
document.querySelector(".reset-options").onclick = function (){
	localStorage.removeItem("bullets-option");
	localStorage.removeItem("background_option");
	localStorage.removeItem("color_option");
	window.location.reload();
};
//toggle menu
let togleMenu = document.querySelector(".header-area .links-container .toggle-menu");
let links = document.querySelector(".links");
togleMenu.onclick = function(e){
	//stop propagation
	e.stopPropagation();
	//togle class menu-open 
	this.classList.toggle("menu-open");
	//togle class open in links
	links.classList.toggle("open");
};
document.addEventListener("click",(e)=>{
	if(e.target !== togleMenu && e.target !== links){
		//check menu is open
		if(links.classList.contains("open")){
			togleMenu.classList.toggle("menu-open");
			links.classList.toggle("open");
		}
	}
});
//stop stop propagation on menu
links.onclick = function(e){
	e.stopPropagation();
};