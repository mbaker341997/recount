Baker.MainMenu = function(){};

Baker.MainMenu.prototype = {
  create: function() {
	this.fx = this.game.add.audio('anthem');
	this.fx.allowMultiple = false;
	this.fx.play('');
	//this.recount = this.add.sprite(0, 0, 'recount');
	//this.recount.animations.add('intro', [3, 0, 1, 1, 2, 2, 3], 1, true);
	this.titlePage = this.add.sprite(0, 0, 'title');
	this.titlePage.animations.add('intro', [3, 0, 1, 1, 2, 2, 3], 0.5, true);
	//  Create our Timer
	this.timer = this.game.time.create(false);
	//  Set a TimerEvent to occur after 2 seconds
	this.timer.loop(2000, this.playIntro, this);

	 //  Start the timer running - this is important!
	 this.timer.start();


  },
  playIntro: function() {
	  //this.recount.animations.play('intro');
	  this.titlePage.animations.play('intro');
  },

  update: function() {
	 this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	 if(this.spaceKey.isDown){
		this.fx.stop();
		//this.game.state.start('Game');
		this.game.state.start('Intro');
	 }
  }
};