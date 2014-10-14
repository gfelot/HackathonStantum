

function Movable(index) {
	
	
	var usedCells = grid.getUsedCells() ;
	this.div ;
	this.currentCell = 0 ;

	this.init = function() {


		var div = document.createElement('div') ;
		div.setAttribute('id', 'player-'+index);
		div.setAttribute('class', 'player');

		var bg = new ImageManager('img/movable/') ;
		bg = bg.getRandomImage() ;

		div.style.backgroundImage = bg ;
		
		this.div = div ;
		this.div.style.left = usedCells[0].x * config.canvas.cellWidth + "px";
		this.div.style.top = usedCells[0].y * config.canvas.cellWidth + "px";

		document.getElementById('grid-container').appendChild(div);
	}

	this.getCurrentCell = function() {

		var cX = parseInt(this.div.style.left) / config.canvas.cellWidth ;
		var cY = parseInt(this.div.style.top) / config.canvas.cellWidth ;
		return ;
	}

	this.moveToCell = function(elt) {
		
		var i = elt != undefined ? elt.getAttribute('id').split('-').pop() : 0 ;

		// if (!linkedCells[this.currentCell] instanceof Array) {
		// 	linkedCells[this.currentCell] = [linkedCells[this.currentCell]];
		// }

		// console.log("current " + this.currentCell) ;
		// console.log("target " + i) ;
		// console.log(linkedCells[this.currentCell]) ;
		// console.log(typeof linkedCells[this.currentCell]) ;
		// console.log(linkedCells[this.currentCell].indexOf(i)) ;
		// console.log(linkedCells[this.currentCell][0]) ;
		// console.log(linkedCells[this.currentCell].length) ;

		if (linkedCells[this.currentCell].indexOf(parseInt(i)) != -1) {
		
			this.currentCell = i ;
			this.div.style.left = usedCells[i].x * config.canvas.cellWidth + "px";
			this.div.style.top = usedCells[i].y * config.canvas.cellWidth + "px";
		}

	}


}