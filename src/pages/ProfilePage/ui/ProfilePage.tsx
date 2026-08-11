import classNames from 'classnames';

import { ButtonBack } from 'shared/ui/ButtonBack';
import { ButtonCustom } from 'shared/ui/ButtonCustom';
import { WithProtection } from 'shared/store/HOCs/WithProtection';
import { InputCustom } from 'shared/ui/InputCustom';

import s from './ProfilePage.module.css';

export const ProfilePage = WithProtection(() => {
	return (
		<>
			<ButtonBack />
			<h1 className={s['form__title']}>Мои данные</h1>
			<form className={classNames(s['form'], s['form'])}>
				<div className={s['form__row']}>
					<label className={s['form__label']} htmlFor='name'>
						<InputCustom
							className={s['input']}
							name='name'
							id='name'
							type='text'
							placeholder='Введите ваше имя'
						/>
					</label>
					<label className={s['form__label']}>
						<InputCustom
							className={s['input']}
							name='about'
							id='about'
							type='text'
							placeholder='Описание профессии'
						/>
					</label>
				</div>
				<div className={s['form__row']}>
					<label className={s['form__label']}>
						<InputCustom
							className={s['input']}
							name='avatar'
							id='avatar'
							type='url'
							placeholder='Введите ссылку на аватарку'
						/>
					</label>
					<label className={s['form__label']}>
						<InputCustom
							className={s['input']}
							name='email'
							id='email'
							type='text'
							placeholder='email'
						/>
					</label>
				</div>

				<ButtonCustom
					name='Сохранить'
					type='submit'
					className={classNames(
						s['form__btn'],
						s['secondary'],
						s['maxContent']
					)}
				/>
			</form>
			<h2 className={s['form__title']}>Изменить пароль</h2>
			<form className={classNames(s['form'], s['form'])}>
				<div className={classNames(s['form__row'], s['form__row_min'])}>
					<label className={s['form__label']}>
						<InputCustom
							className={s['input']}
							name='password'
							id='password'
							type='password'
							placeholder='Пароль'
						/>
					</label>
				</div>
				<ButtonCustom
					name='Сохранить'
					type='submit'
					className={classNames(
						s['form__btn'],
						s['secondary'],
						s['maxContent']
					)}
				/>
			</form>
		</>
	);
});
