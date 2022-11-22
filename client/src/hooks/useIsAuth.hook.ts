import React from "react";
import axios from "axios";
import { apiHost } from "../utils";

interface PromiseType {
	data: Omit<UserResponse, "token">;
}

const useIsAuth = () => {
	const [[data, error], setResponse] = React.useState<
		[Omit<UserResponse, "token"> | null, string]
	>([null, ""]);

	const token = localStorage.getItem("token");

	const asyncMemo = React.useCallback(async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data: response }: PromiseType = await axios.get(
				apiHost + "api/user/getMe",
				config
			);
			setResponse([response, error]);
		} catch (error) {
			if (typeof error === "string") setResponse([data, error]);
		}
	}, [data, error]);

	React.useEffect(() => {
		(async () => await asyncMemo())();
	}, []);

	return { data, error };
};

export default useIsAuth;
