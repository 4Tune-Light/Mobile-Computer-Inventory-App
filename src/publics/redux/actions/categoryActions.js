import axios from 'axios';

export const getCategories = search => {
	return {
		type: 'GET_CATEGORIES',
		payload: axios.get('/api/categories?search='+ search)
	}
}

export const createCategory = (data, user) => {
	return {
		type: 'CREATE_CATEGORY',
		payload: axios.post('/api/categories', data, {headers: {auth: user.token, username: user.username, email: user.email}})
	}
}

export const editCategory = (id, data, user) => {
	return {
		type: 'EDIT_CATEGORY',
		payload: axios.put('/api/categories/' + id, data, {headers: {auth: user.token, username: user.username, email: user.email}})
	}
}

export const deleteCategory = (id, user) => {
	return {
		type: 'DELETE_CATEGORY',
		payload: axios.delete('/api/categories/' + id, {headers: {auth: user.token, username: user.username, email: user.email}})
	}
}