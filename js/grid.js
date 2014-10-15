/**
* A Grid Generator for placement
*
*
*
*/

function Grid(context, nbElem) {

	this.context = context ;
	this.nbElem = nbElem;
	this.gridWidth = Math.round(parseInt(config.canvas.width) / parseInt(config.canvas.cellWidth)) ;
	this.gridHeight = Math.round(parseInt(config.canvas.height) / parseInt(config.canvas.cellHeight)) ;

	
		this.grid = matrixGenerator(this.gridWidth, this.gridHeight, 0);
		this.maxDistance = 1 ; //distance entre chaque maison
		this.usedCells = [];
	
	this.cellPositions = [
		[0, 1],
		[3, 0],
		[5, 2],
		[1, 3],
		[6, 4],
		[3, 5],
		[8, 6],
		[9, 1],
	] ;

	usedImages = [] ;
	var imgManager = new ImageManager('grid_items/grid_item_') ;
	

	this.setElementsOnGrid = function() {

		for (var i = 0 ; i < this.nbElem; i++) {
			this.setElementOnGrid(i);
		}

		return this ;
	}

	this.setElementOnGrid = function(index) {

		if (config.useRandom) {
			var cellPos = this.defineRandomPosition();
		} else {
			var cellPos = this.cellPositions[index] ;
		}
		
		while (!this.isEmptyZone(cellPos[0], cellPos[1])) {
		 	cellPos = this.setElementOnGrid();
		 	return ;
		}
	
		this.grid[cellPos[1]][cellPos[0]] = 1;

		var gridContainer = document.getElementById('grid-container');

		gridContainer.style.width = config.canvas.width + "px" ;
		gridContainer.style.height = config.canvas.height + "px" ;
		var gridItem = document.createElement('div') ;

		if (this.grid[cellPos[1]][cellPos[0]] == 1) {

			//on place les div pour leur associer les écouteurs
			gridItem.setAttribute('class', 'grid-item active');
			this.usedCells.push({
				e : gridItem,
				x : cellPos[0],
				y : cellPos[1],
			});

			gridItem.setAttribute('id', 'active-grid-item-'+ (this.usedCells.length - 1));
			gridItem.style.position = "absolute";
			gridItem.style.top = cellPos[1] * config.canvas.cellWidth + "px";
			gridItem.style.left = cellPos[0] * config.canvas.cellWidth + "px";
			var imgPath = imgManager.getRandomImage() ;
			var myImage = new Image();
			myImage.src = imgPath;

			gridItem.appendChild(myImage);

		} else {
			gridItem.setAttribute('class', 'grid-item');
		}

		gridContainer.appendChild(gridItem) ;
		return true;
	}

	this.isEmptyCell = function(x,y) {

		return this.grid[y][x] === 1 ;
	}

	this.isEmptyZone = function(x,y) {



		var xMin = (x - this.maxDistance) > 0 ? x - this.maxDistance : 0;
		var xMax = (x + this.maxDistance) < (this.gridWidth - 1) ? x + this.maxDistance : (this.gridWidth - 1) ;
		var yMin = (y - this.maxDistance) > 0 ? y - this.maxDistance : 0;
		var yMax = (y + this.maxDistance) < (this.gridHeight - 1) ? y + this.maxDistance : (this.gridHeight - 1) ;
	
		for (var i = xMin; i <= xMax; i++) {
			for (var j = yMin; j <= yMax; j++) {
				if (this.isEmptyCell(i,j)) return false;
			}	
		}

		return true ;
	}

	this.defineRandomPosition = function() {
		
		var x = Math.floor(Math.random() * (this.gridWidth -1)); //entre O et 14
		var y = Math.floor(Math.random() * (this.gridHeight -1)); //entre 0 et 9
		
		return [x,y] ;
	}


	this.drawGrid = function() {
		usedImages = [] ;
		var imgManager = new ImageManager('grid_items/grid_item_') ;
		var gridContainer = document.getElementById('grid-container');

		gridContainer.style.width = config.canvas.width + "px" ;
		gridContainer.style.height = config.canvas.height + "px" ;
		
		for (var i = 0, l = this.grid.length ; i < l ; i++) {
			for (var j = 0, k = this.grid[i].length ; j < k ; j++) {

				var gridItem = document.createElement('div') ;

				if (this.grid[i][j] == 1) {

					//on place les div pour leur associer les écouteurs
					gridItem.setAttribute('class', 'grid-item active');
					this.usedCells.push({
						e : gridItem,
						x : j,
						y : i,
					});

					gridItem.setAttribute('id', 'active-grid-item-'+ (this.usedCells.length - 1));

					var imgPath = imgManager.getRandomImage() ;
					var myImage = new Image();
					myImage.src = imgPath;

					gridItem.appendChild(myImage);

					//on dessine l'image dans le canvas
					// var t = function(i, j){

					// 	var imgPath = imgManager.getRandomImage() ;
					// 	var myImage = new Image();
					// 	myImage.src = imgPath;

					// 	myImage.onload = function() {
					// 		context.drawImage(myImage, i * config.canvas.cellHeight, j * config.canvas.cellWidth);
					// 	}

					// }(i, j) ;

				} else {
					gridItem.setAttribute('class', 'grid-item');
				}

				gridContainer.appendChild(gridItem) ;
			}
		}
	}

	this.getUsedCells = function() {
		return this.usedCells ;
	}

	this.initListeners = function() {

		for (var i = 0; i < this.usedCells.length ; i++) {

			var div = this.usedCells[i].e ;

			div.myData = i ;

			div.addEventListener('click', function(e) {

				playerActive.moveToCell(this) ;

			}, true) ;

			div.addEventListener('dragleave', function(e) {
				e.preventDefault() ;
				var img = this.firstChild ;
				img.style.width = "90px" ;
				img.style.marginLeft = "0px" ;
			}, false) ;

			div.addEventListener('dragenter', function(e) {
				e.preventDefault() ;
				var img = this.firstChild ;
				img.style.width = "70px" ;
				img.style.marginLeft = "10px" ;
			}, false) ;

			div.addEventListener('dragover', function(e) {
				e.preventDefault() ;
			}, false) ;

			div.addEventListener('drop', function(e) {
				e.preventDefault();
				e.stopPropagation() ;
				var img = this.firstChild ;
				img.style.width = "90px" ;
				img.style.marginLeft = "0px" ;
				playerActive.moveToCell(this) ;
			}, false) ;
		}
	}
}
