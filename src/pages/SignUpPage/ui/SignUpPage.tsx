import { SignUpForm } from 'features/Auth/ui/SignUpForm';

import { WithProtection } from 'shared/store/HOCs/WithProtection';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
