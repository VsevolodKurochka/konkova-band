$(document).ready(function(){
	function log(logText){
		console.log(logText);
	}
	// Variables
	var body 							= $("body");
	var modalVisibility		= "vmodal_showing_in";
	var active 						= "active";
	var overlay 					= $("<div />", {
				class: "vmodal__overlay"
			});

	// setTimeout(function(){
	// 	body.addClass("loaded");
	// }, 3000);
	function scroll(scrollLink, speed){
		$('html, body').animate({
			scrollTop: scrollLink.offset().top
		}, speed);
		return false;
	}
	// Menu
		$("[data-menu]").click(function(){
			var menu_href = $(this).attr("data-menu");
			$(menu_href).toggleClass('vnav__menu_active');
			$(this).toggleClass(active);
		});
		$('.vnav__menu a[href*="#"]').click(function(e){
			$("[data-menu]").removeClass(active);
			$('.vnav_fixed .vnav__menu').removeClass('vnav__menu_active');
			//e.preventDefault();
			
			//scroll($( $(this).attr('href') ), 1500);
		});
		$(".js-vnav-toggle").click(function(){
			$(this).toggleClass(active);
			$(".js-vnav-links").toggleClass(active);
		});
	// Scroll to block
		$('.anchor').click(function(e){
			e.preventDefault();
			scroll($( $(this).attr('href') ), 1500);
		});
	// Modal
		var videoBlock = $('#vmodalVideo .vmodal__video');
		function videoBlockClear(){
			videoBlock.html('');
		}
		function videoBlockIsShowing(){
			if($("#vmodalVideo").hasClass(modalVisibility)){
				videoBlockClear();
			}
		}
		$('[data-func="vmodal"]').click(function(){
			var thisTarget = $(this).attr("data-target");
			videoBlockIsShowing();
			if ( $(thisTarget).length > 0 ) {
				$('.vmodal').removeClass(modalVisibility)
				$(thisTarget).addClass(modalVisibility);
				body
					.append(overlay.addClass(modalVisibility));
			}else{
				console.log("No element with " + thisTarget + " name");
			}
		});
		$('[data-close="vmodal"]').click(function(){
			$(this).closest(".vmodal_showing_in").removeClass(modalVisibility);
			overlay.removeClass(modalVisibility);
			//body.removeClass("vmodal-open");
		});
		overlay.click(function(e){
			if ( overlay.length > 0 ) {
				$(".vmodal_showing_in").removeClass(modalVisibility);
				overlay.removeClass(modalVisibility);
				videoBlockClear();
				//body.removeClass("vmodal-open");
			}
		});
		// Video
		$('[data-video]').click(function(){
			var thisVideo = $(this).attr('data-video');
			var thisSource = $(this).attr('data-source');
			var thisTitle = $(this).attr('data-title');
			var output;
			videoBlockClear();
			if(thisTitle){
				$("#vmodalVideo .vmodal__title").text(thisTitle);
			}
			if( thisSource == 'youtube'){
				output = $('<iframe />', {
					class: 'vmodal__iframe',
					src: thisVideo + '?autoplay=1'
				}).appendTo(videoBlock);
			}
		});
		$("#vmodalVideo .vmodal__close").click(function(){
			videoBlockClear();
		});
	// Collapse
		$(".vcollapse-inner.active").children(".vcollapse-body").slideDown();
		$('.vcollapse-wrap').on('click', '.vcollapse-header', function(){
			var collapseInner = $(this).parents('.vcollapse-wrap').find('.vcollapse-inner');
			$(this).parent().toggleClass(active);
			$(this).next().slideToggle('slow');
			collapseInner.not($(this).parent()).removeClass("active");
			collapseInner.children('.vcollapse-body').not($(this).next()).slideUp("slow");
		});
	// Tabs
		$('[data-func="tab"]').click(function(){			
			// Tab links toggle class
				$(this).closest(".vtabs-list").children("li").removeClass(active);
				$(this).parent().addClass(active);
			// Show tab content
				var tabTarget = $(this).attr('data-target');
				$(tabTarget).addClass(active);
				$(".vtabs-content > div").not($(tabTarget)).removeClass(active);
		});
	// Develope
});	