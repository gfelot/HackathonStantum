function matrixGenerator(x,y) {
	var matrix = [];
	for (var i = 0; i < x; i++) {
		matrix[i] = [];
		for (var j = 0; j < y; j++) {
			matrix[i][j] = 0;
		}
	}

	return matrix;
}