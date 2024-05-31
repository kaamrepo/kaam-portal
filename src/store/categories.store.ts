import API from '../common/API';
import { create } from 'zustand';
import { CATEGORIES } from '../common/endpoint';
import { CategoryTypes,getParamsType} from '../types/category.types';

export const useCategoryStore = create<CategoryTypes>((set) => ({
  categories: [],
  token: null,
  getCategories: async (payload:getParamsType) => {
    let params:getParamsType={};
    payload.isActive ? params.isActive = payload.isActive:''
    try {
      const response = await API.get(CATEGORIES,{
        params
      });
      console.log("response",response);
      
      if (response?.data?._id) {
        set(() => ({
          categories: response.data.accessToken,
        }));
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
      return {
        data: [],
        status: false,
      };
    }
  },
}));

export default useCategoryStore;
