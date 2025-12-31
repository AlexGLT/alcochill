import {useLayoutEffect, useMemo} from 'react';
import {useUnit} from 'effector-react';
import {addDays, addYears, isValid} from 'date-fns';

import {useQuery} from '@tanstack/react-query';
import {getVideosListByRangeFx} from '@shared/api/random-videos';

import {Player} from './ui';
import {model} from './model';

import styles from './styles.module.scss';

import type {FC} from 'react';
import type {Video} from '@shared/api/random-videos';


const TODAY = Date.now();

const EMPTY_LIST: Array<Video> = [];

export const PageView: FC = () => {
	const {
		getVideosListByRange,
		updateVideosInfo,
	} = useUnit({
		updateVideosInfo: model.videosListFetched,
		getVideosListByRange: getVideosListByRangeFx,
	});

	const searchParams = useMemo(() => {
		const from = undefined;
		const to = TODAY;

		const dateEnd = isValid(to)
			? addDays(to, 1)
			: addDays(TODAY, 1);

		// eslint-disable-next-line typescript/no-unnecessary-condition
		const dateStart = from && isValid(from)
			? new Date(from)
			: addYears(dateEnd, -1);

		return {
			dateStart: dateStart.toISOString().split('T')[0]!,
			dateEnd: dateEnd.toISOString().split('T')[0]!,
		};
	}, []);

	const {data = EMPTY_LIST} = useQuery({
		queryKey: ['videos'],
		queryFn: ({signal}) => getVideosListByRange({
			meta: searchParams,
			options: {signal},
		}),
	});

	useLayoutEffect(() => {
		updateVideosInfo(data);
	}, [data, updateVideosInfo]);

	return (
		<main className={styles.main}>
			<Player/>
		</main>
	);
};
