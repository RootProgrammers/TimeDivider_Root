import API from '../API'

export const getAllUserList = async () => {
  const { isSuccess, message, data } = await API.get('/users/get-users')
  if (!isSuccess) {
    return { isSuccess, message }
  }
  return { isSuccess, data, message: 'Succesfully Get AllUserList' }
}

export const getUser = async userId => {
  const { isSuccess, message, data } = await API.get(`/users/${userId}`)
  if (!isSuccess) {
    return { isSuccess, message }
  }

  return { isSuccess, data, message: 'Succesfully Get User' }
}
