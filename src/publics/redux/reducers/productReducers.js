const initState = {
	products: [],
	total: 0,
	errMessage:'',
  message:'',
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  isRedirected: false
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'GET_PRODUCTS_PENDING':
		case 'GET_PRODUCT_PENDING':
		case 'CREATE_PRODUCT_PENDING':
		case 'UPDATE_PRODUCT_PENDING':
		case 'DELETE_PRODUCT_PENDING':
			return {
				...state,
				total: 0,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
				isRedirected: false
			}
		case 'GET_PRODUCTS_REJECTED':
		case 'GET_PRODUCT_REJECTED':
		case 'CREATE_PRODUCT_REJECTED':
		case 'UPDATE_PRODUCT_REJECTED':
		case 'DELETE_PRODUCT_REJECTED':
			return {
				...state,
				products: [],
				isLoading: false,
				isRejected: true,
				errMessage: action.payload.response.data.message
			}
		case 'GET_PRODUCTS_FULFILLED':
			return {
				...state,
				products: action.payload.data.data,
				total: action.payload.data.total[0].total,
				isLoading: false,
				isFulfilled: true,
			}
		case 'GET_PRODUCT_FULFILLED':
			return {
				...state,
				products: action.payload.data.data[0],
				isLoading: false,
				isFulfilled: true,
			}
		case 'CREATE_PRODUCT_FULFILLED':
			return {
				products: action.payload.data.data,
				...state,
				isLoading: false,
				isFulfilled: true,
				isRedirected: true
			}
		case 'UPDATE_PRODUCT_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				isRedirected: true
			}
		case 'DELETE_PRODUCT_FULFILLED':
			return {
				...state,
				products: state.products.filter(product => product.id != action.payload.data.id),
				isLoading: false,
				isFulfilled: true,
			}
		default:
			return state;
	}
}