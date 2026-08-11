import classNames from 'classnames';

import { ButtonCustom } from 'shared/ui/ButtonCustom';
import { InputCustom } from 'shared/ui/InputCustom';

import { useCount } from '../hooks/useCount';
import { useAddToCart } from '../../../hooks/useAddToCart';

import s from './ProductCartCounter.module.css';

type ProductCartCounterProps = {
	product: Product;
};
export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
	const { count, handleCount, handleCountMinus, handleCountPlus } = useCount();
	const { addProductToCart } = useAddToCart();

	return (
		<div className={classNames('product__btn-wrap')}>
			<div className={s['button-count']}>
				<ButtonCustom
					name='-'
					className={s['button-count__minus']}
					click={handleCountMinus}
				/>
				<InputCustom
					type='number'
					className={s['button-count__num']}
					value={count}
					change={handleCount}
				/>
				<ButtonCustom
					name='+'
					className={s['button-count__plus']}
					click={handleCountPlus}
				/>
			</div>
			<ButtonCustom
				name='В корзину'
				click={() => addProductToCart({ ...product, count })}
				className={classNames(s['button'], s['button_type_primary'])}
			/>
		</div>
	);
};
