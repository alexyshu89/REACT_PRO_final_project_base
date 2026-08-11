import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';

import './styles/normalize.css';
import './styles/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { Sort } from 'features/Sort';

export const App = () => {
	return (
		<>
			<Header />
			<Sort />
			<Outlet />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<Footer />
		</>
	);
};
