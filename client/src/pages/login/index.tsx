import React from "react";
import { useIsAuth, userContext } from "../../hooks";
import { Auths as Auth } from "../../utils";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
	const [[email, password], setCredentials] = React.useState(["", ""]);

	const [loading, setLoading] = React.useState(false);

	const { user, setUser } = userContext.useUserContext();
	const { data, error } = useIsAuth();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (data) {
			setUser(data.data);
			navigate("/");
		} else if (error) {
			console.error(error);
		}
	}, [user, data, error]);

	const onUserCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data: response } = await Auth.loginUser({
				email,
				password,
			});
			setUser(response);
			navigate("/");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			className='w-72 absolute left-[calc(50%-144px)] top-[calc(50%-83px)]'
			onSubmit={onUserCreate}
		>
			<div>
				<label htmlFor='email' className='sr-only'>
					email
				</label>
				<input
					type='email'
					name=''
					id='email'
					className='w-full p-1 mb-2 outline-none bg-gray-200 focus:bg-gray-300'
					placeholder='email'
					onChange={(e) => setCredentials([e.currentTarget.value, password])}
				/>
			</div>
			<div>
				<label htmlFor='password' className='sr-only'>
					password
				</label>
				<input
					type='text'
					name='password'
					id='password'
					className='w-full p-1 mb-2 outline-none bg-gray-200 focus:bg-gray-300'
					placeholder='password'
					onChange={(e) => setCredentials([email, e.currentTarget.value])}
				/>
			</div>
			<div className='h-10'>
				<button
					disabled={loading}
					type='submit'
					className='w-full h-full flex justify-center items-center bg-indigo-600 text-white font-semibold hover:bg-indigo-500 disabled:bg-gray-500'
				>
					{loading ? "Loading" : "SignIn"}
				</button>
			</div>
		</form>
	);
};

export default SignIn;
