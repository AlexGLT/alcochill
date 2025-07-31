import type {Values} from '@shared/types/core';


export const SOUND = {
	BELL: '/audio/bell.mp3',
	FART: '/audio/fart.mp3',
	GOOFY: '/audio/goofy.mp3',
	METAL_PIPE: '/audio/metal-pipe.mp3',
	RING: '/audio/ring.mp3',
	VINE: '/audio/vine.mp3',
	ERROR: '/audio/error.mp3',
	uwu: '/audio/uwu.mp3',
	EMOTIONAL_DAMAGE: '/audio/emotional-damage.mp3',
	WAIT_WHAT: '/audio/wait-what.mp3',
	VIOLIN: '/audio/violin.mp3',
	SPONGE_BOB: '/audio/sponge-bob.mp3',
	TO_BE_CONTINUED: '/audio/to-be-continued.mp3',
	LETS_GO: '/audio/lets-go.mp3',
	EVIL_MORTY: '/audio/evil-morty.mp3',
	AMONG_US: '/audio/among-us.mp3',
	BLACK_MAGIC: '/audio/black-magic.mp3',
	TWENTY_CENTURY_FOX: '/audio/20-century-fox.mp3',
	WASTED: '/audio/wasted.mp3',
	ULTRA_INSTINCT: '/audio/ultra-instinct.mp3',
	SKELETON: '/audio/skeleton.mp3',
	EATING: '/audio/eating.mp3',
	COFFIN_DANCE: '/audio/coffin-dance.mp3',
	INDIAN: '/audio/indian.mp3',
	ANDROID: '/audio/android.mp3',
	AHHHHH: '/audio/ahhhhh.mp3',
	SUSHI: '/audio/sushi.mp3',
	AMOGUS: '/audio/amogus.mp3',
	JOHN_CENA: '/audio/john-cena.mp3',
	CLASSIC: '/audio/classic.mp3',
	BETTER_CALL_SAUL: '/audio/better-call-saul.mp3',
	CHIPI_CHIPI: '/audio/chipi-chipi.mp3',
	DARTH_VADER: '/audio/darth-vader.mp3',
	FUZZBEAR: '/audio/fuzzbear.mp3',
	GOD: '/audio/god.mp3',
	HAPPY: '/audio/happy.mp3',
	HELLO: '/audio/hello.mp3',
	PARLAMENT: '/audio/parlament.mp3',
	POLLKA: '/audio/pollka.mp3',
	RESPECT: '/audio/respect.mp3',
	RUN: '/audio/run.mp3',
	SCREAM: '/audio/scream.mp3',
	SHIT: '/audio/shit.mp3',
	SIGMA: '/audio/sigma.mp3',
	TOOTHLESS: '/audio/toothless.mp3',
	TOYOTA: '/audio/toyota.mp3',
	VICTORY: '/audio/victory.mp3',
	YAMETE_KUDASAI: '/audio/yamete-kudasai.mp3',
} as const;

export type Sound = Values<typeof SOUND>;

export const SOUND_LABEL: Record<Sound, string> = {
	[SOUND.BELL]: 'Bell',
	[SOUND.FART]: 'Fart',
	[SOUND.GOOFY]: 'Goofy',
	[SOUND.METAL_PIPE]: 'Metal Pipe',
	[SOUND.RING]: 'Ring',
	[SOUND.VINE]: 'Vine',
	[SOUND.ERROR]: 'Error',
	[SOUND.uwu]: 'uwu',
	[SOUND.EMOTIONAL_DAMAGE]: 'Emotional Damage',
	[SOUND.WAIT_WHAT]: 'Wait What',
	[SOUND.VIOLIN]: 'Violin',
	[SOUND.SPONGE_BOB]: 'Sponge Bob',
	[SOUND.TO_BE_CONTINUED]: 'to be Continued',
	[SOUND.LETS_GO]: 'Let\'s GO',
	[SOUND.EVIL_MORTY]: 'Evil Morty',
	[SOUND.AMONG_US]: 'Among Us',
	[SOUND.BLACK_MAGIC]: 'Black Magic',
	[SOUND.TWENTY_CENTURY_FOX]: '20 Century Fox',
	[SOUND.WASTED]: 'Wasted',
	[SOUND.ULTRA_INSTINCT]: 'Ultra Instinct',
	[SOUND.SKELETON]: 'Skeleton',
	[SOUND.EATING]: 'Eating',
	[SOUND.AMOGUS]: 'Amogus',
	[SOUND.JOHN_CENA]: 'Dried Herb',
	[SOUND.COFFIN_DANCE]: 'Coffin Dance',
	[SOUND.INDIAN]: 'Indian',
	[SOUND.ANDROID]: 'Android',
	[SOUND.AHHHHH]: 'ahhhhhh',
	[SOUND.SUSHI]: 'Sushi',
	[SOUND.CLASSIC]: 'Classic',
	[SOUND.BETTER_CALL_SAUL]: 'Better Call Saul',
	[SOUND.CHIPI_CHIPI]: 'Chipi chipi',
	[SOUND.DARTH_VADER]: 'Darth Vader',
	[SOUND.FUZZBEAR]: 'Fuzzbear',
	[SOUND.GOD]: 'God',
	[SOUND.HAPPY]: 'Happy',
	[SOUND.HELLO]: 'Hello',
	[SOUND.PARLAMENT]: 'Parlament',
	[SOUND.POLLKA]: 'Pollka',
	[SOUND.RESPECT]: 'Respect',
	[SOUND.RUN]: 'Run',
	[SOUND.SCREAM]: 'Scream',
	[SOUND.SHIT]: 'Shit',
	[SOUND.SIGMA]: 'Sigma',
	[SOUND.TOOTHLESS]: 'Toothless',
	[SOUND.TOYOTA]: 'Toyota',
	[SOUND.VICTORY]: 'Victory',
	[SOUND.YAMETE_KUDASAI]: 'Yamete Kudasai',
};

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
		window.dangerZonesEnabled[dangerZone] = !window.dangerZonesEnabled[dangerZone];
	}
};
