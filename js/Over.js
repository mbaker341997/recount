var Baker = Baker || {};

Baker.Over = function(){};

Baker.Over.prototype = {
  init: function(choice, victory) {
	this.choice = choice;
	this.victory = victory;
  },

  create: function() {
	if(this.victory && this.choice == 1){
		this.fx = this.game.add.audio('anthem');
		this.fx.allowMultiple = false;
		this.fx.play();
		this.win = this.add.sprite(0, 0, 'trumpwin');
		this.win.animations.add('win', [0,1], 3, true);
		/*this.maga = this.game.add.audio('maga');
		this.maga.allowMultiple = false;
		this.maga.play('', 0, 4);*/
		this.banner = this.game.add.text(225, 75, 'Congrats President Trump!', { fontSize: '50px', fill: '#000'});
	}
	else if(this.victory && this.choice == 2){
		this.fx = this.game.add.audio('anthem');
		this.fx.allowMultiple = false;
		this.fx.play();
		this.win = this.add.sprite(0, 0, 'bernwin');
		this.win.animations.add('win', [0,1], 3, true);
		this.banner = this.game.add.text(225, 75, 'Congrats President Sanders!', { fontSize: '50px', fill: '#000'});
	}
	else if(this.victory && this.choice == 3){
		this.fx = this.game.add.audio('anthem');
		this.fx.allowMultiple = false;
		this.fx.play();
		this.win = this.add.sprite(0, 0, 'hillwin');
		this.win.animations.add('win', [0,1], 3, true);
		this.banner = this.game.add.text(225, 75, 'Congrats President Clinton!', { fontSize: '50px', fill: '#000'});
	}
	else{
		this.fx = this.game.add.audio('hymn');
		this.fx.allowMultiple = false;
		this.fx.play('', 4);
		this.lose = this.add.sprite(0, 0, 'lose');
	}
  },

  update: function() {
	  if(this.victory){
		  this.win.animations.play('win');
	  }
	 this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	 this.shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
	 if(this.shiftKey.isDown){
	 	 	this.copyright = this.add.sprite(0, 0, 'copy');
	 }
	 if(this.spaceKey.justPressed()){
		this.fx.stop();
		//this.game.state.start('Game');
		this.game.state.start('Boot');
	 }
  }
};