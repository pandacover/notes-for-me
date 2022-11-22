import { Link } from "react-router-dom";

const Card = ({ _id, title, content, createdAt }: NotesType) => {
	const date = new Date(createdAt).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	return (
		<div className='w-[250px] aspect-square shadow-lg py-1 px-2 rounded-sm'>
			<div className='text-xs text-gray-500'>{date}</div>
			<div className='w-full text-ellipsis overflow-hidden whitespace-nowrap pt-2 font-semibold'>
				{title}
			</div>
			<div className='text-sm content-box'>{content}</div>
			<div className='mt-2'>
				<Link to={`/note/${_id}`} className='text-xs hover:text-indigo-600'>
					Read more {">"}
				</Link>
			</div>
		</div>
	);
};

export default Card;
