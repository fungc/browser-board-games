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
	
	didInsertElement: function() {

		Ember.run.scheduleOnce('afterRender', this, this.main);

	},

	main: function() {
		var canvas = $('#canvas1').get(0).getContext('2d');
		this.set('canvas',canvas);
		var FPS = 10;
		var view = this;
		var hor_distance = this.get('HOR_DISTANCE');
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
				function hexagon() {
					view.canvas.beginPath();
					view.canvas.moveTo(box_obj.xCoord,box_obj.yCoord);
					view.canvas.lineTo(box_obj.xCoord -hor_distance/2, box_obj.yCoord + view.BOX_LENGTH/2);
					view.canvas.lineTo(box_obj.xCoord -hor_distance/2, box_obj.yCoord + view.BOX_LENGTH/2 + view.BOX_LENGTH);
					view.canvas.lineTo(box_obj.xCoord, box_obj.yCoord + view.BOX_LENGTH/2 + view.BOX_LENGTH + view.BOX_LENGTH/2);
					view.canvas.lineTo(box_obj.xCoord + hor_distance/2, box_obj.yCoord + view.BOX_LENGTH/2 + view.BOX_LENGTH);
					view.canvas.lineTo(box_obj.xCoord + hor_distance/2, box_obj.yCoord + view.BOX_LENGTH/2);
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
		var piece = Ember.Object.extend({
			exist: false,
			topLeft: box.create(),
			topRight: box.create(),
			bottomLeft: box.create(),
			bottomRight: box.create()
		
		});

		box.create().draw();

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