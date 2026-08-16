import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useMemo, useCallback } from 'react';

import { ButtonCustom } from 'shared/ui/ButtonCustom';
import { useAppSelector } from 'shared/store/utils';
import { userSelectors } from 'shared/store/slices/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from 'shared/store/api/productsApi';
import { ReactComponent as LikeSvg } from 'shared/assets/icons/like.svg';

import s from './LikeButton.module.css';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = useMemo(
		() => product?.likes.some((l) => l.userId === user?.id),
		[product, user]
	);

	const toggleLike = useCallback(async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}
		let response;
		if (isLike) {
			response = await deleteLike({ id: `${product.id}` });
		} else {
			response = await setLike({ id: `${product.id}` });
		}

		if (response.error) {
			const error = response.error as IErrorResponse;
			toast.error(error.data.message);
		}
	}, [accessToken, isLike, product, setLike, deleteLike]);

	return (
		<ButtonCustom
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: isLike,
			})}
			click={toggleLike}>
			<LikeSvg />
		</ButtonCustom>
	);
};
