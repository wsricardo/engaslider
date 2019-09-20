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

var slideIndex, autoplay, slides, numberSlides;
var slNextBtn, slPreviousBtn;

// Init slider attributes
function initSlider(play) {
    // Init vars
    slideIndex = 0;
    autoplay = play;	
	slNextBtn = document.getElementsByClassName("slider-next-button");
	slPreviousBtn = document.getElementsByClassName("slider-previous-button");
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
	var offsetHeight;

    if  ( slideIndex > numberSlides - 1 ) { slideIndex = 0;}
    if ( slideIndex < 0 ) { slideIndex = slides.length - 1;}

	offsetHeight = slides[slideIndex].getElementsByTagName("img")[0].naturalHeight;

    //*Debug*
    console.log(slides);
    console.log(numberSlides);
    console.log("slideIndex "+slideIndex);
    //*-----*

    for (j = 0; j <= numberSlides - 1; j++) {
        slides[j].style.display = "none";
    }

	//slNextBtn.style.top = '"'+offsetHeight+'px'+'"';
	//slPreviousBtn.style.top = '"'+offsetHeight+'px'+'"';

	console.log("slides[]. "+ offsetHeight );
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
