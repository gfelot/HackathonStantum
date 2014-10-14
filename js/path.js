/**
 * Générateur de chemins entre les mainons
 *
 *
 * 
 */

function PathManager(nbHouses) {

	this.nbHouses = nbHouses;
	//this.maxLink = 3; TODO ( a voir si on a le tps :)
	this.paths = matrixGenerator(this.nbHouses, this.nbHouses, -1);

	this.setRandomPath = function() {

		for (var i = 0; i < this.nbHouses ; i++) {
			for (var j = 0; j < this.nbHouses ; j++) {
				//une maison ne peut pas etre liée a elle meme
				if (i == j) this.paths[i][j] = 0 ;
				else {
					//on va regarder dans this.path si on a deja enregistré la jonction :
					var prev = this.paths[j][i];

					if (prev != -1) {
						this.paths[i][j] = this.paths[j][i];
					} else {
						this.paths[i][j] =  Math.round(Math.random());
					}
				}
			}
		}
	}
}


var p = new PathManager(6);
p.setRandomPath() ;

