declare global {
	interface UserType {
		name: string;
		email: string;
		password: string;
		createdAt: Date;
	}

	interface UserResponse {
		message: string;
		data: Omit<UserType, "password">;
		token: string;
	}

	interface NotesType {
		_id?: string;
		title: string;
		instrumental?: string;
		content: string;
		createdAt: Date;
	}

	interface OneNoteResponse {
		message: string;
		data: NotesType;
	}

	interface NotesResponse {
		message: string;
		data: NotesType[];
	}
}

export {};
