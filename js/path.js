/**
 * Générateur de chemins entre les mainons
 *
 *
 * 
 */


function PathManager(nbElements) {

	this.nbElements = nbElements;
	//this.maxLink = 3; TODO ( a voir si on a le tps :)
	this.paths = matrixGenerator(this.nbElements, this.nbElements, -1);
	
	this.setRandomPath = function() {
		
		if (!config.useRandom) {
			this.paths = [
				[0,1,0,1,0,0,0,0],
				[1,0,1,1,0,0,0,0],
				[0,1,0,1,1,0,0,1],
				[1,1,1,0,1,1,0,0],
				[0,0,1,1,0,1,1,1],
				[0,0,0,1,1,0,1,0],
				[0,0,0,0,1,1,0,1],
				[0,0,1,0,1,0,1,0]
			];

			for (var i = 0; i < this.nbElements ; i++) {
				for (var j = 0; j < this.nbElements ; j++) {
		

						//on regarde si on doit associer
						var is_assoc = this.paths[i][j] ;

						var nbCircles = is_assoc ? config.path.minLength + Math.round(config.path.maxLength * Math.random()) : 0;
						this.paths[i][j] = nbCircles ;

						if (nbCircles) {

							if (linkedCells[i] == undefined) {
								linkedCells[i] = [j];
							} else {
								linkedCells[i].push(j) ;
							}
							this.draw(i,j, nbCircles) ;
						}
				
				}
			}
		} else {
		for (var i = 0; i < this.nbElements ; i++) {
			for (var j = 0; j < this.nbElements ; j++) {
				//une maison ne peut pas etre liée a elle meme
				if (i == j) this.paths[i][j] = 0 ;
				else {
					//on va regarder dans this.path si on a deja enregistré la jonction :
					var prev = this.paths[j][i];

					if (prev === -1) {

						//on regarde si on doit associer
						//var is_assoc = Math.round(Math.random()) == 1 ;

						var nbCircles = is_assoc ? config.path.minLength + Math.round(config.path.maxLength * Math.random()) : 0;
						this.paths[i][j] = nbCircles ;

						if (nbCircles) {

							if (linkedCells[i] == undefined) {
								linkedCells[i] = [j];
							} else {
								linkedCells[i].push(j) ;
							}
							this.draw(i,j, nbCircles) ;
						}
					}

					else if (prev > 0) {
					
						if (linkedCells[i] == undefined) {
							linkedCells[i] = [j];
						} else {
							linkedCells[i].push(j) ;
						}
					}
				}
			}
		}
			
		}	

	}
}

var done = [];
var countLink = 0 ;
PathManager.prototype.draw = function(c1, c2, nbCircles) {

	var usedCells = grid.getUsedCells() ;
	var w = config.canvas.cellWidth ;

	if(done.indexOf(usedCells[c1].e.id+'_'+usedCells[c2].e.id) != -1 || done.indexOf(usedCells[c2].e.id+'_'+usedCells[c1].e.id) != -1)  return;

	switch (config.linkStyle) {

		case "circle":

			nbCircles = nbCircles + 2 ;

			var radius = 7 ;
			var line = this.getDistance(usedCells[c1], usedCells[c2]) ;
			line = this.convertCellInPixel(line) ;

			//var alpha = Math.asin((usedCells[c1].x - usedCells[c2].x) * w/line);

			var alpha = Math.atan((usedCells[c1].y - usedCells[c2].y) / (usedCells[c1].x - usedCells[c2].x)) ;
			
			var nbSpaces = nbCircles - 1;
			var totalCircles = (nbCircles - 1) * 2 * radius ;
			var spaceWidth = Math.abs(line / nbSpaces);
	
			var x = (usedCells[c1].x * w) + w / 2;
			var y = (usedCells[c1].y * w) + w / 2;
			var newY = 0;
			var newX = 0;
			var addY ; 
			var addX ;
			if (alpha < Math.PI / 2) {
				addY = spaceWidth * Math.sin(alpha) ;
				addX = spaceWidth * Math.cos(alpha) ;
			} else {
				addY = spaceWidth * Math.sin(alpha - Math.PI ) ;
				addX = spaceWidth * Math.cos(alpha - Math.PI) ;
			}

			var color = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
					return i>5 ? null : a[Math.floor(Math.random()*16)]
				}).join('');


			var dx = (usedCells[c2].x - usedCells[c1].x) * w ;
			var dy = (usedCells[c2].y - usedCells[c1].y) * w ;

			for (var i = 0 ; i < nbCircles ; i++) {

				ctx.beginPath();
				ctx.arc(
					x + i * dx / nbCircles,
					y + i * dy / nbCircles,
					radius,
					0,
					Math.PI*2,
					true
				);
				ctx.closePath() ;
				
				ctx.fillStyle = "rgba(255,255,255,0.3)" ;
				ctx.fillStyle = color ;
				ctx.fill() ;
 
				// newX = x + addX ;
				// newY = y + addY ;

				// x = newX ;
				// y = newY ;
			}


		// 	break ;

		// default :

		// 	var color = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
		// 		return i>5 ? null : a[Math.floor(Math.random()*16)]
		// 	}).join('');
	
			ctx.beginPath() ;
			ctx.moveTo(w/2 + usedCells[c1].x * w, w/2 + usedCells[c1].y * w) ;
			ctx.lineTo(w/2 + usedCells[c2].x * w, w/2 + usedCells[c2].y * w) ;
			ctx.closePath() ;
			ctx.strokeStyle = color ;
			ctx.lineWidth = 1;
			ctx.stroke() ;

			if (config.path.drawNumber) {
				ctx.font = "18pt Arial";
				ctx.fillStyle = color ;
				ctx.fillText(
					nbCircles - 2, 
					(usedCells[c1].x + usedCells[c2].x) / 2 * w + w/2.5, 
					(usedCells[c1].y + usedCells[c2].y) / 2 * w + w/2.5
				);
			}
	}


	done.push(usedCells[c1].e.id+'_'+usedCells[c2].e.id);

};

//retourne un distance en nombre de cellule
PathManager.prototype.getDistance = function(cell1, cell2) {


	var d = Math.sqrt( (cell1.x - cell2.x) * (cell1.x - cell2.x) + (cell1.y - cell2.y) * (cell1.y - cell2.y) ) ;

	return d;

}

PathManager.prototype.convertCellInPixel = function(cellDistance) {

	return Math.round(cellDistance * config.canvas.cellWidth) ; //ne marche que pour des cellules carrées !
}

PathManager.prototype.getCellFromDistance = function(cell, distance) {


}



