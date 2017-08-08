var Baker = Baker || {};
//, { preload: preload, create: create, update: update }
Baker.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
Baker.choice = 0;
Baker.game.state.add('Boot', Baker.Boot);
Baker.game.state.add('PreLoad', Baker.PreLoad);
Baker.game.state.add('MainMenu', Baker.MainMenu);
Baker.game.state.add('Intro', Baker.Intro);
Baker.game.state.add('choose', Baker.Choose);
Baker.game.state.add('Game', Baker.Game);
Baker.game.state.add('Over', Baker.Over);
Baker.game.state.start('Boot');