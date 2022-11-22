import React from "react";

type ContextType = {
	searchParams: string;
	setSearchParams: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = React.createContext<ContextType | null>(null);

const useSearchContext = () => {
	const context = React.useContext(SearchContext);
	if (!context) {
		throw new Error(
			"useSearchContext should be used under a SearchContext Provider"
		);
	}

	return context;
};

const searchContext = {
	SearchContext,
	useSearchContext,
};

export default searchContext;
