import { Link } from "react-router-dom";
import { userContext, searchContext } from "../../hooks";
import React from "react";

const Navbar = () => {
	const { user, setUser } = userContext.useUserContext();
	const { setSearchParams } = searchContext.useSearchContext();

	const onLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setUser({ name: "", email: "", createdAt: new Date() });
	};

	return (
		<nav className='md:w-5/6 mx-auto flex items-center p-1'>
			<div className='flex-[2]'>
				<label htmlFor='searchParams' className='sr-only'>
					Search
				</label>
				<input
					type='text'
					name='searchParams'
					id='searchParams'
					placeholder='Search notes'
					className='w-full h-10 px-1 rounded-md outline-none hover:bg-gray-100/70 focus:bg-gray-100'
					onChange={(e) => setSearchParams(e.currentTarget.value)}
				/>
			</div>
			<div className='flex flex-1 justify-end gap-6'>
				<div className='text-center capitalize text-gray-500'>
					Hello, {user.name.split(" ")[0]}!
				</div>
				<div className=''>
					<button
						onClick={onLogout}
						className='text-red-500 hover:underline underline-offset-4'
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
