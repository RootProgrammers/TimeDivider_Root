import API from '../API'

export const requestLogout = async () => {
	const { isSuccess, data } = await API.post('/logout')

	return { isSuccess, message: data }
}
