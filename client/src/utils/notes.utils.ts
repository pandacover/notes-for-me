import axios from "axios";
import apiHost from "./api.url";

interface PromiseNotesType {
	data: NotesResponse;
}

interface PromiseOneNoteType {
	data: OneNoteResponse;
}

const config = {
	headers: {
		Authorization: `Bearer: ${localStorage.getItem("token")}`,
	},
};

const getAllNotes = async (): Promise<NotesResponse> => {
	try {
		const { data } = (await axios.get(
			apiHost + "api/notes/getAll",
			config
		)) as PromiseNotesType;
		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
};

const getOneNote = async (id: string): Promise<OneNoteResponse> => {
	try {
		const { data } = (await axios.get(
			apiHost + `api/notes/getOne/${id}`,
			config
		)) as PromiseOneNoteType;
		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
};

const createNote = async ({
	title,
	content,
	instrumental,
}: NotesType): Promise<OneNoteResponse> => {
	try {
		const { data } = (await axios.post(
			apiHost + "api/notes/createNote",
			{ title, content, instrumental },
			config
		)) as PromiseOneNoteType;
		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
};

const updateNote = async ({
	id,
	title,
	content,
	instrumental,
}: NotesType & { id: string }): Promise<OneNoteResponse> => {
	try {
		const { data } = (await axios.put(
			apiHost + `api/notes/updateNote/${id}`,
			{ title, content, instrumental },
			config
		)) as PromiseOneNoteType;
		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
};

const deleteNote = async (id: string): Promise<OneNoteResponse> => {
	try {
		const { data } = (await axios.delete(
			apiHost + `api/notes/deleteNote/${id}`,
			config
		)) as PromiseOneNoteType;
		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
};

const Notes = {
	getAllNotes,
	getOneNote,
	createNote,
	updateNote,
	deleteNote,
};

export default Notes;
