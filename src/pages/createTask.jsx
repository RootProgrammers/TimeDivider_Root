import React, { useState, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import styled from 'styled-components'
import NavBar from 'shared/components/NavBar'
import Text from 'shared/components/Text'
import Button from 'shared/components/Button'
import Input from 'shared/components/Input'

const BUTTON_TEXT = Object.freeze({
	VALID: '다음 단계',
	INVALID: '할 일을 입력해주세요',
})

export const CreateTask = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const [spareTime, setSpareTime] = useState({ hour: 0, minute: 0 })
	const [task, setTask] = useState('')
	const [tasks, setTasks] = useState([])
	const [isValidTasks, setIsValidTasks] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		const trimmedTask = task.trim()

		if (trimmedTask) {
			setTasks([...tasks, { id: `${Date.now()}${tasks.length}`, task: trimmedTask }])
		}

		setTask('')
	}

	const removeTask = removeId => {
		const filteredTasks = tasks.filter(({ id }) => removeId !== id)
		setTasks(filteredTasks)
	}

	const handleIsValidTask = tasks => {
		if (tasks.length > 0) {
			setIsValidTasks(true)
			return
		}
		setIsValidTasks(false)
	}

	useMemo(() => {
		try {
			const { spareTime } = location.state
			setSpareTime(spareTime)
		} catch {
			navigate('/home')
		}
	}, [location, navigate])

	useMemo(() => {
		handleIsValidTask(tasks)
	}, [tasks])

	return (
		<>
			<NavBar backIcon>오늘의 시간</NavBar>

			<SubTitleArea>
				<Text size={1.5}>추가된 할 일들</Text>
			</SubTitleArea>

			<TaskArea>
				{tasks.map(({ id, task }) => (
					<Task key={id}>
						<span>{task}</span>
						<DelBtn onClick={() => removeTask(id)} />
					</Task>
				))}
			</TaskArea>

			<Form onSubmit={e => handleSubmit(e)}>
				<Input
					type="text"
					value={task}
					onChange={e => setTask(e.target.value)}
					autoFocus={true}
					required
				/>
				<Button size="md">추가</Button>
			</Form>

			<ButtonArea>
				<Link to="/createTimeDivider" state={{ spareTime, tasks }}>
					<Button disabled={!isValidTasks}>
						{!isValidTasks ? BUTTON_TEXT.INVALID : BUTTON_TEXT.VALID}
					</Button>
				</Link>
			</ButtonArea>
		</>
	)
}

export default CreateTask

const SubTitleArea = styled.div`
	display: flex;
	justify-content: flex-start;
	height: 3vh;
	width: 100%;
	margin: 2rem 1rem 0 2rem;
`

const TaskArea = styled.div`
	height: 20vh;
	width: 100%;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	margin: 2rem 1rem 1rem 2rem;
	margin-bottom: 2rem;
`

const Task = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 2rem;
	margin: 0.3rem;
	padding: 0 1.5rem;
	background-color: #999;
`

const DelBtn = styled.a`
	position: absolute;
	right: 0.3rem;
	top: 0.4rem;
	color: #fff;
	border-radius: 50%;
	font-size: 1.2rem;
	::before {
		content: 'x';
	}
`

const ButtonArea = styled.div`
	position: absolute;
	margin: 2rem 2rem;
	width: 100%;
	bottom: 1rem;
`

const Form = styled.form`
	display: flex;
	gap: 2rem;
`
