var Baker = Baker || {};

//title screen
Baker.Game = function(){};

/*Baker.Game.prototype = {
	var isPaused = false;
this is the worst code i've ever written

};*/

Baker.Game.prototype = {
  init: function(choice) {
	  this.choice = choice
  },
  create: function() {
	this.game.forceSingleUpdate = true;
	this.game.add.sprite(0, 0, 'usa');
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.platforms = this.game.add.group();
	this.platforms.enableBody = true;
	var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
	//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	ground.scale.setTo(2, 2);
	//  This stops it from falling away when you jump on it
	ground.body.immovable = true;
	this.rivalNum = Math.random();
	this.spriteSelection();


	//  We need to enable physics on the player
	this.game.physics.arcade.enable(this.player);
	this.game.physics.arcade.enable(this.rival);

	//  Player physics properties. Give the little guy a slight bounce.
	this.player.body.bounce.y = 0.2;
	this.player.body.gravity.y = 500;
	this.player.body.collideWorldBounds = true;
	this.rival.body.bounce.y = 0.2;
	this.rival.body.gravity.y = 500;
	this.rival.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	this.player.animations.add('right', [5, 6, 7, 8], 10, true);
	this.player.animations.add('attackright', [10], 10, true);
	this.player.animations.add('attackleft', [9], 10, true);

	this.rival.animations.add('left', [0, 1, 2, 3], 7, true);
	this.rival.animations.add('right', [5, 6, 7, 8], 7, true);
	this.rival.animations.add('attackright', [10], 7, true);
	this.rival.animations.add('attackleft', [9], 7, true);

	//rival always moves
	this.rival.body.velocity.x = 250;
	this.rival.animations.play('right');

	//  Finally some votes to collect
	this.votes = this.game.add.group();
	//  We will enable physics for any vote that is created in this group
	this.votes.enableBody = true;
	this.votes.setAll('collideWorldBounds', true);
	this.loadVotes(9);

	if(this.choice == 1){
		//  Our attack group
		this.attacks = this.game.add.group();
		this.attacks.enableBody = true;
		this.attacks.physicsBodyType = Phaser.Physics.ARCADE;
		this.attacks.createMultiple(30, 'brick');
		this.attacks.setAll('anchor.x', 1);
		this.attacks.setAll('anchor.y', 0.5);
		this.attacks.setAll('outOfBoundsKill', true);
		this.attacks.setAll('checkWorldBounds', true);

		//  Rival attack group
		this.rivalAttacks = this.game.add.group();
		this.rivalAttacks.enableBody = true;
		this.rivalAttacks.physicsBodyType = Phaser.Physics.ARCADE;
		this.rivalAttacks.createMultiple(30, 'email');
		this.rivalAttacks.setAll('anchor.x', 1);
		this.rivalAttacks.setAll('anchor.y', 0.5);
		this.rivalAttacks.setAll('outOfBoundsKill', true);
		this.rivalAttacks.setAll('checkWorldBounds', true);
	}
	else if(this.choice == 3){
		//  Our attack group
		this.attacks = this.game.add.group();
		this.attacks.enableBody = true;
		this.attacks.physicsBodyType = Phaser.Physics.ARCADE;
		this.attacks.createMultiple(30, 'email');
		this.attacks.setAll('anchor.x', 1);
		this.attacks.setAll('anchor.y', 0.5);
		this.attacks.setAll('outOfBoundsKill', true);
		this.attacks.setAll('checkWorldBounds', true);

		//  Rival attack group
		this.rivalAttacks = this.game.add.group();
		this.rivalAttacks.enableBody = true;
		this.rivalAttacks.physicsBodyType = Phaser.Physics.ARCADE;
		this.rivalAttacks.createMultiple(30, 'brick');
		this.rivalAttacks.setAll('anchor.x', 1);
		this.rivalAttacks.setAll('anchor.y', 0.5);
		this.rivalAttacks.setAll('outOfBoundsKill', true);
		this.rivalAttacks.setAll('checkWorldBounds', true);
	 }
	 else{
		 //  Bernie's attack groups
		 this.leftFlame();
		 this.rightFlame();

		 //  Rival attack group
		 this.rivalAttacks = this.game.add.group();
		 this.rivalAttacks.enableBody = true;
		 this.rivalAttacks.physicsBodyType = Phaser.Physics.ARCADE;
		 if(this.rivalNum > 0.5)
		   	this.rivalAttacks.createMultiple(30, 'brick');
		 else
  			this.rivalAttacks.createMultiple(30, 'email');
		 this.rivalAttacks.setAll('anchor.x', 1);
		 this.rivalAttacks.setAll('anchor.y', 0.5);
		 this.rivalAttacks.setAll('outOfBoundsKill', true);
		 this.rivalAttacks.setAll('checkWorldBounds', true);
	 }


	///  The score
	this.score1Text = this.game.add.text(16, 550, 'Your Score: 0', { fontSize: '32px', fill: '#000' });
	this.score2Text = this.game.add.text(600, 550, 'CPU Score: 0', { fontSize: '32px', fill: '#000' });
	this.stateText = this.game.add.text(300, 550, 'State: alabama', { fontSize: '32px', fill: '#000'});
	this.timerText = this.game.add.text(600, 16, 'Time: ', { fontSize: '32px', fill: '#FF0000'});
	//this.pauseText = this.game.add.text(625, 550, 'Pause(Shift)', { fontSize: '32px', fill: '#000'});

	//  player controls
	this.cursors = this.game.input.keyboard.createCursorKeys();

	//other key settings...
	this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.winKey = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
	this.loseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
	//this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

	//  Create our Timer
	this.timer = this.game.time.create(false);

	//  Set a TimerEvent to occur after 2 seconds
	this.timer.loop(300000, this.endHold, this);

	//  Start the timer running - this is important!
	this.timer.start();

	this.attackTime = 0;
	this.score1 = 0;
	this.score2 = 0;
	this.victory = false;

	//audio
	this.fx = this.game.add.audio('jumpSound');
	this.fx.allowMultiple = true;

	this.pickup = this.game.add.audio('pickup');
	this.pickup.allowMultiple = false;

	this.hurt = this.game.add.audio('hurt');
	this.hurt.allowMultiple = true;

	this.fire = this.game.add.audio('fire');
	this.fire.allowMultiple = true;

	this.french = this.game.add.audio('french');
	this.french.allowMultiple = false;
	this.french.play('', 0, 1, true);
	/*this.rich = this.game.add.audio('rich');
	this.rich.allowMultiple = true;*/

	//i should've used JSON
	this.electorals = 9;
	this.attackTime = 0;
	this.num = 0;
	this.states = ['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina', 'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington dc', 'washington', 'west virginia', 'wisconsin', 'wyoming'];
	this.stateVotes = [9, 3, 11, 6, 55, 9, 7, 3, 29, 16, 4, 4, 20, 11, 6, 6, 8, 8, 4, 10, 11, 16, 10, 16, 10, 6, 10, 3, 5, 6, 4, 14, 5, 29, 15, 3, 18, 7, 7, 20, 4, 9, 3, 11, 38, 6, 3, 13, 3, 12, 5, 10, 3];
  },

  spriteSelection: function() {
  	  if(this.choice == 1){
  		// The player and rival and their settings
  		this.player = this.game.add.sprite(100, 100, 'don');
  		if(this.rivalNum > 0.5)
			this.rival = this.game.add.sprite(700, 100, 'bern');
		else
  			this.rival = this.game.add.sprite(700, 100, 'hill');
  	  }
  	  else if(this.choice == 2){
  		// The player and rival and their settings
  		this.player = this.game.add.sprite(100, 100, 'bern');
  		if(this.rivalNum > 0.5)
  			this.rival = this.game.add.sprite(700, 100, 'don');
  		else
  			this.rival = this.game.add.sprite(700, 100, 'hill');
  	  }
  	  else if(this.choice == 3){
	    // The player and rival and their settings
	    this.player = this.game.add.sprite(100, 100, 'hill');
	    if(this.rivalNum > 0.5)
		  	this.rival = this.game.add.sprite(700, 100, 'don');
		else
  			this.rival = this.game.add.sprite(700, 100, 'bern');
  	  }
  },

  update: function() {

	//  Collide the player and the votes with the platforms
	this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.rival, this.platforms);
    this.game.physics.arcade.collide(this.votes, this.platforms);
	this.game.physics.arcade.collide(this.rivalAttacks, this.platforms);
	this.game.physics.arcade.collide(this.rival, this.player);

	this.timerText.text = 'Time: ' + Math.floor(this.timer.duration.toFixed(0)/1000);

	//  Checks to see if the player overlaps with any of the votes, if he does call the collectVote function
	this.game.physics.arcade.overlap(this.player, this.votes, this.collectVote, null, this);
	this.game.physics.arcade.overlap(this.rival, this.votes, this.collectVote, null, this);
	this.game.physics.arcade.overlap(this.player, this.rivalAttacks, this.getHit, null, this);

	//for stupid bernie
	if(this.choice == 2){
		this.game.physics.arcade.collide(this.attacksL, this.platforms);
		this.game.physics.arcade.collide(this.attacksR, this.platforms);
		this.game.physics.arcade.overlap(this.rival, this.attacksR, this.getHit, null, this);
		this.game.physics.arcade.overlap(this.rival, this.attacksL, this.getHit, null, this);
	}
	else{
		this.game.physics.arcade.collide(this.attacks, this.platforms);
		this.game.physics.arcade.overlap(this.rival, this.attacks, this.getHit, null, this);
	}


	//  Reset the player velocity (movement)
	this.player.body.velocity.x = 0;


	//rival moves constantly
	this.rivalTurn();

	//rival sometimes fires attacks
	if(Math.random() < 0.01){
		this.rivalFireAttack();
	}


	if (this.cursors.left.isDown)
			{
				//  Move to the left
				this.player.body.velocity.x = -300;

				this.player.animations.play('left');
				if (this.attackKey.isDown)
				{
					//stop
					this.player.body.velocity.x = 0;
					//player attack
					this.player.animations.play('attackleft');
					this.fireAttack();
				}
			}
			else if (this.cursors.right.isDown)
			{
				//  Move to the right
				this.player.body.velocity.x = 300;

				this.player.animations.play('right');
				if (this.attackKey.isDown)
				{
					//stop
					this.player.body.velocity.x = 0;
					//player attack
					this.player.animations.play('attackright');
					this.fireAttack();
				}
			}
			else
			{
				//  Stand still
				this.player.animations.stop();
				this.player.frame = 4;
			}

			//  Allow the player to jump if they are touching the ground.
			if (this.cursors.up.isDown && this.player.body.touching.down)
			{
				this.fx.play('', 0, 0.1);
				this.player.body.velocity.y = -450;
			}
			if(this.score1 + this.score2 == this.electorals){
				this.num++;
				this.loadState(this.num);
		}
		if (this.winKey.isDown)
		{
			this.victory = true;
			this.endHold();
		}
		if (this.loseKey.isDown)
		{
			this.victory = false;
			this.endHold();
		}
  },

  loadVotes: function(num){
	//var gap = Math.floor(game.world.height/num);
	if(num <= 10){
		for (var i = 0; i < num; i++)
		{
			//  Create a vote inside of the 'votes' group
			var vote = this.votes.create(i * Math.floor(800/num) + 25, 0, 'ballot');

  			//  Let gravity do its thing
  			vote.body.gravity.y = 300;

			//  This just gives each ballot a slightly random bounce value and makes them collide with bounds
  			vote.body.bounce.y = 0.7 + Math.random() * 0.2;
  			vote.body.collideWorldBounds = true;
  		}
  	}
  	else{
  		this.loadVotes(10);
  		//Create our Timer
  		this.timer2 = this.game.time.create(false);

		//  Set a TimerEvent to occur after 2 seconds
		this.timer2.add(3000, this.loadMore, this, num-10);

		//  Start the timer running - this is important!
  		this.timer2.start();
  	}
  },

  loadMore: function(more){
  		this.loadVotes(more);
  },

  leftFlame: function(){
	//  Our attack group
		this.attacksL = this.game.add.group();
		this.attacksL.enableBody = true;
		this.attacksL.physicsBodyType = Phaser.Physics.ARCADE;
		this.attacksL.createMultiple(30, 'fleft');
		this.attacksL.setAll('anchor.x', 1);
		this.attacksL.setAll('anchor.y', 0.5);
		this.attacksL.setAll('outOfBoundsKill', true);
		this.attacksL.setAll('checkWorldBounds', true);
  },
  rightFlame: function(){
  	//  Our attack group
  		this.attacksR = this.game.add.group();
  		this.attacksR.enableBody = true;
  		this.attacksR.physicsBodyType = Phaser.Physics.ARCADE;
  		this.attacksR.createMultiple(30, 'fright');
  		this.attacksR.setAll('anchor.x', 1);
  		this.attacksR.setAll('anchor.y', 0.5);
  		this.attacksR.setAll('outOfBoundsKill', true);
  		this.attacksR.setAll('checkWorldBounds', true);

  },

  collectVote: function(collector, vote) {

  	// Removes the vote from the screen
  	vote.kill();

  	this.pickup.play('', 0, 0.05);

  	if(collector == this.player){
  		//  Add and update the score
  		this.score1 += 1;
  		this.score1Text.text = 'Your Score: ' + this.score1;

  		if(this.score1 >= 270){
					this.victory = true;
  					this.endHold();
  		}
  	}
  	else if(collector == this.rival){
  			//  Add and update the score
  			this.score2 += 1;
  			this.score2Text.text = 'CPU Score: ' + this.score2;

  			if(this.score2 >= 270){
  				this.endHold();
  			}
  		}

  	},


  	getHit: function(victim, strike) {
		this.hurt.play('', 0 , 0.1);
  		var direction = strike.body.velocity.x;
  		// Removes the star from the screen
  		strike.kill();

  		if(victim == this.player){
  			//  Subtract and update the score
  			if(this.score1 > 0){
  				this.score1 -= 1;
  				this.score1Text.text = 'Your Score: ' + this.score1;
  				this.votesFly(this.player, direction);
  			}
  		}
  		else if(victim == this.rival){
  			//  Subtract and update the score
  			if(this.score2 > 0){
  				this.score2 -= 1;
  				this.score2Text.text = 'CPU Score: ' + this.score2;
  				this.votesFly(this.rival, direction);
  			}
  		}

  	},

  	votesFly: function(victim, direction){
  		//  Create a vote inside of the 'votes' group and make it fly out
  		var vote;
  		if(direction > 0){
  			vote = this.votes.create(victim.x + 75, victim.y+25, 'ballot');
  			vote.body.velocity.x = 100;
  		}
  		else{
  			vote = this.votes.create(victim.x - 75, victim.y+25, 'ballot');
  			vote.body.velocity.x = -100;
  		}
  		vote.body.gravity.y = 300;
  		vote.body.collideWorldBounds = true;
  		//  This just gives each vote a slightly random bounce value
  		vote.body.bounce.y = 0.7 + Math.random() * 0.2;
  },

  rivalTurn: function(){
  		if(this.rival.x > this.game.world.width - 65){
  			this.rival.body.velocity.x = -250;
  			this.rival.animations.play('left');
  		}
  		else if(this.rival.x <= 0){
  			this.rival.body.velocity.x = 250;
  			this.rival.animations.play('right');
  		}
  		else if(this.rival.body.velocity.x > -250 && this.rival.body.velocity.x < 250){
  			if(this.rival.animations.currentAnim.name == 'right'){
  				this.rival.body.velocity.x = -250;
  				this.rival.animations.play('left');
  			}
  			else{
  				this.rival.body.velocity.x = 250;
  				this.rival.animations.play('right');
  			}
  		}
	},

	fireAttack: function() {
			//  To avoid them being allowed to fire too fast we set a time limit
			if (this.game.time.now > this.attackTime)
			{
				if(this.choice == 2){
					//  Find direction first
					if(this.cursors.right.isDown){
						attack = this.attacksR.getFirstExists(false);
						attack.body.bounce.x = 0.7 + Math.random() * 0.2;
						attack.body.gravity.y = 15;
						if(attack){
							this.fire.play('', 0, 0.1);
							attack.reset(this.player.x + 90, this.player.y+70);
							attack.body.velocity.x = 300;
							this.attackTime = this.game.time.now + 300;
						}
					}
					else{
						attack = this.attacksL.getFirstExists(false);
						attack.body.bounce.x = 0.7 + Math.random() * 0.2;
						attack.body.gravity.y = 15;
						if(attack){
							this.fire.play('', 0, 0.1);
							attack.reset(this.player.x, this.player.y+70);
							attack.body.velocity.x = -300;
							this.attackTime = this.game.time.now + 300;
						}
					}
				}
				else{
					//  Grab the first email we can from the pool
					attack = this.attacks.getFirstExists(false);
					attack.body.bounce.x = 0.7 + Math.random() * 0.2;
					attack.body.gravity.y = 15;

					/*if(this.choice == 1){
						if(Math.random() <= 0.3)
							this.rich.play('', 0, 3);
					}*/

					if (attack)
					{
						this.fire.play('', 0, 0.1);
						//  And fire it
						if(this.cursors.right.isDown){
							attack.reset(this.player.x + 90, this.player.y+70);
							attack.body.velocity.x = 300;
						}
						else{
							attack.reset(this.player.x, this.player.y+70);
							attack.body.velocity.x = -300;
						}
						this.attackTime = this.game.time.now + 300;
					}
				}
			}

		},

	rivalFireAttack: function() {

			//  To avoid them being allowed to fire too fast we set a time limit
			//  Grab the first brick we can from the pool
			rivalAttack = this.rivalAttacks.getFirstExists(false);
			rivalAttack.body.bounce.x = 0.7 + Math.random() * 0.2;
			rivalAttack.body.gravity.y = 15;


			if (rivalAttack)
			{
				this.fire.play('', 0, 0.1);
				//  And fire it
				if(this.rival.animations.currentAnim.name == 'right'){
					this.rival.animations.play('attackright');
					rivalAttack.reset(this.rival.x + 90, this.rival.y+70);
					rivalAttack.body.velocity.x = 300;
				}
				else{
					this.rival.animations.play('attackleft');
					rivalAttack.reset(this.rival.x, this.rival.y+70);
					rivalAttack.body.velocity.x = -300;
				}

			}

	},

	loadState: function(stateNum){
			if(stateNum < this.states.length){
				this.stateText.text = 'State: ' + this.states[stateNum];
				this.electorals += this.stateVotes[stateNum];
				this.loadVotes(this.stateVotes[stateNum]);
			}
	},

	endHold: function(){
		//this.player.kill();
		this.french.stop();
		this.rival.kill();
		this.votes.callAll('kill');

		this.rivalAttacks.callAll('kill');
		if(this.choice == 2){
			this.attacksL.callAll('kill');
			this.attacksR.callAll('kill');
		}
		else
			this.attacks.callAll('kill');
		this.timerText.text = '0';
		this.timer.add(1000, this.gameOver, this, null);
	},

  gameOver: function(){
  		this.game.state.start('Over', true, false, this.choice, this.victory);
	}
};