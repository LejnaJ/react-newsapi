import { ActionTypes } from "../constants/actionTypes";
export const setNews = (news) => {
    return {
        type: ActionTypes.SET_NEWS,
        payload: news,
    }
}


export const selectedNews = (news) => {
    return {
        type: ActionTypes.SELECTED_NEWS,
        payload: news,
    }
}

export const searchNewsAction = ( news) => {
    return {
        type: ActionTypes.SEARCH_NEWS,
        payload: news,
    }
}