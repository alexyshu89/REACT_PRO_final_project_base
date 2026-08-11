import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ButtonCustom } from 'shared/ui/ButtonCustom';
import waitingImg from 'shared/assets/images/waiting.png';

import { Price } from '../../Price/ui/Price';
import { LikeButton } from '../../LikeButton';
import { useAppSelector } from '../../../store/utils';
import { cartSelectors } from '../../../store/slices/cart';
import { useAddToCart } from '../../../hooks/useAddToCart';
import { CartCounter } from '../../CartCounter';

import s from './Card.module.css';

type CardProps = {
	product: Product;
};
export const Card = ({ product }: CardProps) => {
	const { discount, price, name, tags, id, images } = product;
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const isProductInCart = cartProducts.some((p) => p.id === id);
	const { addProductToCart } = useAddToCart();

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img
					src={images || waitingImg}
					alt={name}
					className={s['card__image']}
					loading='lazy'
					onError={(e) => {
						e.currentTarget.src = waitingImg;
					}}
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<ButtonCustom
					name='В корзину'
					click={() => addProductToCart({ ...product, count: 1 })}
					disabled={isProductInCart}
					className={classNames(
						s['card__cart'],
						s['card__btn'],
						s['card__btn_type_primary']
					)}
				/>
			)}
		</article>
	);
};
