import { useEffect, useRef, ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerElementRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			triggerElementRef.current = document.activeElement as HTMLElement;

			setTimeout(() => {
				closeButtonRef.current?.focus();
			}, 0);

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					onClose();
				}
			};

			document.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';

			return () => {
				document.removeEventListener('keydown', handleKeyDown);
				document.body.style.overflow = '';

				triggerElementRef.current?.focus();
			};
		}
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const modalRoot = document.getElementById('modal-root');
	if (!modalRoot) return null;

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return createPortal(
		<div
			className={s.overlay}
			onClick={handleOverlayClick}
			role='dialog'
			aria-modal='true'>
			<div className={s.content}>
				<button
					ref={closeButtonRef}
					className={s.closeBtn}
					onClick={onClose}
					aria-label='Закрыть модальное окно'>
					✖️
				</button>
				{children}
			</div>
		</div>,
		modalRoot
	);
};
