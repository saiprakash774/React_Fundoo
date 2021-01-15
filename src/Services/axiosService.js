import axios from 'axios';
export default class axiosService{
    Post=(url,data,isHeaderRequired=false)=>{
        return axios.post(url,data,isHeaderRequired)
    }
    GET=(url,isHeaderRequired=false,headers=null)=>{
        return axios.get(url,isHeaderRequired,headers)
    }
}