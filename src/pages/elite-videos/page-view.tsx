import {useLayoutEffect, useMemo} from 'react';
import {useUnit} from 'effector-react';
import {addDays, addYears, isValid} from 'date-fns';
import {FaFileCircleXmark} from 'react-icons/fa6';

import {Skeleton} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {getVideosListByRangeFx} from '@shared/api/random-videos';
import EmptyState from '@shared/ui/empty-state';

import {Player} from './ui';
import {model} from './model';

import styles from './styles.module.scss';

import type {FC, ReactNode} from 'react';


const TODAY = Date.now();

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

	const {isPending, data} = useQuery({
		queryKey: ['videos'],
		queryFn: ({signal}) => getVideosListByRange({
			meta: searchParams,
			options: {signal},
		}),
	});

	useLayoutEffect(() => {
		updateVideosInfo(data || []);
	}, [data, updateVideosInfo]);

	const renderView = (): ReactNode => {
		if (isPending) {
			return (
				<Skeleton
					variant="shine"
					width="100%"
					height="100%"
				/>
			);
		}

		if (!data?.length) {
			return (
				<EmptyState
					size="lg"
					title="No videos found"
					description="Try adjusting your search criteria"
					icon={<FaFileCircleXmark/>}
				/>
			);
		}

		return <Player/>;
	};

	return (
		<main className={styles.main}>
			{renderView()}
		</main>
	);
};
