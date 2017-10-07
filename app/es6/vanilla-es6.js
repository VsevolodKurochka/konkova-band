// General functions
	function log(logText){
		console.log(logText);
	}
	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	function addClass(element,cls){
		if( !hasClass(element, cls) ){
			let empty = '';
			if(element.classList.value != "")
				empty = ' ';
			element.className += empty + cls;
		}
	}

	function removeClass(element, cls){
		if(hasClass(element, cls)){
			element.classList.remove(cls);
		}
	}

	function toggleClass(element, cls){
		if( hasClass(element, cls) ){
			removeClass(element, cls)
		}else{
			addClass(element, cls);
		}
	}

	function exists(element){
		return typeof(element) != 'undefined' && element != null;
	}

	function newElement(tag, parameters, parent){
		let elem = document.createElement(tag);
		for(let param in parameters){
			elem.setAttribute(param, parameters[param]);
		}
		if(parent){
			parent.appendChild(elem);
		}
		return elem;
	}

	function extendDefaults(oldObject, newObject){
		var property;
		for(property in newObject){
			if(newObject.hasOwnProperty(property)){
				oldObject[property] = newObject[property];
			}
		}
		return oldObject;
	}

var Modal = function(){

	this.modal = null;

	let defaults = {
		id: null,
		closeButton: true,
		boxClass: 'vmodal__box_default',
		title: null
	}

	this.options = extendDefaults(defaults, arguments[0]);
	
	this.element = document.getElementById(this.options.id);
}
Modal.prototype.create = function(){
	ModalWrap.call(this);
}
function ModalWrap(){
	let fragment = document.createDocumentFragment();
	this.modal = newElement('div', {
		'id'			: this.options.id + '-modal',
		'class'		: 'vmodal'
	});

	let box = newElement('div', {
		'class'		: 'vmodal__box ' + this.options.boxClass
	}, this.modal);

	let title = newElement('p', {
		'class'		: 'vmodal__title'
	}, box);
	title.innerHTML = this.options.title

	if(this.options.closeButton == true){
		let closeButton = newElement('button', {
			'class'				: 'vmodal__close',
			'data-close'	: 'vmodal'
		}, box);
		closeButton.innerHTML = '&times;';
	}

	// if(exists(document.getElementById(this.options.id))){
		box.appendChild(this.element);
		fragment.appendChild(this.modal);
		document.body.appendChild(fragment);
	// }
}
/*
class Modal{
	constructor(modalObject){
		let defaults = {
			id: null,
			closeButton: true,
			boxClass: 'vmodal__box_default',
			title: null
		}

		this.options = extendDefaults(defaults, arguments[0]);
		
		this.element = document.getElementById(this.options.id);
	}
	
	wrap(){
		

		let fragment = document.createDocumentFragment();

		let modal = newElement('div', {
			'id'			: this.options.id + '-modal',
			'class'		: 'vmodal'
		});

		let box = newElement('div', {
			'class'		: 'vmodal__box ' + this.options.boxClass
		}, modal);

		let title = newElement('p', {
			'class'		: 'vmodal__title'
		}, box);
		title.innerHTML = this.options.title

		if(this.options.closeButton == true){
			let closeButton = newElement('button', {
				'class'				: 'vmodal__close',
				'data-close'	: 'vmodal'
			}, box);
			closeButton.innerHTML = '&times;';
		}

		if(exists(document.getElementById(this.options.id))){
			box.appendChild(this.element);
			fragment.appendChild(modal);
			document.body.appendChild(fragment);
		}
	}
	open(){
		addClass(document.body, 'vmodal-open');
		addClass(this.element.parentNode.parentNode, 'vmodal_showing_in');
	}
}
*/



