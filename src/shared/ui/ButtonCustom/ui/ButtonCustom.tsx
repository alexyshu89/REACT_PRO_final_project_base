import { MouseEventHandler, ReactNode, memo } from 'react';

interface ButtonCustomProps {
	className?: string;
	name?: string;
	click?: MouseEventHandler<HTMLButtonElement>;
	children?: ReactNode;
	type?: 'submit' | 'button' | 'reset';
	disabled?: boolean;
}

export const ButtonCustom = memo(
	({
		name,
		className,
		click,
		children,
		type,
		disabled = false,
	}: ButtonCustomProps) => {
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
	}
);
