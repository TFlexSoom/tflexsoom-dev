function newRect(drawer, width, height, posx, posy) {
	return drawer.rect(width, height).attr({
  	fill: 'white',
    x: posx,
    y: posy,
  });
}

var draw = SVG().addTo('#drawing');
var circle = draw.ellipse(110, 90);
var rects = [
	newRect(draw, 70, 16, 40, 20),
  newRect(draw, 38, 21, 89, 34),
  newRect(draw, 70, 17, 40, 52),
  newRect(draw, 20, 20, 82, 68),
];
