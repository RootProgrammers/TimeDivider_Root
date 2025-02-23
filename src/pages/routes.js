import Home from 'pages/Home'
import CreateSpareTime from 'pages/CreateSpareTime'
import CreateTimerName from 'pages/CreateTimerName'
import CreateTimeDivider from 'pages/CreateTimeDivider'
import UpdateTimeDivider from 'pages/UpdateTimeDivider'
import ShareTask from 'pages/ShareTask'

import NotFound from 'pages/NotFound'
import DetailPost from 'pages/DetailPost'

const routes = [
	{ path: '', view: Home },
	{
		path: 'home',
		view: Home,
		title: '첫 화면',
	},
	{
		path: 'createSpareTime',
		view: CreateSpareTime,
		title: '오늘의 시간',
	},
	{
		path: 'createTimerName',
		view: CreateTimerName,
		title: '해야 할 일을 적어요',
	},
	{
		path: 'createTimeDivider',
		view: CreateTimeDivider,
		title: '시간을 분배해요',
	},
	{
		path: 'updateTimeDivider',
		view: UpdateTimeDivider,
		title: '모래시계 편집하기',
	},
	{
		path: 'shareTask',
		view: ShareTask,
		title: '할일 공유 게시판',
	},
	{
		path: 'detailPost/:postId',
		view: DetailPost,
	},
	{
		path: '*',
		view: NotFound,
		title: '404',
	},
]

export default routes
