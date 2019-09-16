// Init vars
var slideIndex = 0;
showImage(slideIndex);

// Add image to container.
function showImage(i) {
    slideIndex = i;
    var slides = document.getElementsByClassName("slider-image");
    
    var j = 0;

    if  ( slideIndex > slides.length - 1 ) { slideIndex = 0;}
    if ( slideIndex < 0 ) { slideIndex = slides.length - 1;}
    
    //*Debug*
    console.log(slides);
    console.log(slides.length);
    console.log("slideIndex "+slideIndex);
    //*-----*

    for (j=0; j <= slides.length-1; j++) {
        slides[j].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    
}

// Scroll images
function mvImage(i){
    showImage(slideIndex += i);
}