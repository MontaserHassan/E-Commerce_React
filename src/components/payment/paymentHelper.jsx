import { API } from "../../backend";

export const getMeToke = (userId, token)=>{
    return fetch(`${API}payment/gettoken${userId}/${token}`,{
        method:'GET'
    })
    .then((response)=>{
        return response.json
    })
    .catch((error)=>{
        console.log(error);
    })
}