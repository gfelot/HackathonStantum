function ImageManager() {



	var nbImages = config.nbElements ;
	var usedImages = []; 
	var path = "img/main/";

	this.getRandomImage = function() {

		var r = Math.round(Math.random() * nbImages) + 1;
		if (usedImages.indexOf(r) != -1) {
			return this.getRandomImage() ;
		}

		usedImages.push(r) ;
		//document.getElementById('grid-container').innerHTML += '<img src="'+path+r+'.png"/>' ;
		return path + r + ".png" ;
	}
}