

function Movable(index) {
	
	
	var usedCells = grid.getUsedCells() ;
	var compteur = document.getElementById('compteur') ;
	this.div ;
	this.currentCell = 0 ;
	this.historyState = [] ;
	this.score = 0 ;

	this.init = function() {


		var div = document.createElement('div') ;
		div.setAttribute('id', 'player-'+index);
		div.setAttribute('class', 'player');
		div.setAttribute('draggable', true);
		var mini = document.createElement('div') ;
		usedImages = [] ;
		var bg = new ImageManager('movable/movable_', 6) ;
		bg = bg.getRandomImage() ;
		mini.style.backgroundImage = "url("+bg+")" ;
		mini.setAttribute('class', 'mini') ;
		div.appendChild(mini) ;
		
		this.div = div ;
		this.div.style.left = usedCells[0].x * config.canvas.cellWidth + "px";
		this.div.style.top = usedCells[0].y * config.canvas.cellWidth + "px";

		document.getElementById('grid-container').appendChild(div);

		div.addEventListener('dragstart', function(e) {

		});
	}

	// this.getCurrentCell = function() {

	// 	var cX = parseInt(this.div.style.left) / config.canvas.cellWidth ;
	// 	var cY = parseInt(this.div.style.top) / config.canvas.cellWidth ;
	// 	return ;
	// }

	this.moveToCell = function(elt) {
		
		var i = elt != undefined ? elt.getAttribute('id').split('-').pop() : 0 ;

		if (linkedCells[this.currentCell].indexOf(parseInt(i)) != -1) {
		
			//on stocke dans l'historique
			this.historyState.push(this.currentCell) ;
			this.updateScore(this.currentCell, i, 'add');

			ctrlZ.setAttribute('class', '') ;

			//on bouge
			this.currentCell = i ;
			this.div.style.left = usedCells[i].x * config.canvas.cellWidth + "px";
			this.div.style.top = usedCells[i].y * config.canvas.cellWidth + "px";

			if (i == 7) {
				victoryScreen.style.display = "block" ;

				var msg = "Tu as atteint la planète en "+this.score+" km !"
		
				victoryScreen.childNodes[1].innerHTML = msg ;

			}

		}

	}

	this.moveBackToCell = function() {

		if (this.historyState.length > 0) {

			var oldCell = this.historyState.pop(this.currentCell) ;
			this.updateScore(this.currentCell, oldCell, 'remove');
			this.currentCell = oldCell ;
			this.div.style.left = usedCells[oldCell].x * config.canvas.cellWidth + "px";
			this.div.style.top = usedCells[oldCell].y * config.canvas.cellWidth + "px";
			
			if (this.historyState.length == 0) {
				ctrlZ.setAttribute('class', 'forbidden') ;
			}
		} else {
			alert('Tu ne peux plus reculer !');
			this.score = 0 ;
			compteur.textContent = this.score ;

			ctrlZ.setAttribute('class', 'forbidden') ;
		}

	}

	this.updateScore = function(o, n, mode) {


		var distance = myPathManager.paths[o][n] ;
		
		if (mode == "remove") {
			this.score -= Math.abs(distance) ;
		} else {
			this.score += Math.abs(distance) ;
		}

		compteur.textContent = this.score ;

	}


}