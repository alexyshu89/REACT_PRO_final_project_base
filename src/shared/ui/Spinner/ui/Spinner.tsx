import classNames from 'classnames';
import { memo } from 'react';

import s from './Spinner.module.css';

export const Spinner = memo(() => {
	return (
		<div className={classNames(s['wrapper'])}>
			<div className={classNames(s['loader'])}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
});
