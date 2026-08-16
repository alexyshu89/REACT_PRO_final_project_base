import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { ButtonCustom } from 'shared/ui/ButtonCustom';
import { cartActions } from 'shared/store/slices/cart';
import { ReactComponent as TrashIcon } from 'shared/assets/icons/trash.svg';
import { ImgCustom } from 'shared/ui/ImgCustom';

import { CartCounter } from 'features/Cart';

import s from './CartItem.module.css';
import { useState } from 'react';
import { Modal } from 'shared/ui/Modal/ui/Modal';

type CartItemProps = {
	product: CartProduct;
};
export const CartItem = ({ product }: CartItemProps) => {
	const dispatch = useDispatch();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const { id, name, images, price, discount } = product;

	const handleDelete = () => {
		dispatch(cartActions.deleteCartProduct(id));
		setIsDeleteOpen(false);
	};

	const handleCloseModal = () => {
		setIsDeleteOpen(false);
	};

	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<ImgCustom
					images={images}
					alt={name}
					className={classNames(s['cart-item__image'])}
				/>

				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
						<Link
							className={classNames(s['cart-item__title'])}
							to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<CartCounter productId={id} />

							<div className={classNames(s['cart-item__price'])}>
								<div className={classNames(s['price-big'], s['price-wrap'])}>
									<span
										className={classNames(s['price_old'], s['price_right'])}>
										{price}
									</span>
									<span className={classNames(s['price_discount'], s['price'])}>
										{price - discount}
									</span>
								</div>
							</div>
						</div>
						<ButtonCustom className={classNames(s['cart-item__bnt-trash'])}>
							<TrashIcon onClick={() => setIsDeleteOpen(true)} />
						</ButtonCustom>
						<Modal isOpen={isDeleteOpen} onClose={handleCloseModal}>
							<div className={s.modalBody}>
								<p>Вы уверены, что хотите удалить товар?</p>
								<div className={s.actions}>
									<ButtonCustom
										className={`${s.btn} ${s.cancel}`}
										click={handleCloseModal}>
										Отмена
									</ButtonCustom>
									<ButtonCustom
										className={`${s.btn} ${s.confirm}`}
										click={handleDelete}>
										Да, удалить
									</ButtonCustom>
								</div>
							</div>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
};
