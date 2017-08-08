var Baker = Baker || {};

Baker.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
Baker.Boot.prototype = {
  preload: function() {
  	//assets we'll use in the loading screen
    this.load.image('logo', 'assets/preloadscreen.png');
    this.load.image('preloadbar', 'assets/preloadbar.png');
  },
  create: function() {
  	//loading screen will have a black background
    this.game.stage.backgroundColor = '#000';

    //scaling options
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.minWidth = 800;
	this.scale.minHeight = 600;
	this.scale.maxWidth = 800;
	this.scale.maxHeight = 600;

	//have the game centered horizontally
	this.scale.pageAlignHorizontally = true;

	//screen size will be set automatically
	this.scale.setScreenSize(800, 600);

	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('PreLoad');
  }
};