import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Avatar, NavBar } from 'shared/components'
import { useUser } from 'shared/hooks/useUser'
import { colors, themeColors } from 'shared/constants/colors'

const MyPageEdit = () => {
	const { user, changeName, changeImage } = useUser()
	const [isLoading, setIsLoading] = useState(false)
	const [edited, setEdited] = useState(false)
	const [fullName, setFullName] = useState(user.fullName)

	const navigate = useNavigate()
	const [image, setImage] = useState({
		file: '',
		preview_URL: user.image,
	})

	useEffect(() => {
		if (fullName !== user.fullName || image.preview_URL !== user.image) {
			setEdited(true)
		} else {
			setEdited(false)
		}
	}, [fullName, image, user.fullName, user.image])

	const handleNameInput = e => {
		setFullName(e.target.value)
	}
	const handleImageChange = async e => {
		e.preventDefault()
		const reader = new FileReader()
		const file = e.target.files[0]
		if (file) {
			reader.readAsDataURL(file)
		}
		reader.onload = () => {
			setImage({
				file,
				preview_URL: reader.result,
			})
		}
	}

	const handleDone = async e => {
		e.preventDefault()
		if (!edited) return
		setIsLoading(true)
		await changeName(fullName)
		if (image.file !== '') await changeImage(image.file)
		setIsLoading(false)
		navigate('/myPage')
	}

	return (
		<Wrapper>
			<NavBar backIcon />
			<Done edited={edited} onClick={handleDone}>
				{isLoading ? '업로드중..' : '완료'}
			</Done>
			<Profiles>
				<Avatar src={image.preview_URL} alt="avatar" size={10.5} />
			</Profiles>
			<Settings>
				<Setting>
					<Title size={1.5}>프로필</Title>
					<ImageInput type={'file'} accept={'image/*'} onChange={handleImageChange} />
				</Setting>
				<Setting>
					<Title size={1.5}>이름</Title>
					<Input value={fullName} onInput={handleNameInput} />
				</Setting>
			</Settings>
		</Wrapper>
	)
}

export default MyPageEdit

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background-color: ${themeColors.labelBackground};
`
const Input = styled.input`
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	align-items: center;
	font-size: 1.5rem;
	flex: 1;
`
const Title = styled.div`
	width: 6rem;
	font-size: 1.5rem;
`

const Done = styled.div`
	position: absolute;
	top: 3rem;
	right: 1.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 8.2rem;
	height: 2.6rem;
	border-radius: 0.6rem;
	font-size: 1.6rem;
	font-weight: ${props => (props.edited ? 700 : 400)};
	color: ${props => (props.edited ? themeColors.primary : colors.timeoutDarkGray)};
`

const ImageInput = styled(Input)``
export const Description = styled.div`
	width: 24.2rem;
	height: 9rem;
	text-align: center;
	margin-top: 15.6rem;
	margin-bottom: 13.6rem;
`
export const NotLoggedInWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
`
export const Profiles = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 2.7rem;
	flex-direction: column;
	align-items: center;
	row-gap: 1rem;
`

export const Settings = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 1rem;
	width: 100%;
`
export const Setting = styled.div`
	box-sizing: border-box;
	display: flex;
	column-gap: 1rem;
	width: 33.3rem;
	height: 5rem;
	border-radius: 1.1rem;
	align-items: center;
	padding: 1.5rem;
	background-color: ${colors.white};
`
