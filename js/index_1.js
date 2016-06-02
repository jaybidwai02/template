(function($){

	$.fn.crousel = function(option){
		//console.log(this);
		var $selector = this;
		var $slider = $selector.find('.slider');
		var $slide = $slider.find('.slide');


		//setting options
		var timeToSlide 		= option.timeToSlide;
		var movingSpeed 		= option.movingSpeed;
		var slideInterval 	= option.slideInterval;
		var runOnLoad 			= option.runOnLoad;
		var $triggerElement	= $('#'+option.triggerElement);
		var numberOfSlidesInView = option.numberOfSlidesInView;

		var totalSlides = $slide.length;
		var slideWidth = $slide.width();
		var numberOfSlides = $slide.length;
		//console.log($slide.length);

		//return this;

		//animation variables to start and stop animation by clearInterval
		var slideAnimationControl,isSlideAnimationStarted = false;
		//start slide animation
		function startSlideAnimaiton(){
			isSlideAnimationStarted = true;
			slideAnimationControl = setInterval(function(){
				slideAnimation($selector, slideWidth, timeToSlide)
			}, slideInterval);
		};
		//stop animation
		function stopAnimation(animationControl){
			clearInterval(animationControl);
		};		

		var moved = -slideWidth;
		var counter = 1;

		function slideAnimation(element, moveBy, duration){
			var movePerLoop = moveBy / duration * movingSpeed; //amount of element to move in one loop
			//recursive funtion to move hole element by moverPerLoop
			setTimeout(function(){
				var sliderML = $slider.css('margin-left');
				sliderML = parseInt(sliderML) - movePerLoop;

				sliderML = sliderML < -slideWidth*counter ? -slideWidth*counter : sliderML; // if slide amount is > slide width reset to slide width
				//console.log(sliderML);
				$slider.css('margin-left',sliderML);

				console.log(12);
				//	var totalSlidesWidth = slideWidth*numberOfSlides;
				//var penddingSlides = numberOfSlides - counter;
				//console.log(counter*slideWidth+(numberOfSlidesInView-1)*slideWidth);
				
				//condition to check when one element is animated completly
				
				//console.log(sliderML +"="+ moved);
				if(sliderML <= moved){
					moved = sliderML - slideWidth;
					counter++;
					//condition to animate FIRST element after LAST element
					/*if(counter == (numberOfSlides - numberOfSlidesInView+1)){
						moved = -slideWidth;
						counter = 1;
						$slider.css('margin-left',0);
					}*/

					//stop animation as it receches last element
					if(counter == (numberOfSlides - numberOfSlidesInView+1)) clearInterval(slideAnimationControl);
					return; //return after one element is animated completly
				} 


				slideAnimation($selector, slideWidth - movePerLoop, timeToSlide - 10); //after on loop substract the amount of duration and amount of element animation

			},movingSpeed);

		};
		//pause slide animation on mouse hover and start on mouseleave
		$selector.on('mouseenter',function(){
			stopAnimation(slideAnimationControl);
		}).on('mouseleave',function(){
			if(isSlideAnimationStarted) startSlideAnimaiton();
		});

		//console.log(runOnLoad);
		if(runOnLoad){
			startSlideAnimaiton(); //start slide animation automatically
		} 
		else{
			$triggerElement.on('click',startSlideAnimaiton);
		} 
	}

})(jQuery);


$("#myCraousel").crousel({
	timeToSlide:1000,
	movingSpeed:50,
	slideInterval:3000,
	runOnLoad:true,
	triggerElement:'startIt',
	numberOfSlidesInView:3

});

/*function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}*/