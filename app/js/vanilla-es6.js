'use strict';

// General functions
function log(logText) {
	console.log(logText);
}
function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function addClass(element, cls) {
	if (!hasClass(element, cls)) {
		var empty = '';
		if (element.classList.value != "") empty = ' ';
		element.className += empty + cls;
	}
}

function removeClass(element, cls) {
	if (hasClass(element, cls)) {
		element.classList.remove(cls);
	}
}

function toggleClass(element, cls) {
	if (hasClass(element, cls)) {
		removeClass(element, cls);
	} else {
		addClass(element, cls);
	}
}

function exists(element) {
	return typeof element != 'undefined' && element != null;
}

function newElement(tag, parameters, parent) {
	var elem = document.createElement(tag);
	for (var param in parameters) {
		elem.setAttribute(param, parameters[param]);
	}
	if (parent) {
		parent.appendChild(elem);
	}
	return elem;
}

function extendDefaults(oldObject, newObject) {
	var property;
	for (property in newObject) {
		if (newObject.hasOwnProperty(property)) {
			oldObject[property] = newObject[property];
		}
	}
	return oldObject;
}

var Modal = function Modal() {

	this.modal = null;

	var defaults = {
		id: null,
		closeButton: true,
		boxClass: 'vmodal__box_default',
		title: null
	};

	this.options = extendDefaults(defaults, arguments[0]);

	this.element = document.getElementById(this.options.id);
	log(this.element);
};
Modal.prototype.create = function () {
	ModalWrap.call(this);
};
function ModalWrap() {
	var fragment = document.createDocumentFragment();
	this.modal = newElement('div', {
		'id': this.options.id + '-modal',
		'class': 'vmodal'
	});

	var box = newElement('div', {
		'class': 'vmodal__box ' + this.options.boxClass
	}, this.modal);

	var title = newElement('p', {
		'class': 'vmodal__title'
	}, box);
	title.innerHTML = this.options.title;

	if (this.options.closeButton == true) {
		var closeButton = newElement('button', {
			'class': 'vmodal__close',
			'data-close': 'vmodal'
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

(function () {
	document.addEventListener("DOMContentLoaded", function () {
		var _this = this;

		var d = document;
		var classes = {
			active: 'active',
			menuActive: 'vnav__menu_active'

			// Button menu
		};var jsNavBtn = d.getElementById('js-vnav__btn');
		if (exists(jsNavBtn)) {
			jsNavBtn.addEventListener('click', function () {
				toggleClass(this, classes.active);
				toggleClass(jsNav, classes.menuActive);
			});
		}

		// Click on toggle element in navigation
		var jsNavText = d.getElementById('js-nav-text');
		if (exists(jsNavText)) {
			jsNavText.addEventListener('click', function () {
				toggleClass(this, classes.active);
			});
		}

		// Anchors links
		function scrollTo(element, to, duration) {
			if (duration <= 0) return;
			var difference = to - element.scrollTop - 75;
			var perTick = difference / duration * 10;
			setTimeout(function () {
				element.scrollTop = element.scrollTop + perTick;
				if (element.scrollTop === to) return;
				scrollTo(element, to, duration - 10);
			}, 10);
		}

		// Anchors
		var anchors = d.getElementsByClassName('anchor');

		for (var _i = 0; _i < anchors.length; _i++) {
			anchors[_i].addEventListener('click', function (e) {
				e.preventDefault();
				var href = _this.getAttribute("href").replace("#", "");
				var scrollAnchor = document.getElementById(href);
				scrollTo(document.body, scrollAnchor.offsetTop, 600);
			});
		}

		// Navigation links
		var jsNavLinks = d.querySelectorAll('.vnav__menu a[href*="#"]');
		var jsNav = d.getElementById('navigation');

		for (var i = 0; i < jsNavLinks.length; i++) {
			jsNavLinks[i].addEventListener('click', function (e) {
				e.preventDefault();

				var vnavhref = _this.getAttribute("href").replace("#", "");
				var vnavscrollAnchor = document.getElementById(vnavhref);

				removeClass(jsNavBtn, classes.active);
				removeClass(jsNav, classes.menuActive);

				scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);
			});
		}

		// Modal Window initialization
		var modalContent = d.getElementsByClassName('vmodal__content');
		var modalContentL = modalContent.length;

		var modalBtn = d.querySelectorAll('[data-action="vmodal"]');
		var modalBtnL = modalBtn.length;

		for (var _i2 = 0; _i2 < modalContentL; _i2++) {
			var currentModal = modalContent[_i2];
			currentModal = new Modal({
				id: currentModal.getAttribute('id'),
				title: currentModal.dataset.title
			}).create();
		}
		// new Modal({
		// 	id: 'form',
		// 	title: 'form'
		// }).create();
		// new Modal({
		// 	id: 'crew',
		// 	title: 'Test'
		// }).create();

		var modal = d.querySelectorAll('.vmodal');
		var modalL = modal.length;

		var modalBtnClose = d.querySelectorAll('[data-close="vmodal"]');
		var modalBtnCloseL = modalBtnClose.length;

		function modalClose(el) {
			removeClass(el, 'vmodal_showing_in');
			removeClass(document.body, 'vmodal-open');
			// if(el.getElementsByClassName('vmodal__video')[0]){
			// 	el.getElementsByClassName('vmodal__video')[0].innerHTML = '';
			// }
		}
		function getEventTarget(e) {
			var targ;

			if (e.target) {
				// W3C
				targ = e.target;
			} else if (e.srcElement) {
				// IE6-8
				targ = e.srcElement;
			} else if (e.originalTarget) {
				targ = e.originalTarget;
			}
			if (targ.nodeType == 3) {
				// Safari
				targ = targ.parentNode;
			}
			return targ;
		}
		function bodyClick(e) {
			var target = getEventTarget(e);
			for (var _i3 = 0; _i3 < modalL; _i3++) {
				if (target == modal[_i3]) {
					modalClose(modal[_i3]);
				}
			}
		}
		for (var i = 0; i < modalBtnL; i++) {
			modalBtn[i].addEventListener('click', function () {

				// Get button data-attributes
				var modalData = this.dataset;

				// Get attribute data-open and replace # with empty line
				var modalID = modalData.open.replace("#", "");

				if (exists(document.getElementById(modalID))) {

					var modalCurrent = document.getElementById(modalID);

					addClass(document.body, 'vmodal-open');
					addClass(modalCurrent, 'vmodal_showing_in');

					if (modalData.video != undefined) {
						var videoSRC = modalData.video;
						var videoWrapper = modalCurrent.getElementsByClassName('vmodal__video')[0];

						videoWrapper.innerHTML = '';

						var videoIframe = d.createElement('iframe');

						addClass(videoIframe, 'vmodal__iframe');
						videoIframe.setAttribute('src', videoSRC);
						videoWrapper.appendChild(videoIframe);
					}
				} else {
					console.error('No element with ID: ' + modalID);
				}
			});
		}

		for (var _i4 = 0; _i4 < modalBtnCloseL; _i4++) {
			modalBtnClose[_i4].addEventListener('click', function () {
				modalClose(this.closest('.vmodal'));
			});
		}

		document.body.addEventListener("click", function (e) {
			bodyClick(e);
		}, false);
		document.body.addEventListener("touchstart", function (e) {
			bodyClick(e);
		}, false);
	});
})();