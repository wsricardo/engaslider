/*MIT License

Copyright (c) 2019 Wandeson Ricardo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

var slideIndex, autoplay, slides, numberSlides, currentDot, dotsNav;
var currentThumb, thumbNav; // Thumbnails images.
var slNextBtn, slPreviousBtn;
var timespeed = 2000; //Slide speed.

// Init slider attributes
function initSlider(play) {
    // Init vars
    slideIndex = 0;
	currentDot = 0;
	currentThumb = 0;
    autoplay = play;
    slides = document.getElementsByClassName("slider-image");
	dotsNav = document.getElementsByClassName("slider-dots-nav");
    numberSlides = slides.length;
	
    autoplay = play;	
	slNextBtn = document.getElementsByClassName("slider-next-button");
	slPreviousBtn = document.getElementsByClassName("slider-previous-button");
    slides = document.getElementsByClassName("slider-image");

	thumbNav = document.getElementsByClassName("slider-main-thumbnail")[0]
				.getElementsByTagName("img");

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
	var offsetHeight;
	var numberThumbs = thumbNav.length;

    if  ( slideIndex > numberSlides - 1 ) { slideIndex = 0;}
    if ( slideIndex < 0 ) { slideIndex = slides.length - 1;}

	offsetHeight = slides[slideIndex].getElementsByTagName("img")[0].naturalHeight;

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
		dotsNav[j].style.padding = "6px";
	}

	for (j = 0; j < numberThumbs; j++) {
		thumbNav[j].style.border = "none";
		thumbNav[j].style.display = "block";
		thumbNav[j].style.margin = "0 auto";
	}

	//slNextBtn.style.top = '"'+offsetHeight+'px'+'"';
	//slPreviousBtn.style.top = '"'+offsetHeight+'px'+'"';

	console.log("slides[]. "+ offsetHeight );
    slides[slideIndex].style.display = "block";
	currentDot= slideIndex;
	currentThumb = slideIndex;
	
	dotsNav[currentDot].style.display = "block-inline";
	dotsNav[currentDot].style.backgroundColor = "#ddd";
	dotsNav[currentDot].style.padding = "7px";
	
	thumbNav[currentThumb].style.border = "3px solid #ddd";

}


// Scroll images auto if autoplay is 1, true.
function autoSlide(){
    showImage()
    setTimeout(autoSlide, timespeed);
   
}
// Scroll images (if click event)
function mvImage(i){
	slideIndex += i;
    showImage();
}

function dots(n) {
	slideIndex = n;
	currentDot = n;
	dotsNav[currentDot].style.backgroundColor = "#ddd";
	showImage();
}

/* Thumbnail nav.*/
function thumbs(index) {
	slideIndex = index;
	currentDot = index;
	currentThumb = index;
	showImage();
}

