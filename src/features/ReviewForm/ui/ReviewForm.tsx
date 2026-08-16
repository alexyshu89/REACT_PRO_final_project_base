import { useState, useActionState } from 'react';
import classNames from 'classnames';

import { Rating } from 'shared/ui/Rating';

import s from './ReviewForm.module.css';
import { submitReviewAction } from '../model/submitReviewAction';
import { ButtonCustom } from 'shared/ui/ButtonCustom';

export const ReviewForm = () => {
	const [rating, setRating] = useState(0);

	const [state, formAction, isPending] = useActionState(
		async (prevState: any, formData: FormData) => {
			const result = await submitReviewAction(prevState, formData);
			if (result.success) {
				setRating(0);
			}
			return result;
		},
		null
	);

	return (
		<form action={formAction} className={s['form']}>
			<Rating isEdit rating={rating} onChange={setRating} />

			<input type='hidden' name='rating' value={rating} />

			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				required
				disabled={isPending}></textarea>

			<ButtonCustom
				type='submit'
				className={classNames(s['form__btn'], s['primary'])}
				disabled={isPending}>
				{isPending ? 'Отправка...' : 'Отправить отзыв'}
			</ButtonCustom>
			{state?.success && (
				<p className={s['success-msg']}>Отзыв успешно отправлен!</p>
			)}
		</form>
	);
};
