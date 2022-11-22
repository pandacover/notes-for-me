export default function Spinner() {
	return (
		<div className='absolute flex left-0 top-0 justify-center items-center w-screen h-screen'>
			<div className='animate-spin w-12 h-12 rounded-full border-8 border-t-black border-l-black border-b-indigo-600 border-r-indigo-600 border-dotted' />
		</div>
	);
}
