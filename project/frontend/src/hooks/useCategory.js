import axios from "axios";
import { getAllCategories } from "../apis/fakeStoreProdApis";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../helpers/fetchProductsHelper";

function useCategory() {
    const [categoriesStatus, setCategories] = useState({
        categories:null,
        err:null
    });

    async function downloadCategories() {
        const response = fetchAllCategories();
         
        response.then((categoriesData)=>{
        
            if(!categoriesData.err){
                setCategories({...categoriesStatus,categories:categoriesData.data});
            }else{
                setCategories({...categoriesStatus,err:categoriesData.err})
            }
        })
       
       
       
      
       
    }

    useEffect(() => {
        downloadCategories();
    }, [])

    return categoriesStatus
}

export default useCategory;