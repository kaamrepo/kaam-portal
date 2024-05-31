export interface Category {
  _id: string;
  name: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  bgurl?: string; // optional property
}

export interface CategoryTypes {
  categories: Category[];
  getCategories: (payload: { isActive: boolean }) => void;
}
export interface getParamsType{
  isActive?:boolean
}