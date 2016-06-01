(function($){

	$.fn.crousel = function(option){
		console.log(this);
		var $selector = this;
		var $slider = $selector.find('.slider');
		var $slide = $slider.find('.slide');


		//setting options
		var timeToSlide = option.timeToSlide;

		var totalSlides = $slide.length;
		var slideWidth = $slide.width();
		console.log($slide);

		//return this;

		function start(){
			alert(1234);
		}

		var moved = -500;
		var counter = 1;

		function slideAnimation(element, moveBy, duration){
			var movePerLoop = moveBy / duration * 10; //amount of element to move in one loop
			//recursive funtion to move hole element by moverPerLoop
			setTimeout(function(){
				var sliderML = $slider.css('margin-left');
				sliderML = parseInt(sliderML) - movePerLoop;
				//condition to check when one element is animated completly
				if(sliderML < moved){
					moved += sliderML;
					counter++;
					//condition to animate FIRST element after LAST element
					if(counter==3){
						moved = -500;
						counter = 1;
						$slider.css('margin-left',0);
					}
					return; //return after one element is animated completly
				} 

				$slider.css('margin-left',sliderML);

				slideAnimation($selector, slideWidth - movePerLoop, timeToSlide - 10); //after on loop substract the amount of duration and amount of element animation

			},10);

		}

	var slideAnimationControl = setInterval(function(){
			slideAnimation($selector, slideWidth, timeToSlide)
		}, 3000);
		//slideIt($selector, slideWidth, timeToSlide);
	}

})(jQuery);


$("#myCraousel").crousel({
	timeToSlide:1000
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