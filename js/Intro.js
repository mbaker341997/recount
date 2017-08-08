Baker.Intro = function(){};

Baker.Intro.prototype = {
  create: function() {
	this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.backKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
	this.shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
	this.slide = this.game.add.sprite(0, 0, 'intro');
	this.slide.frame = 0;
	//  Create our Timer
	this.timer = this.game.time.create(false);
	this.timer.loop(165, this.slideshow, this);

	this.select = this.game.add.audio('select');
	this.select.allowMultiple = true;

	//  Start the timer running - this is important!
	this.timer.start();
	this.score1Text = this.game.add.text(16, 550, 'Press space to move forward, shift to skip.', { fontSize: '32px', fill: '#000' });
  },

  slideshow: function() {
	if(this.spaceKey.isDown && this.slide.frame < 5){
		this.select.play('', 0, 0.2);
		this.slide.frame+=1;
	 }
	 if(this.backKey.isDown && this.slide.frame > 0){
	 		this.select.play('', 0, 0.2);
	 		this.slide.frame-=1;
	 }
  },

  update: function() {
	 if(this.spaceKey.justPressed()){
		if(this.slide.frame == undefined)
			this.game.state.start('choose');
	 }
	 if(this.shiftKey.justPressed()){
	 		this.game.state.start('choose');
	 }
  }
};