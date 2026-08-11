import { MouseEventHandler, ReactNode } from 'react';

interface ButtonCustomProps {
	className?: string;
	name?: string;
	click?: MouseEventHandler<HTMLButtonElement>;
	children?: ReactNode;
	type?: 'submit' | 'button' | 'reset';
	disabled?: boolean;
}

export const ButtonCustom: React.FC<ButtonCustomProps> = ({
	name,
	className,
	click,
	children,
	type,
	disabled = false,
}) => {
	return (
		<button
			type={type ?? 'button'}
			className={className}
			onClick={click}
			disabled={disabled}>
			{name && <span>{name}</span>}
			{children}
		</button>
	);
};
