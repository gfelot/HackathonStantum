function matrixGenerator(x, y, v) {

	var matrix = [];

	if (y == undefined) {
		y = x ;
	}
	var vv = v || 0;

	for (var j = 0; j < y; j++) {
		matrix[j] = [];
		for (var i = 0; i < x; i++) {
			matrix[j][i] = -1;
		}
	}

	return matrix;
}