import axios from "axios"

export async function fetchToken(){
    try{

        const res = await axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/accesstoken`,{withCredentials:true});
        return res;
    }catch(err){
        return err.response.data
    }
}