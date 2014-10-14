function matrixGenerator(x, y, v) {

	var matrix = [];

	if (y == undefined) {
		y = x ;
	}

	if (v == undefined) {
		v = 0;
	}

	//crée les lignes
	for (var i = 0; i < y; i++) {
		matrix[i] = [];
		//cree le colonnes
		for (var j = 0; j < x; j++) {
			matrix[i][j] = v;
		}
	}

	return matrix;
}