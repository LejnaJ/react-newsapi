import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    news: [],
    value: '',
    searchTerm: "",
    loading:false
}

export const newsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_LOADING":
            return { ...state, loading: payload }
        case ActionTypes.SET_NEWS:
            return { ...state, news: [...state.news, ...payload] };
        case ActionTypes.SELECTED_NEWS:
        case ActionTypes.SEARCH_NEWS:
            // const sr = state.news.filter((val) => val.includes(value));
            return { ...state, news: payload };

        default:
            return state;
    }
}