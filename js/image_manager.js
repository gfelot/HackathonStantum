function ImageManager(path) {

	if (path == undefined) {
		var path = "img/main/";
	}

	var nbImages = config.nbElements ;
	var usedImages = []; 

	this.getRandomImage = function() {

		var r = Math.ceil(Math.random() * nbImages) ;
		if (usedImages.indexOf(r) != -1) {
			return this.getRandomImage() ;
		}

		usedImages.push(r) ;
		return path + r + ".png" ;
	}
}