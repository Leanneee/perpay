webpackJsonp([0,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(10), __webpack_require__(8), __webpack_require__(12)]; (function($, _, scrollPanels, Contact, velocity, velocityUI){
	
		//Hamburger Functionality
		$("#hamburger-button").on('click', function(){
			$(this).toggleClass('is-active');
			toggleHamburger();
		});
		function toggleHamburger(toggleTo){
			if( $("#hamburger-button").hasClass('is-active') && toggleTo != 'close' ){
				$("#hamburger-menu, .siteHeader").removeClass('is-closed').addClass('is-active');
			} else{
				$(" #hamburger-menu, .siteHeader").addClass('is-closed').removeClass('is-active');
			}
		}
	
		Contact.init();
	
	
	
	
		function checkIfNewPage(context){
			console.log(context.path, window.location, context.path != window.location.pathname);
			//return !$("body").hasClass('page-'+context.path.split('/')[1]);
			//return context.init || context.path != window.location.pathname;
			return true;
		}
	
		//Page functions
		var wojo = {
			index: function(context, next){
				prepareHeader(context, 'dark');
				$("body").addClass('page-home');
				$("main").html('');
				$("main").append("<div class='slides'/>");
				$.each(data.home.slides, function(index, val) {
					 var template = _.template(document.getElementById('home-slide').innerHTML);
					 $(".slides").append( template(val) );
				});
				show();
	
				$(".slides").scrollPanels();
	
	
			},
			contact: function(context, next){
				console.log(context);
				if( $("main").html() == '' ){
					wojo.index(context, next);
				}
				Contact.open();
			},
			work: function(context, next){
				prepareHeader(context, 'light');
				var template = _.template(document.getElementById('page-work').innerHTML);
				$("main").html( template() );
				var listItem = _.template(document.getElementById('caseStudies-item-template').innerHTML);
				$.each(data.caseStudies, function(index, val) {
					if(val.thumb){
					 $("#caseStudies").append( listItem(val) );
					}
				});
				show();
				var work = __webpack_require__(13);
				work();
	
	
			},
			about: function(context, next){
					prepareHeader(context, 'light');
					var template = _.template(document.getElementById('page-about').innerHTML);
					$("main").html( template() );
					show();
					var about = __webpack_require__(14);
					about();
			},
			caseStudy: function(context, next){
				prepareHeader(context, 'dark');
				//get the requested cast study
				var caseStudy = _.where(data.caseStudies, {slug: context.params[0]})[0],
					navData = {
						next: data.caseStudies[ data.caseStudies.indexOf(caseStudy) + 1 ] ? data.caseStudies[ data.caseStudies.indexOf(caseStudy)+1 ] : data.caseStudies[0], //next case study
						prev: data.caseStudies.indexOf(caseStudy) - 1 > -1  ? data.caseStudies[ data.caseStudies.indexOf(caseStudy)-1 ] : _.last(data.caseStudies) //prev case study
					},
					hero = _.template(document.getElementById('caseStudy-hero').innerHTML); //Hero template
				$("main").html( hero( caseStudy ) ); //add hero template to page
	
				//Loop through each section in the case study and render out the appropriate template
				$.each(caseStudy.sections, function(index, val) {
					 var section = _.template(document.getElementById('caseStudy-'+val.type).innerHTML);
					 $("main").append( section(val) );
				});
	
				//Add the "More" navigation to the next and prev case study to the bottom
				var nav = _.template(document.getElementById('caseStudy-more').innerHTML);
				$("main").append( nav(navData) );
	
				$(".caseStudy-section-copy").first().attr('data-out', '');
				show();
	
				//Get the caseStudy JS and run it
				var caseStudy = __webpack_require__(17);
				caseStudy();
			},
			careers: function(context, next){
					prepareHeader(context, 'light');
					var template = _.template(document.getElementById('page-careers').innerHTML);
					$("main").html( template() );
					console.log(106, data.jobs);
					var jobItem = _.template(document.getElementById('job-item-template').innerHTML);
					$.each(data.jobs, function(index, val) {
						console.log(val);
						$("#careers-jobs").append( jobItem(val) );
					});
	
	
					show();
					// var about = require('./modules/about');
					// about();
			},
	
			jobDetail: function(context, next){
				prepareHeader(context, 'light');
				//get the requested cast study
				var job = _.where(data.jobs, {slug: context.params[0]})[0],
					template = _.template(document.getElementById('job-detail-template').innerHTML);
				$("main").html( template( job ) ); //add hero template to page
	
			}
		}
	
	
		//Runs before each page
		function setup(context, next){
			if(context.hash != ""){ return false;}
			toggleHamburger('close');
			$("html").addClass('isReady');
	
			if($(".slides").length){
				$(".slides").scrollPanels('destroy');
			}
			if($("[data-out]").length && context.pathname != "/contact"){
				$("[data-out]")
				.velocity('transition.slideUpOut',
					{
						stagger: 100,
						display: null,
						complete: function(){
							$.Velocity.animate( $("main"), {opacity: 0}, {duration: '100ms'})
							.then(function(){
								if(checkIfNewPage(context)){ next(); }
							})
	
						}
					}
				);
				$("[data-out-down]").velocity('transition.slideDownOut', {stagger: '100ms'});
				$("[data-out-left]").velocity('transition.slideLeftOut', {stagger: '100ms'});
			} else{
				if(checkIfNewPage(context)){ next(); }
			}
		}
	
		function show(){
			if($("[data-out]").length){
				$("[data-out]").css('opacity', '0')
				.velocity('transition.slideDownBigIn',
					{
						stagger: '80ms',
						begin: function(){
							$("main").velocity({opacity: 1}, {duration: '100ms'});
						}
					}
				);
				$("[data-out-down]").velocity('transition.slideUpIn', {stagger: '100ms'});
				$("[data-out-left]").velocity('transition.slideRightIn', {stagger: '100ms'});
			} else{
				$("main").velocity('transition.fadeIn');
			}
		}
	
		function notFound(context, next){
			prepareHeader(context, 'dark');
			var template = _.template(document.getElementById('page-404').innerHTML);
			$("main").html( template() );
	
			$("#fourOhFour video")[0].play();
	
			next();
		}
	
		function prepareHeader(context, navStyle){
			$('body').attr('class', '').css('overflow', 'initial');
			$("body").addClass('page-'+context.path.split('/')[1]);
			if( navStyle === 'dark' ){
				$(".siteHeader").addClass('siteHeader-dark');
				$(".siteHeader .btn-ghost").addClass('btn-ghost-inverse');
			} else{
				$(".siteHeader").removeClass('siteHeader-dark');
				$(".siteHeader .btn-ghost").removeClass('btn-ghost-inverse');
			}
	
		}
	
	
	
		//Routes
		page('*', setup);
		page('/', wojo.index);
		page('/about',  wojo.about);
		page('/work',  wojo.work);
		page('/work/*', wojo.caseStudy);
		page('/contact',  wojo.contact);
		page('/careers', wojo.careers);
		page('/careers/*', wojo.jobDetail);
		page('*', notFound);
		page({click: true, decodeURLComponents: true});
	
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});


/***/ }
]);
//# sourceMappingURL=app.js.map