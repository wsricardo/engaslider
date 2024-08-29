/*
 * IGSlider - Image Gallery Slider
 *
 * LICENSE
 *
 *
 *
 *
 * Author: Wandeson Ricardo (WSRicardo)
 * Blog: wsricardo.blogspot.com
 * Github: www.githuhb.com/wsricardo
 *
 */

// Implement base object slider.
const slider = {
	bgcolor: "white",
	textcolor: "black",
	index: 0,
	gsize: 10

}

// Setup config slider.
// Define colos, sizes and some configurables features.
function setup( bg, color, gsize  ) {

	slider.bgcolor = bg;
	slider.textcolor = color;
	slider.gsize = gsize;
	
}
