import React from "react";
import {
	useIsAuth,
	userContext,
	notesContext,
	searchContext,
} from "../../hooks";
import { Notes, Filter } from "../../utils";
import { Card } from "../../components";
import { Link } from "react-router-dom";

const Home = () => {
	const { data, error } = useIsAuth();
	const { setUser } = userContext.useUserContext();
	const { notes, setNotes } = notesContext.useNotesContext();
	const { searchParams } = searchContext.useSearchContext();

	const [notesState, setNotesState] = React.useState<NotesResponse["data"]>([]);

	React.useEffect(() => {
		if (data) {
			setUser(data.data);
		} else if (error) {
			console.error(error);
		}
	}, [data, error]);

	React.useEffect(() => {
		(async () => {
			const response = await Notes.getAllNotes();
			setNotes(response);
		})();
	}, []);

	React.useEffect(() => {
		filterSearch();
	}, [searchParams, notes]);

	const filterSearch = () => {
		if (searchParams.length <= 0) {
			setNotesState([...notes.data]);
		} else {
			setNotesState(
				notes.data.filter((item) =>
					item.title.toLowerCase().includes(searchParams.toLowerCase())
				)
			);
		}
	};

	const changeFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		const tagsButton = document.querySelectorAll(".tags-btn");

		tagsButton.forEach((btn) => {
			if (btn.innerHTML === e.currentTarget.innerText) {
				btn.classList.add("active-tags-btn");
			} else {
				btn.classList.remove("active-tags-btn");
			}
		});

		setNotesState(Filter(notes.data, e.currentTarget.innerText.toLowerCase()));
	};

	return (
		<div className='md:w-5/6 mx-auto pl-2 pr-1'>
			<div className='flex justify-between pb-6 text-sm'>
				<div>
					<button
						aria-valuetext='All'
						onClick={(e) => changeFilter(e)}
						className='tags-btn active-tags-btn'
					>
						All
					</button>
					<button
						aria-valuetext='Today'
						onClick={(e) => changeFilter(e)}
						className='tags-btn'
					>
						Today
					</button>
					<button
						aria-valuetext='Earlier'
						onClick={(e) => changeFilter(e)}
						className='tags-btn'
					>
						Earlier
					</button>
				</div>
				<div>
					<Link
						to='/create'
						className='text-indigo-600 hover:underline underline-offset-4'
					>
						Create New Note
					</Link>
				</div>
			</div>
			<div className='w-full flex flex-wrap gap-6'>
				{notesState.map((item) => (
					<Card {...item} key={item._id} />
				))}
			</div>
		</div>
	);
};
export default Home;
