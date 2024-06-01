import API from '../common/API';
import { create } from 'zustand';
import { CATEGORIES } from '../common/endpoint';
import { CategoryTypes,getParamsType, updateDataType} from '../types/category.types';

export const useCategoryStore = create<CategoryTypes>((set) => ({
  categories: [],
  getCategories: async (payload:getParamsType) => {
    console.log("payload in the getCategories",payload);
    
    let params:any={};
    payload?.isActive ? params.isActive = payload.isActive:params.isActive=true
    payload?.skip ? params.skip = payload.skip:'0'
    payload?.limit? params.limit = payload.limit:'10'
    try {
      const response = await API.get(CATEGORIES,{
        params
      });      
      if (response?.data?.data?.length !== 0) {
        console.log("in the if",response);
        
        set(() => ({
          categories: response?.data?.data,
        }));
        return {
          data: response?.data?.data,
          status: true,
        };
      } else {
        return {
          data: [],
          status: false,
        };
      }
    } catch (error) {
      return {
        data: [],
        status: false,
      };
    }
  },
  updateCategory: async (payload:updateDataType) => {
    console.log("payload in the udpate",payload);
    
    let data:updateDataType={
      _id: '',
      name: '',
      isActive: null
    };
    data._id = payload._id;
    data.name = payload.name
    data.isActive = payload.isActive

    try {
      const response = await API.patch(`${CATEGORIES}/${data._id}`, data);            
      if (response?.data?._id) {                
        return {
          data: response?.data,
          status: true,
        };
      } else {
        return {
          data: [],
          status: false,
        };
      }
    } catch (error) {
      console.log("error in updating category",error);  
      return {
        data: [],
        status: false,
      };
    }
  },
  addCategories: async (payload: any) => {
    try {
      const categoryPromises = payload.map(async (category:any) => {
        // Upload image to S3
        // const imageUrl = await uploadImageToS3(category.image);
        
        // Create category entry
        const categoryData = {
          name: category?.name,
          // image: imageUrl,
        };
        console.log("categoryData befre enty",categoryData);
        
        
        const response = await API.post(CATEGORIES, categoryData);
        return response; // Return the created category data
      });
  
      const createdCategories = await Promise.all(categoryPromises);   
      console.log("createdCategories",createdCategories);
         
      return {
        data: createdCategories,
        status: true,
      };
    } catch (error) {
      console.error('Error adding categories:', error);
      return {
        data: [],
        status: false,
      };
    }
  },
}));

export default useCategoryStore;
