import { useRecoilState, useResetRecoilState } from 'recoil'
import { loginDataState, userState } from 'state/user'
import { requestLogout } from 'shared/api/apis/authApis'
import { getUser, requestChangeFullName, uploadImage } from 'shared/api/apis/userApis'
import useTimers from 'shared/hooks/useTimers'

const dummyUserImage = 'https://tva1.sinaimg.cn/large/e6c9d24egy1h3g25xp63rj20e80e8gm1.jpg'

export const useUser = () => {
	const { resetTimers } = useTimers()
	const [loginData, setLoginData] = useRecoilState(loginDataState)
	const [user, setUser] = useRecoilState(userState)
	const removeLoginData = useResetRecoilState(loginDataState)

	const isLoggedIn = loginData.token !== null

	const changeName = async fullName => {
		await requestChangeFullName(fullName)
	}

	const logout = async () => {
		const response = await requestLogout()
		removeLoginData()
		resetTimers()
		return response
	}

	const changeImage = async image => {
		const formData = new FormData()
		formData.append('image', image)
		formData.append('isCover', false)
		await uploadImage(formData)
	}

	const refreshUser = async () => {
		const { data } = await getUser(user._id)
		setUser({
			...data,
			image: data.image ?? dummyUserImage,
		})
	}

	return {
		user,
		isLoggedIn,
		changeName,
		changeImage,
		refreshUser,
		logout,
	}
}

export default useUser
