export interface Category {
  _id: string;
  name: string;
  isActive: boolean;
  createdBy: {
    firstname:string,
    lastname:string
  };
  createdAt: string;
  bgurl?: string; // optional property
}

export interface CategoryTypes {
  categories: Category[];
  getCategories: (payload: { isActive: boolean }) => void;
  updateCategory: (payload:updateDataType) => void;
  addCategories: (payload:updateDataType) => void;
}
export interface getParamsType{
  skip?: number;
  limit?: number;
  isActive?:boolean;
  createdAt?:number
}
export interface updateDataType{
  _id: string;
  name: string;
  isActive: any;
}

export interface Props {
  open: boolean;
  onCloseModal: () => void;
  selectedCategory: any
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}
export interface AddCategoryProps {
  open: boolean;
  onCloseModal: () => void;
}