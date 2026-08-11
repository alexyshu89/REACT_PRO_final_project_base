import { WithProtection } from 'shared/store/HOCs/WithProtection';

import { SignInForm } from 'features/Auth';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
