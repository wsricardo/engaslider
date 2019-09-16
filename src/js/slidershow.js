var slideIndex, autoplay, slides, numberSlides;

// Init slider attributes
function initSlider(play) {
    // Init vars
    slideIndex = 0;
    autoplay = play;
    slides = document.getElementsByClassName("slider-image");
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
    //*-----*

    for (j = 0; j <= numberSlides - 1; j++) {
        slides[j].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    slideIndex++;

}

// Scroll images auto if autoplay is 1, true.
function autoSlide(){
    showImage()
    setTimeout(autoSlide, 2000);
   
}
// Scroll images (if click event)
function mvImage(){
    showImage();
    //autoplay=0;
}