(function(){
	document.addEventListener("DOMContentLoaded", function(){

		const d = document;
		const classes = {
			active: 'active',
			menuActive: 'vnav__menu_active'
		}

		// Button menu
			const jsNavBtn = d.getElementById('js-vnav__btn');
			if(exists(jsNavBtn)){
				jsNavBtn.addEventListener('click', function(){
					toggleClass(this, classes.active);
					toggleClass(jsNav, classes.menuActive);
				});
			}


		// Click on toggle element in navigation
			const jsNavText = d.getElementById('js-nav-text');
			if(exists(jsNavText)){
				jsNavText.addEventListener('click', function() {
					toggleClass(this, classes.active);
				});	
			}

		// Anchors links
			function scrollTo(element, to, duration) {
				if (duration <= 0) return;
				var difference = to - element.scrollTop - 75;
				var perTick = difference / duration * 10;
				setTimeout(function() {
					element.scrollTop = element.scrollTop + perTick;
					if (element.scrollTop === to) return;
					scrollTo(element, to, duration - 10);
				}, 10);
			}
			
			// Anchors
			const anchors = d.getElementsByClassName('anchor');

			for(let i = 0; i < anchors.length; i++){
				anchors[i].addEventListener('click', (e) => {
					e.preventDefault();
					let href = this.getAttribute("href").replace("#", "");
					let scrollAnchor = document.getElementById(href);
					scrollTo(document.body, scrollAnchor.offsetTop, 600);
				});
			}
			
			// Navigation links
			const jsNavLinks = d.querySelectorAll('.vnav__menu a[href*="#"]');
			const jsNav = d.getElementById('navigation');

			for(var i = 0; i < jsNavLinks.length; i++){
				jsNavLinks[i].addEventListener('click', (e) => {
					e.preventDefault();

					let vnavhref = this.getAttribute("href").replace("#", "");
					let vnavscrollAnchor = document.getElementById(vnavhref);

					removeClass(jsNavBtn, classes.active);
					removeClass(jsNav, classes.menuActive);

					scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);

				});
			}

		// Modal Window initialization
		
		const modalBtn = d.querySelectorAll('[data-action="vmodal"]');
		const modalBtnL = modalBtn.length;

		

		const modal = d.querySelectorAll('.vmodal');
		const modalL = modal.length;

		const modalBtnClose = d.querySelectorAll('[data-close="vmodal"]');
		const modalBtnCloseL = modalBtnClose.length;

		
		function modalClose(el){
			removeClass(el, 'vmodal_showing_in');
			removeClass(document.body, 'vmodal-open');
			// if(el.getElementsByClassName('vmodal__video')[0]){
			// 	el.getElementsByClassName('vmodal__video')[0].innerHTML = '';
			// }
		}
		function getEventTarget(e){
			var targ;
	
			if (e.target) { // W3C
				targ = e.target;
			}else if (e.srcElement) { // IE6-8
				targ = e.srcElement;
			}else if(e.originalTarget){
				targ = e.originalTarget;
			}
			if (targ.nodeType == 3) { // Safari
				targ = targ.parentNode;
			}
			return targ;
		}
		function bodyClick(e){
			let target = getEventTarget(e);
			for(let i = 0; i < modalL; i++){
				if (target == modal[i]) {
					modalClose(modal[i]);
				}
			}
		}
		for(var i = 0; i < modalBtnL; i++){
			modalBtn[i].addEventListener('click', function(){

				// Get button data-attributes
				var modalData = this.dataset;

				// Get attribute data-open and replace # with empty line
				var modalID = modalData.open.replace("#", "");
				
				
				if( exists(document.getElementById(modalID) ) ){

					let modalCurrent = document.getElementById(modalID);

					addClass(document.body, 'vmodal-open');
					addClass(modalCurrent, 'vmodal_showing_in');

					if(modalData.video != undefined){
						let videoSRC = modalData.video;
						let videoWrapper = modalCurrent.getElementsByClassName('vmodal__video')[0];

						videoWrapper.innerHTML = '';

						let videoIframe = d.createElement('iframe');

						addClass(videoIframe, 'vmodal__iframe');
						videoIframe.setAttribute('src', videoSRC);
						videoWrapper.appendChild(videoIframe);
					}

				}else{
					console.error('No element with ID: ' + modalID);
				}

			});
		}
		
		for(let i = 0; i < modalBtnCloseL; i++){
			modalBtnClose[i].addEventListener('click', function(){
				modalClose(this.closest('.vmodal'));
			});
		}
		
		document.body.addEventListener("click", function(e) {
			bodyClick(e);
		}, false);
		document.body.addEventListener("touchstart", function(e) {
			bodyClick(e);
		}, false);


		// Adding class on scroll
		var navigationWrap = document.getElementById('navigation-wrapper');
		var y = window.pageYOffset;

		var video = document.getElementById('video');
		var videoText = document.getElementById('video-text');

		function changeView() {
			y = window.pageYOffset;
			if (y > 0) {
				addClass(navigationWrap, 'vnav_scrolling');
			} else {
				removeClass(navigationWrap, 'vnav_scrolling');
			}
		}
		changeView();
		window.addEventListener('scroll', function () {
			changeView();

			var videoY = window.pageYOffset;
			video.style.transform = "translate3d(0," + (videoY * 0.5) + 'px, 0';
			videoText.style.transform = "translate3d(0," + -(videoY * 0.1) + 'px, 0';
		});
	});
}());