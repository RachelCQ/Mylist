import axios from 'axios'
import {message} from "antd";

export function clickList(newData,theMovie) {
    return {type:'click_list',data:{newData,theMovie}}
}

export function clickRecom(newData,theMovie) {
    return {type:'click_recom',data:{newData,theMovie}}
}


function requestStart(){
    return {
        type:'MOVIE_FETCH_START'
    }
}

function requestSuccess(res) {
    return {
        type:'MOVIE_FETCH_SUCCESS',
        data:res.data
    }
}

function requestFail(error) {
    return{
        type:'MOVIE_FETCH_FAIL',
        error
    }
}
export function getData() {
    return (dispatch) => {
        dispatch(requestStart());
        axios.get('/api/movies').then((res)=>{
            dispatch(requestSuccess(res))
        }).catch(err=>{
            dispatch(requestFail(err))
            message.error(`${err}`)
        })
    }
}
