import React from "react";

type ContextType = {
	notes: NotesResponse;
	setNotes: React.Dispatch<React.SetStateAction<NotesResponse>>;
};

export const NotesContext = React.createContext<ContextType | null>(null);

const useNotesContext = () => {
	const context = React.useContext(NotesContext);
	if (!context) {
		throw new Error("useNotesContext must be used under NotesProvider");
	}

	return context;
};

const NotesContextWithHook = {
	NotesContext,
	useNotesContext,
};

export default NotesContextWithHook;
