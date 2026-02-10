import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserContext } from "@/app/context";

export const useSignUp = () => {
	return useMutation({
		mutationFn: async ({
			display_name,
			username,
			password,
		}: {
			display_name: string;
			username: string;
			password: string;
		}) => {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
				{ display_name, username, password },
			);
			return response.data;
		},
	});
};

export const useSignOut = () => {
	const user = useUserContext();
	return useMutation({
		mutationFn: async () => {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
				{
					refresh_token: user.refreshToken,
				},
			);
			return response.data;
		},
	});
};

export const useRefresh = () => {
	return useMutation({
		mutationFn: async ({ refreshToken }: { refreshToken: string }) => {
			const response = await axios.post<{ access_token: string }>(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
				{ refresh_token: refreshToken },
			);

			return response.data;
		},
	});
};

export const useSignIn = () => {
	return useMutation({
		mutationFn: async ({
			username,
			password,
		}: {
			username: string;
			password: string;
		}) => {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
				{
					username: username,
					password: password,
				},
			);

			return response.data;
		},
	});
};
