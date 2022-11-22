import { Routes, Route } from "react-router-dom";
import { Create, Home, SignIn, SignUp, Notes } from "../pages";
import { Suspense, lazy } from "react";
import { Spinner } from "../components";

const LazyHome = lazy(() => import("../pages/home"));
const LazyNotes = lazy(() => import("../pages/notes"));

const AppRoutes = () => (
	<Routes>
		<Route path='/signup' element={<SignUp />} />
		<Route path='/signin' element={<SignIn />} />
		<Route
			path='/'
			element={
				<Suspense fallback={<Spinner />}>
					<LazyHome />
				</Suspense>
			}
		/>
		<Route path='/create' element={<Create />} />
		<Route
			path='/note/:id'
			element={
				<Suspense fallback={<Spinner />}>
					<LazyNotes />
				</Suspense>
			}
		/>
	</Routes>
);

export default AppRoutes;
