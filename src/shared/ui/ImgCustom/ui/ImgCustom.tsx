import waitingImg from 'shared/assets/images/waiting.png';

interface ImgCustomProps {
	images: string;
	alt: string;
	className?: string;
}

export const ImgCustom: React.FC<ImgCustomProps> = ({
	images,
	alt,
	className,
}) => {
	return (
		<img
			src={images || waitingImg}
			alt={alt}
			className={className}
			loading='lazy'
			onError={(e) => {
				e.currentTarget.src = waitingImg;
			}}
		/>
	);
};
