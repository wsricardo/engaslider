var slideIndex, autoplay, slides, numberSlides, currentDot, dotsNav;

// Init slider attributes
function initSlider(play) {
    // Init vars
    slideIndex = 0;
	currentDot = 0;
    autoplay = play;
    slides = document.getElementsByClassName("slider-image");
	dotsNav = document.getElementsByClassName("slider-dots-nav");
    numberSlides = slides.length;
	
    if ( autoplay ) {
        autoSlide();
    } else {
        showImage();
    }
    
}

// Set autoplay True.
function setAutoPlay(){
    autoplay = 1;
}

// Add image to container.
function showImage() {
    var j = 0;
	var k = 0;

    if  ( slideIndex > numberSlides - 1 ) { slideIndex = 0;}
    if ( slideIndex < 0 ) { slideIndex = slides.length - 1;}

    //*Debug*
    console.log(slides);
    console.log(numberSlides);
    console.log("slideIndex "+slideIndex);
	console.log("currentDot: "+currentDot);
    //*-----*


    for (j = 0; j <= numberSlides - 1; j++) {
        slides[j].style.display = "none";
    }
	
	for (j = 0; j <= numberSlides - 1; j++) {
		dotsNav[j].style.backgroundColor = "#bbb";
		dotsNav[j].style.display = "block-inline";
	}

    slides[slideIndex].style.display = "block";
	currentDot= slideIndex;	
	dotsNav[currentDot].style.display = "block-inline";
	dotsNav[currentDot].style.backgroundColor = "#ddd";

}


// Scroll images auto if autoplay is 1, true.
function autoSlide(){
    showImage()
    setTimeout(autoSlide, 2000);
   
}
// Scroll images (if click event)
function mvImage(){
	slideIndex++;
	
    showImage();
    //autoplay=0;
}

function dots(n) {
	slideIndex = n;
	currentDot = n;
	dotsNav[currentDot].style.backgroundColor = "#ddd";
	//dotsNav[currentDot].className = ""
	showImage();
}
