const initState = {
	categories: [],
	errMessage:'',
  message:'',
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'GET_CATEGORIES_PENDING':
		case 'CREATE_CATEGORY_PENDING':
		case 'EDIT_CATEGORY_PENDING':
		case 'DELETE_CATEGORY_PENDING':
			return {
				...state,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
				isCreated: false
			}
		case 'GET_CATEGORIES_REJECTED':
		case 'CREATE_CATEGORY_REJECTED':
		case 'EDIT_CATEGORY_REJECTED':
		case 'DELETE_CATEGORY_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true,
				errMessage: action.payload.response.data.message
			}
		case 'GET_CATEGORIES_FULFILLED':
			return {
				...state,
				categories: action.payload.data.data,
				isLoading: false,
				isFulfilled: true,
			}
		case 'CREATE_CATEGORY_FULFILLED':
			return {
				categories: action.payload.data.data,
				...state,
				isLoading: false,
				isFulfilled: true,
			}
		case 'EDIT_CATEGORY_FULFILLED':
			return {
				categories: action.payload.data.data,
				...state,
				isLoading: false,
				isFulfilled: true,
			}
		case 'DELETE_CATEGORY_FULFILLED':
			return {
				...state,
				categories: state.products.filter(product => product.id != action.payload.data.id),
				isLoading: false,
				isFulfilled: true,
			}
		default:
			return state;
	}
}