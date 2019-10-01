const initState = {
    mylist:[],
    recommendations:[],
    error:null,
    loading:false,
}
export default function reducer(state=initState,action) {

    switch (action.type) {
        case 'MOVIE_FETCH_START':
            return {
                ...state,
                error:null,
                loading: true
            };
        case 'MOVIE_FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                error:null,
                mylist: action.data.mylist,
                recommendations:  action.data.recommendations
            };
        case 'MOVIE_FETCH_FAIL':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'click_list':
            return {
                ...state,
                error:null,
                mylist: action.data.newData,
                recommendations:[...state.recommendations,...action.data.theMovie]
            };
        case 'click_recom':
            return {
                ...state,
                error:null,
                mylist: [...state.mylist,...action.data.theMovie],
                recommendations:action.data.newData
            };
        default:
            return state
    }
}
