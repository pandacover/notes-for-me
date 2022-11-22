import React from "react";

type ContextType = {
	user: Omit<UserType, "password">;
	setUser: React.Dispatch<React.SetStateAction<Omit<UserType, "password">>>;
};

const UserContext = React.createContext<ContextType | null>(null);

const useUserContext = () => {
	const context = React.useContext(UserContext);

	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}

	return context;
};

const UserContextWithHook = {
	UserContext,
	useUserContext,
};

export default UserContextWithHook;
