import { WithProtection } from 'shared/store/HOCs/WithProtection';
import { WithQuery } from 'shared/store/HOCs/WithQuery';
import { LoadMore } from 'shared/ui/LoadMore';
import { useProducts } from 'shared/store/hooks/useProducts';

import { CardList } from 'widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
