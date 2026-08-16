import { Alert, CircularProgress, Stack } from '@mui/material';
import { useRef } from 'react';

import { useLoadMore } from '../hooks/useLoadMore';

export const LoadMore = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { isEndOfList, isFetching } = useLoadMore({
		ref: ref as React.RefObject<HTMLDivElement>,
	});
	return (
		<Stack
			ref={ref}
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ my: 5 }}>
			{isFetching && <CircularProgress />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	);
};
