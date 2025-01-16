import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

const {CATALOGPAGEDATA_API} = catalogData

export const getCatalogPageData = async(data) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try{
    // console.log("Category id frontend :- ", categoryId);
    const response = await apiConnector("POST", CATALOGPAGEDATA_API,
        data
    )

    // console.log("Get Catalog page Data response :- ", response);
    if(! response?.data?.success){
        throw new Error("Couldn't fetch category page data");
    }

    result = response?.data?.data;
  }
  catch(error){
    console.log("Catalog page data API error :- ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

