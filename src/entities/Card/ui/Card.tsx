import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ButtonCustom } from 'shared/ui/ButtonCustom';
import { ImgCustom } from 'shared/ui/ImgCustom';
import { Price } from 'shared/ui/Price/ui/Price';
import { LikeButton } from 'features/LikeButton';
import { useAppSelector } from 'shared/store/utils';
import { cartSelectors } from 'shared/store/slices/cart';
import { useAddToCart } from 'shared/hooks/useAddToCart';

import { CartCounter } from 'features/Cart';

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
				<ImgCustom images={images} alt={name} className={s['card__image']} />
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
