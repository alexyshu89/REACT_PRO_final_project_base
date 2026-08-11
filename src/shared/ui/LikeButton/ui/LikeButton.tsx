import classNames from 'classnames';
import { toast } from 'react-toastify';

import { ButtonCustom } from 'shared/ui/ButtonCustom';

import { ReactComponent as LikeSvg } from './../../../assets/icons/like.svg';
import { useAppSelector } from '../../../store/utils';
import { userSelectors } from '../../../store/slices/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '../../../store/api/productsApi';

import s from './LikeButton.module.css';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = product?.likes.some((l) => l.userId === user?.id);

	const toggleLike = async () => {
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
	};

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
