import axios from 'axios';
import util from '../util/util';


const getCourseLists = (callBackFunction) => {
    axios.get(`${util.API_BASE_URL}courses`)
    .then(res => {
        console.log(res.data);
        callBackFunction(res.data);
    })
    .catch(error=>console.error(error));
}


export  {getCourseLists};