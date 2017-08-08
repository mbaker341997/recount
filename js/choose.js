Baker.Choose = function(){};

Baker.Choose.prototype = {
  create: function() {
	this.background = this.add.sprite(0, 0, 'chose');
	this.backKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
	// The player and rival and their settings
	this.hill = this.game.add.sprite(500, 300, 'hillgrey');
	this.don = this.game.add.sprite(0, 300, 'dongrey');
	this.bern = this.game.add.sprite(250, 300, 'bernhead');
	this.cursors = this.game.input.keyboard.createCursorKeys();
	this.choice = 2;
	//  Create our Timer
	this.timer = this.game.time.create(false);
	//  Set a TimerEvent to occur after 2 seconds
	this.timer.loop(140, this.traverse, this);

	this.select = this.game.add.audio('select');
	this.select.allowMultiple = true;

	this.fire = this.game.add.audio('fire');
	this.fire.allowMultiple = true;

	 //  Start the timer running - this is important!
	 this.timer.start();
  },
  traverse: function(){
	if (this.cursors.left.isDown)
	{
		this.select.play('', 0, 0.2);
		if (this.choice == 3){
			this.bern = this.game.add.sprite(250, 300, 'bernhead');
			this.hill = this.game.add.sprite(500, 300, 'hillgrey');
			this.don = this.game.add.sprite(0, 300, 'dongrey');
			this.choice = 2;
		}
		else{
			this.bern = this.game.add.sprite(250, 300, 'berngrey');
			this.hill = this.game.add.sprite(500, 300, 'hillgrey');
			this.don = this.game.add.sprite(0, 300, 'donhead');
			this.choice = 1;
		}
	}
	else if (this.cursors.right.isDown)
	{
		this.select.play('', 0, 0.2);
		if(this.choice == 1){
			this.bern = this.game.add.sprite(250, 300, 'bernhead');
			this.hill = this.game.add.sprite(500, 300, 'hillgrey');
			this.don = this.game.add.sprite(0, 300, 'dongrey');
			this.choice = 2;
		}
		else{
			this.bern = this.game.add.sprite(250, 300, 'berngrey');
			this.hill = this.game.add.sprite(500, 300, 'hillhead');
			this.don = this.game.add.sprite(0, 300, 'dongrey');
			this.choice = 3;
		}
	}
	else if(this.backKey.isDown)
		this.game.state.start('Intro');

  },
  update: function() {
	 this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	 if(this.spaceKey.isDown && this.choice != 0){
		this.fire.play('', 0, 0.4);
		this.game.state.start('Game', true, false, this.choice);
	 }
  }
};