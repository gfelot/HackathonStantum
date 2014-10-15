function ImageManager(path) {
	var p = path || '' ;
	
	this.path = "img/themes/"+config.theme+'/'+p ;

	var nbImages = config.nbElements ;
	var usedImages = []; 

	this.getRandomImage = function() {

		var r = Math.ceil(Math.random() * nbImages) ;
		if (usedImages.indexOf(r) != -1) {
			return this.getRandomImage() ;
		}

		usedImages.push(r) ;

		var img = this.path+r ;
		return img+".png" ;
	}
}