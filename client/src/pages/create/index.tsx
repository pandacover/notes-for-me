import React from "react";
import { Notes } from "../../utils";
import { notesContext } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Create = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(false);
	const [[title, instrumental, content], setContent] = React.useState([
		"",
		"",
		"",
	]);

	const { notes, setNotes } = notesContext.useNotesContext();

	const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Tab") {
			e.preventDefault();
			const start = e.currentTarget.selectionStart;
			const end = e.currentTarget.selectionEnd;
			const prevContent = e.currentTarget.value;

			e.currentTarget.value =
				prevContent.substring(0, start) + "    " + prevContent.substring(end);
		}
	};

	const onCreateNotes = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await Notes.createNote({
				title,
				instrumental,
				content,
				createdAt: new Date(),
			});
			setNotes({
				message: response.message,
				data: [...notes.data, response.data],
			});
			navigate("/");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className='h-full w-full px-2 pt-6' onSubmit={onCreateNotes}>
			<div className='text-xl font-black uppercase text-center mb-4'>
				Create Note
			</div>
			<div className=''>
				<label htmlFor='' className='sr-only'></label>
				<input
					type='text'
					name=''
					id=''
					className='w-full px-1 py-2 mb-2 outline-none bg-gray-200 focus-within:bg-gray-300'
					placeholder='Title'
					onChange={(e) =>
						setContent([e.currentTarget.value, instrumental, content])
					}
				/>
			</div>
			<div className=''>
				<label htmlFor='' className='sr-only'></label>
				<input
					type='text'
					name=''
					id=''
					className='w-full px-1 py-2 mb-2 outline-none bg-gray-200 focus-within:bg-gray-300'
					placeholder='Instrumental link'
					onChange={(e) => setContent([title, e.currentTarget.value, content])}
				/>
			</div>
			<div className='h-[calc(100%-30vh)] mb-2'>
				<label htmlFor='' className='sr-only'></label>
				<textarea
					onKeyDown={(e) => onKeyPress(e)}
					name=''
					id=''
					className='w-full h-full px-1 py-2 mb-2 outline-none bg-gray-200 focus-within:bg-gray-300'
					placeholder='Content'
					onChange={(e) =>
						setContent([title, instrumental, e.currentTarget.value])
					}
				/>
			</div>
			<div>
				<button
					type='submit'
					className='w-full flex justify-center items-center bg-indigo-600 text-white py-3 hover:bg-opacity-90'
				>
					{loading ? "Loading" : "Save"}
				</button>
			</div>
		</form>
	);
};

export default Create;
