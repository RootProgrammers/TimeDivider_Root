import * as userApis from './apis/userApis'
import * as postApis from './apis/postApis'
import * as likeApis from './apis/likeApis'
import * as commentApis from './apis/commentApis'

const apis = {
	...userApis,
	...postApis,
	...likeApis,
	...commentApis,
}

export default apis
