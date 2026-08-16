import waitingImg from 'shared/assets/images/waiting.png';
import { memo } from 'react';

interface ImgCustomProps {
	images: string;
	alt: string;
	className?: string;
}

export const ImgCustom = memo(({ images, alt, className }: ImgCustomProps) => {
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
});
