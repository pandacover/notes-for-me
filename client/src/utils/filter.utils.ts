const filter = (noteState: NotesResponse["data"], tags: string) => {
	const dateObject = new Date();
	const date = [
		dateObject.getDate(),
		dateObject.getMonth(),
		dateObject.getFullYear(),
	];

	let notesObject = new Array(...noteState);

	if (tags === "today") {
		notesObject = notesObject.filter(
			(item) =>
				new Date(item.createdAt).getDate() === date[0] &&
				new Date(item.createdAt).getMonth() === date[1] &&
				new Date(item.createdAt).getFullYear() === date[2]
		);
	} else if (tags === "earlier") {
		notesObject = notesObject.filter((item) => {
			const itemDateObject = new Date(item.createdAt);
			const itemDate = [
				itemDateObject.getDate(),
				itemDateObject.getMonth(),
				itemDateObject.getFullYear(),
			];

			if (itemDate[2] < date[2]) return item;
			else {
				if (itemDate[1] < date[1]) return item;
				else {
					if (itemDate[0] < date[0]) return item;
				}
			}
		});
	}

	return notesObject;
};

export default filter;
