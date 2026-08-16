export const submitReviewAction = async (
	prevState: any,
	formData: FormData
) => {
	const reviewText = formData.get('text');
	const rating = formData.get('rating');
	console.log('Отправка на сервер:', { reviewText, rating });
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return { success: true };
};
