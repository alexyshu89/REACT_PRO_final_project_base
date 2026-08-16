import { useState, ChangeEvent, useCallback } from 'react';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useProductCount = () => {
	const [count, setCount] = useState(1);

	const handleCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const newCount = +e.target.value;
		const validCount =
			newCount > MAX_COUNT
				? MAX_COUNT
				: newCount < MIN_COUNT
				? MIN_COUNT
				: newCount;
		setCount(validCount);
	}, []);

	const handleCountMinus = useCallback(() => {
		const newCount = count - 1;
		const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
		setCount(validCount);
	}, [count]);

	const handleCountPlus = useCallback(() => {
		const newCount = count + 1;
		const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
		setCount(validCount);
	}, [count]);

	return { count, handleCount, handleCountMinus, handleCountPlus };
};
