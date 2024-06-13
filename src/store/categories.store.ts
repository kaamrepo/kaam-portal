import API from "../common/API";
import { create } from "zustand";
import { CATEGORIES } from "../common/endpoint";
import {
  CategoryTypes,
  getParamsType,
  updateDataType,
} from "../types/category.types";

export const useCategoryStore = create<CategoryTypes>((set) => ({
  categories: [],
  totalCount: 0,
  getCategories: async (payload: getParamsType) => {
    const query: any = {};
    if (payload.skip) {
      query["skip"] = payload.skip;
    }
    if (payload.limit) {
      query["limit"] = payload.limit;
    }
    if (payload.searchOn && payload.searchOn.isActive) {
      query["isActive"] = payload.searchOn.isActive;
    }
    if (payload.searchOn && payload.searchOn.paginate === false) {
      query["paginate"] = false;
    }
    try {
      const response = await API.get(CATEGORIES, { params: query });

      if (response.data.length > 0 || response?.data?.data?.length > 0) {
        set({
          categories:
            payload.searchOn && payload.searchOn.paginate === false
              ? response.data
              : response.data.data,
          totalCount:
            payload.searchOn && payload.searchOn.paginate === false
              ? 0
              : response.data.total,
        });
        return { data: response.data.data, status: true };
      } else {
        return { data: [], status: false };
      }
    } catch (error) {
      return { data: [], status: false };
    }
  },
  updateCategory: async (payload: updateDataType) => {
    let data: updateDataType = {
      _id: "",
      name: "",
      isActive: null,
    };
    data._id = payload._id;
    data.name = payload.name;
    data.isActive = payload.isActive;

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
      console.log("error in updating category", error);
      return {
        data: [],
        status: false,
      };
    }
  },
  // addCategories: async (payload: any) => {
  //   try {
  //     const categoryPromises = payload.map(async (category: any) => {
  //       // Upload image to S3
  //       // const imageUrl = await uploadImageToS3(category.image);

  //       // Create category entry
  //       const categoryData = {
  //         name: category?.name,
  //         // image: imageUrl,
  //       };
  //       console.log("categoryData befre enty", categoryData);

  //       const response = await API.post(CATEGORIES, categoryData);
  //       return response; // Return the created category data
  //     });

  //     const createdCategories = await Promise.all(categoryPromises);
  //     console.log("createdCategories", createdCategories);

  //     return {
  //       data: createdCategories,
  //       status: true,
  //     };
  //   } catch (error) {
  //     console.error("Error adding categories:", error);
  //     return {
  //       data: [],
  //       status: false,
  //     };
  //   }
  // },
  addCategories: async (payload: any) => {
    try {
      if (!Array.isArray(payload)) {
        throw new Error("Payload must be an array");
      }

      const categoryPromises = payload.map(async (category: FormData) => {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await API.post(CATEGORIES, category, config);
        return response.data;
      });

      const createdCategories = await Promise.all(categoryPromises);
      console.log("createdCategories", createdCategories);

      return {
        data: createdCategories,
        status: true,
      };
    } catch (error) {
      console.error("Error adding categories:", error);
      return {
        data: [],
        status: false,
      };
    }
  },
}));

export default useCategoryStore;
