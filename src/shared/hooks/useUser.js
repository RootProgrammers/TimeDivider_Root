import { useRecoilState } from 'recoil'
import { loginDataState, userState } from 'state/user'
import { getUser } from 'shared/api/apis/userApis'
import useTimers from 'shared/hooks/useTimers'

const dummyUserImage = 'https://tva1.sinaimg.cn/large/e6c9d24egy1h3g25xp63rj20e80e8gm1.jpg'

export const useUser = () => {
	const { resetTimers } = useTimers()
	const [loginData, setLoginData] = useRecoilState(loginDataState)
	const [user, setUser] = useRecoilState(userState)

	const isLoggedIn = loginData.token !== null

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
		refreshUser,
	}
}

export default useUser
