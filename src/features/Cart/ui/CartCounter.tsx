import classNames from 'classnames';

import { ButtonCustom } from 'shared/ui/ButtonCustom';
import { InputCustom } from 'shared/ui/InputCustom';

import { useCount } from '../hooks/useCount';

import s from './CartCounter.module.css';

type TCartCounter = {
	productId: string;
};

export const CartCounter = ({ productId }: TCartCounter) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCount(productId);

	return (
		<>
			<div className={classNames(s['button-count'])}>
				<ButtonCustom
					name='-'
					click={handleDecrement}
					className={classNames(s['button-count__minus'])}
				/>

				<InputCustom
					change={handleSetCount}
					type='number'
					className={classNames(s['button-count__num'])}
					value={count}
				/>
				<ButtonCustom
					name='+'
					click={handleIncrement}
					className={classNames(s['button-count__plus'])}
					disabled={count >= stock}
				/>
			</div>
		</>
	);
};
