function ImageManager(path, nbImages) {
	var p = path || '' ;
	
	this.path = "img/themes/"+config.theme+'/'+p ;

	var nbImages = nbImages || config.nbElements ;
	


	this.getRandomImage = function() {

		var r = Math.ceil(Math.random() * nbImages) ;
		if (usedImages.indexOf(r) !== -1) {
			return this.getRandomImage() ;
		}

		usedImages.push(r) ;

		console.log(usedImages) ;

		var img = this.path+r ;
		return img+".png" ;
	}
}