export const SOUNDS = [
	{src: '/audio/bell.mp3', label: 'Bell'},
	{src: '/audio/fart.mp3', label: 'Fart'},
	{src: '/audio/goofy.mp3', label: 'Goofy'},
	{src: '/audio/metal-pipe.mp3', label: 'Metal Pipe'},
	{src: '/audio/ring.mp3', label: 'Ring'},
	{src: '/audio/vine.mp3', label: 'Vine'},
	{src: '/audio/error.mp3', label: 'Error'},
	{src: '/audio/uwu.mp3', label: 'uwu'},
	{src: '/audio/emotional-damage.mp3', label: 'Emotional Damage'},
	{src: '/audio/wait-what.mp3', label: 'Wait What'},
	{src: '/audio/violin.mp3', label: 'Violin'},
	{src: '/audio/sponge-bob.mp3', label: 'Sponge Bob'},
	{src: '/audio/to-be-continued.mp3', label: 'To Be Continued'},
	{src: '/audio/lets-go.mp3', label: 'Let\'s Go'},
	{src: '/audio/evil-morty.mp3', label: 'Evil Morty'},
	{src: '/audio/among-us.mp3', label: 'Among Us'},
	{src: '/audio/black-magic.mp3', label: 'Black Magic'},
	{src: '/audio/20-century-fox.mp3', label: '20 Century Fox'},
	{src: '/audio/wasted.mp3', label: 'Wasted'},
	{src: '/audio/ultra-instinct.mp3', label: 'Ultra Instinct'},
	{src: '/audio/skeleton.mp3', label: 'Skeleton'},
	{src: '/audio/eating.mp3', label: 'Eating'},
	{src: '/audio/coffin-dance.mp3', label: 'Coffin Dance'},
	{src: '/audio/indian.mp3', label: 'Indian'},
	{src: '/audio/android.mp3', label: 'Android'},
	{src: '/audio/ahhhhh.mp3', label: 'ahhhhhh'},
	{src: '/audio/sushi.mp3', label: 'Sushi'},
	{src: '/audio/amogus.mp3', label: 'Amogus'},
	{src: '/audio/john-cena.mp3', label: 'John Cena'},
	{src: '/audio/classic.mp3', label: 'Classic'},
	{src: '/audio/better-call-saul.mp3', label: 'Better Call Saul'},
	{src: '/audio/chipi-chipi.mp3', label: 'Chipi chipi'},
	{src: '/audio/darth-vader.mp3', label: 'Darth Vader'},
	{src: '/audio/fuzzbear.mp3', label: 'Fuzzbear'},
	{src: '/audio/god.mp3', label: 'God'},
	{src: '/audio/happy.mp3', label: 'Happy'},
	{src: '/audio/hello.mp3', label: 'Hello'},
	{src: '/audio/parlament.mp3', label: 'Parlament'},
	{src: '/audio/pollka.mp3', label: 'Pollka'},
	{src: '/audio/respect.mp3', label: 'Respect'},
	{src: '/audio/run.mp3', label: 'Run'},
	{src: '/audio/scream.mp3', label: 'Scream'},
	{src: '/audio/shit.mp3', label: 'Shit'},
	{src: '/audio/sigma.mp3', label: 'Sigma'},
	{src: '/audio/toothless.mp3', label: 'Toothless'},
	{src: '/audio/toyota.mp3', label: 'Toyota'},
	{src: '/audio/victory.mp3', label: 'Victory'},
	{src: '/audio/yamete-kudasai.mp3', label: 'Yamete Kudasai'},
] as const;

// @ts-expect-error WHY: temp
window.dangerZones = {
	ROTATE: 'ROTATE',
	LINE: 'LINE',
	BACKGROUND: 'BACKGROUND',
};

// @ts-expect-error WHY: temp
window.dangerZonesEnabled = {
	ROTATE: true,
	LINE: false,
	BACKGROUND: false,
};

// @ts-expect-error WHY: temp
window.toggleDangerZone = (dangerZone: string) => {
	// @ts-expect-error WHY: temp
	if (dangerZone in window.dangerZones) {
		// @ts-expect-error WHY: temp
		window.dangerZonesEnabled[dangerZone] = !window.dangerZonesEnabled[dangerZone]; // eslint-disable-line typescript/no-unsafe-member-access
	}
};
