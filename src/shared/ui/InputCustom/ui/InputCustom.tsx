type InputType =
	| 'text'
	| 'password'
	| 'email'
	| 'number'
	| 'tel'
	| 'url'
	| 'search'
	| 'checkbox'
	| 'radio'
	| 'date'
	| 'time'
	| 'datetime-local'
	| 'month'
	| 'week'
	| 'file'
	| 'color'
	| 'range'
	| 'hidden'
	| 'button'
	| 'submit'
	| 'reset'
	| 'image';

interface InputCustomProps {
	className: string;
	type: InputType | 'button' | 'reset';
	name?: string;
	id?: string;
	placeholder?: string;
	change?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string | number;
}

export const InputCustom: React.FC<InputCustomProps> = ({
	name,
	className,
	id,
	type,
	placeholder,
	value,
	change,
}) => {
	return (
		<input
			className={className}
			name={name}
			id={id}
			type={type}
			placeholder={placeholder}
			onChange={change}
			value={value}
		/>
	);
};
