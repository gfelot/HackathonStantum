function matrixGenerator(x, y, v) {

	var matrix = [];

	if (y == undefined) {
		y = x ;
	}

	if (v == undefined) {
		v = 0;
	}
	for (var i = 0; i < x; i++) {
		matrix[i] = [];
		for (var j = 0; j < y; j++) {
			matrix[i][j] = v;
		}
	}
	
	return matrix;
}