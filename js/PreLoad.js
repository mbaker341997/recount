var Baker = Baker || {};

//loading the game assets
Baker.PreLoad = function(){};

Baker.PreLoad.prototype = {
  preload: function() {
  	//show logo in loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
	this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	//load game assets
  	this.load.image('usa', 'assets/americanostates.png');
	this.load.image('start', 'assets/recount4.png');
	this.load.image('usagrey', 'assets/usagrey.png');
	this.load.image('ground', 'assets/platform.png');
	this.load.spritesheet('hill', 'assets/hillsheet.png', 55, 140);
	this.load.spritesheet('don', 'assets/trumpsheet.png', 55, 140);
	this.load.spritesheet('bern', 'assets/bernsheet.png', 55, 140);
	this.load.spritesheet('recount', 'assets/recount.png', 800, 600);
	this.load.spritesheet('title', 'assets/titlePage.png', 800, 600);
	this.load.spritesheet('trumpwin', 'assets/trumpwin.png', 800, 600);
	this.load.spritesheet('bernwin', 'assets/bernwin.png', 800, 600);
	this.load.spritesheet('hillwin', 'assets/hillwin.png', 800, 600);
	this.load.spritesheet('intro', 'assets/instructionsheet.png', 800, 600);
	this.load.image('ballot', 'assets/ballot.png');
	this.load.image('lose', 'assets/youlose.png');
	this.load.image('email', 'assets/email.png');
	this.load.image('brick', 'assets/brick.png');
	this.load.image('fleft', 'assets/flameleft.png');
	this.load.image('fright', 'assets/flameright.png');
	this.load.image('chose', 'assets/choosescreen.png');
	this.load.image('donhead', 'assets/trumphead.png');
	this.load.image('hillhead', 'assets/hillhead.png');
	this.load.image('bernhead', 'assets/bernhead.png');
	this.load.image('dongrey', 'assets/trumpheadgrey.png');
	this.load.image('hillgrey', 'assets/hillheadgrey.png');
	this.load.image('berngrey', 'assets/berngrey.png');
	this.load.image('copy', 'assets/copyrightnotice.png');

	//audio (public domain songs and sound effects made courtesy of Bfxr
	this.load.audio('anthem', 'assets/audio/anthem.ogg');
	this.load.audio('french', 'assets/audio/french.ogg');
	this.load.audio('hymn', 'assets/audio/hymn.ogg');
	this.load.audio('jumpSound', 'assets/audio/Jump.ogg');
	this.load.audio('pickup', 'assets/audio/pickup.ogg');
	this.load.audio('select', 'assets/audio/select.ogg');
	this.load.audio('hurt', 'assets/audio/hurt.ogg');
	this.load.audio('fire', 'assets/audio/fire.ogg');

	//trump audio (not sure about the copyright circumstances of these so i'll comment them out)
	/*this.load.audio('rich', 'assets/audio/rich.ogg');
	this.load.audio('maga', 'assets/audio/maga.ogg');*/
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};