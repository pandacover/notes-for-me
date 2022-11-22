import Routes from "./routes";
import React from "react";
import { userContext, notesContext, searchContext } from "./hooks";
import Navbar from "./components/navbar";
import { useLocation } from "react-router-dom";

const App = () => {
	const [user, setUser] = React.useState<Omit<UserType, "password">>({
		name: "",
		email: "",
		createdAt: new Date(),
	});

	const [notes, setNotes] = React.useState<NotesResponse>({
		message: "",
		data: [],
	});

	const [searchParams, setSearchParams] = React.useState("");

	const params = useLocation();
	const [toggleNav, setToggleNav] = React.useState(false);

	React.useEffect(() => {
		setToggleNav(params.pathname !== "/");
	}, [params]);

	return (
		<userContext.UserContext.Provider value={{ user, setUser }}>
			<notesContext.NotesContext.Provider value={{ notes, setNotes }}>
				<searchContext.SearchContext.Provider
					value={{ searchParams, setSearchParams }}
				>
					<div className='w-screen max-w-[1368px] h-screen mx-auto relative'>
						<header
							className='w-full h-16'
							style={{ display: toggleNav ? "none" : "" }}
						>
							<Navbar />
						</header>

						<main
							className='w-full'
							style={{ height: toggleNav ? "100%" : "" }}
						>
							<Routes />
						</main>
					</div>
				</searchContext.SearchContext.Provider>
			</notesContext.NotesContext.Provider>
		</userContext.UserContext.Provider>
	);
};

export default App;
