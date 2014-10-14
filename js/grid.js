/**
* A Grid Generator for placement
*
*
*
*/

// int nbElem = NB of planets.
// int screen.x & screen.y = sreen size in px



function GridGen(nbElem) {
	this.nbElem = nbElem;
	this.gridWidth = nbElem;
	this.gridHeight = nbElem;
	this.grid = [];

	this.setGrid = function() {
		for (var i = 0; i < this.gridWidth; i++) {
			for (var j = 0; j < this.gridHeight; j++) {
				
			}
		};
	}

}
