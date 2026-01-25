import {differenceInDays} from 'date-fns';
import z from 'zod';

import {MIN_DATE, MAX_DATE} from './constants';


export const schema = z
	.object({
		dateStart: z.date().min(MIN_DATE),
		dateEnd: z.date().max(MAX_DATE),
	})
	.refine(({dateStart, dateEnd}) => {
		return dateStart < dateEnd;
	}, {error: 'Start date must be before end date', abort: true})
	.refine(({dateStart, dateEnd}) => {
		return differenceInDays(dateEnd, dateStart) > 1;
	}, {error: 'The range between dates must be at least 1 day'});

export type FormData = z.infer<typeof schema>;
