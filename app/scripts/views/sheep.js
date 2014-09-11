BoardGame.SheepView = Ember.View.extend({

	textX: 10,
	textY: 10,
	CANVAS_WIDTH: 500,
	CANVAS_HEIGHT: 500,
	canvas: null,
	board: null,
	BOX_LENGTH: 40,
	HOR_DISTANCE: function() {
		return this.get('BOX_LENGTH') * 2 * Math.cos(Math.PI/6);
	}.property('BOX_LENGTH'),

	boxObject: function() {
		var view = this;
		var hor_distance = this.get('HOR_DISTANCE');
		var mover = this.get('CoordMove');
		var box = Ember.Object.extend({
			exist: false,
			boxColor: '#ddd',
			borderColor:'red',
			xCoord: view.BOX_LENGTH,
			yCoord: 0,
			x: null,
			y: null,
			stack: null,
			xFront: null,
			xBack: null,
			yFront: null,
			yBack: null,
			zFront: null,
			zBack: null,
			draw: function() {
				var box_obj = this;
				this.exist = true;
				function hexagon() {
					view.canvas.beginPath();
					var drawX = box_obj.xCoord;
					var drawY = box_obj.yCoord;
					view.canvas.moveTo(drawX, drawY);

					var newCoords = mover.leftDown(drawX, drawY);
					view.canvas.lineTo(newCoords.x, newCoords.y);

					var newCoords = mover.down(newCoords.x, newCoords.y);
					view.canvas.lineTo(newCoords.x, newCoords.y);

					var newCoords = mover.rightDown(newCoords.x, newCoords.y);
					view.canvas.lineTo(newCoords.x, newCoords.y);

					var newCoords = mover.rightUp(newCoords.x, newCoords.y);
					view.canvas.lineTo(newCoords.x, newCoords.y);

					var newCoords = mover.up(newCoords.x, newCoords.y);
					view.canvas.lineTo(newCoords.x, newCoords.y);

					view.canvas.closePath();
				}

				view.canvas.fillStyle = box_obj.boxColor;
				hexagon();
				view.canvas.fill();

				view.canvas.strokeStyle = box_obj.borderColor;
				hexagon();
				view.canvas.stroke();				
			}
		});
		return box;
	}.property('BOX_LENGTH'),

	CoordMove: function() {
		var hor_distance = this.get('HOR_DISTANCE');
		var box_length = this.BOX_LENGTH;
		return {
			leftDown: function(x, y) {
				return { x: x - hor_distance/2, y: y + box_length/2 };
			},
			down: function(x, y) {
				return { x: x, y: y + box_length };
			},
			rightDown: function(x, y) {
				return { x: x + hor_distance/2, y: y + box_length/2 };
			},
			rightUp: function(x, y) {
				return { x: x + hor_distance/2, y: y - box_length/2 };
			},
			up: function(x, y) {
				return { x: x, y: y - box_length };
			},
			leftUp: function(x, y) {
				return { x: x - hor_distance/2, y: y - box_length/2 };
			}
		};
	}.property('BOX_LENGTH'),

	addrToCoord: function(x, y) {
		var resultX = this.BOX_LENGTH;
		var resultY = 0;
		var mover = this.get('CoordMove');

		if (x === 0 && y === 0) {
			return {x: resultX, y: resultY};
		}

		var posY = -y;
		for (i = 0; i < posY; i++) {
			var newCoords = mover.leftDown(resultX, resultY);
			newCoords = mover.down(newCoords.x, newCoords.y);
			resultX = newCoords.x;
			resultY = newCoords.y;
		}

		for (i = 0; i < x; i++) {
			var newCoords = mover.rightDown(resultX, resultY);
			newCoords = mover.rightUp(newCoords.x, newCoords.y);
			resultX = newCoords.x;
			resultY = newCoords.y;
		}

		return { x: resultX, y: resultY };
	},

	makeBox: function(x, y) {
		var box = this.get('boxObject').create();
		box.x = x;
		box.y = y;
		var newCoords = this.addrToCoord(x, y);
		box.xCoord = newCoords.x;
		box.yCoord = newCoords.y;
		return box;
	},
	
	didInsertElement: function() {

		Ember.run.scheduleOnce('afterRender', this, this.main);

	},

	main: function() {
		var canvas = $('#canvas1').get(0).getContext('2d');
		this.set('canvas',canvas);
		var FPS = 10;
		var view = this;
		var hor_distance = this.get('HOR_DISTANCE');
		
		// var piece = Ember.Object.extend({
		// 	exist: false,
		// 	topLeft: box.create(),
		// 	topRight: box.create(),
		// 	bottomLeft: box.create(),
		// 	bottomRight: box.create()
		
		// });

		this.makeBox(0, 0).draw();
		this.makeBox(1, -1).draw();
		this.makeBox(2, -1).draw();
		this.makeBox(1, 0).draw();

		// var board = 

		// setInterval(function() {
		//   view.update();
		//   view.draw();
		// }, 1000/FPS);
	},

	update: function() {
		this.textX +=1;
	},

	draw: function() {
		this.canvas.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
		this.canvas.fillStyle = "#000";
  	this.canvas.fillText("Sup Bro!", this.textX, this.textY);
	}
});