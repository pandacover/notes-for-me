import axios from "axios";
import apiHost from "./api.url";

interface PromiseType {
	data: UserResponse;
}

export const registerUser = async ({
	name,
	email,
	password,
}: UserType): Promise<UserResponse> => {
	try {
		const { data } = (await axios.post(apiHost + "api/user/register", {
			name,
			email,
			password,
		})) as PromiseType;
		localStorage.setItem("token", data.token);
		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const loginUser = async ({
	email,
	password,
}: Omit<Omit<UserType, "createdAt">, "name">): Promise<UserResponse> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		const { data } = (await axios.post(
			apiHost + "api/user/login",
			{ email, password },
			config
		)) as PromiseType;

		localStorage.setItem("token", data.token);
		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
};

const Auths = {
	registerUser,
	loginUser,
};

export default Auths;
