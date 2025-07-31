import {nanoid} from 'nanoid';


const RANDOM_MEMES_LINK = 'https://840ca558-80be-454c-8a82-9170ec14b807.pub.instances.scw.cloud:8000';

const API_KEY = 'X-API-KEY';
const SESSION_KEY_HEADER = 'X-SESSION-ID';

const SESSION_KEY = nanoid();

export const getRandomVideo = (): Promise<Response> => fetch(`${RANDOM_MEMES_LINK}/api/v1/random-video`, {
	headers: {
		[API_KEY]: localStorage.API_KEY as string,
		[SESSION_KEY_HEADER]: SESSION_KEY,
	},
});
