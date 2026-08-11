import { Link } from 'react-router-dom';

import { ButtonCustom } from 'shared/ui/ButtonCustom';

import s from './NotFoudPage.module.css';

export const NotFoundPage = () => {
	return (
		<div className={s.NotFoundPage}>
			<h1>Страница на найдена</h1>
			<Link to='/'>
				<ButtonCustom name='Перейти на главную' />
			</Link>
		</div>
	);
};
