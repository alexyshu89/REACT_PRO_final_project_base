import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

import { ButtonCustom } from 'shared/ui/ButtonCustom';

import { ReactComponent as BackSvg } from './../../../assets/icons/back.svg';

export const ButtonBack = memo(() => {
	const navigate = useNavigate();
	return (
		<ButtonCustom click={() => navigate(-1)}>
			<BackSvg />
		</ButtonCustom>
	);
});
