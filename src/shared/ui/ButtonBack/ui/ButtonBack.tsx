import { useNavigate } from 'react-router-dom';

import { ButtonCustom } from 'shared/ui/ButtonCustom';

import { ReactComponent as BackSvg } from './../../../assets/icons/back.svg';

export const ButtonBack = () => {
	const navigate = useNavigate();
	return (
		<ButtonCustom click={() => navigate(-1)}>
			<BackSvg />
		</ButtonCustom>
	);
};
