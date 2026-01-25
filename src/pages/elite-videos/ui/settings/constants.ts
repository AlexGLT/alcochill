import {parseISO, addDays} from 'date-fns';


export const MIN_DATE = parseISO('2022-01-01');
export const MAX_DATE = addDays(new Date(), 1);
