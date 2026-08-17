import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useMemo, useTransition, useOptimistic } from 'react';

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

	const [isPending, startTransition] = useTransition();

	const isLike = useMemo(
		() => product?.likes.some((l) => l.userId === user?.id),
		[product, user]
	);

	const [optimisticIsLike, toggleOptimisticLike] = useOptimistic(
		isLike,
		(currentState, nextState: boolean) => nextState
	);

	const toggleLike = () => {
		if (isPending) return;

		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		startTransition(async () => {
			toggleOptimisticLike(!isLike);

			try {
				if (isLike) {
					await deleteLike({ id: `${product.id}` }).unwrap();
				} else {
					await setLike({ id: `${product.id}` }).unwrap();
				}
			} catch (error: any) {
				const errorData = error as IErrorResponse;
				toast.error(errorData?.data?.message || 'Что-то пошло не так');
			}
		});
	};

	return (
		<ButtonCustom
			className={classNames(s['card__favorite'], {
				[s['card__favorite_loading']]: optimisticIsLike && isPending,
				[s['card__favorite_is-active']]: optimisticIsLike && !isPending,
			})}
			click={toggleLike}>
			<LikeSvg />
		</ButtonCustom>
	);
};
