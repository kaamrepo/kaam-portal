export interface Category {
  _id: string;
  name: string;
  isActive: boolean;
  createdBy: {
    firstname: string;
    lastname: string;
  };
  createdAt: string;
  bgurl?: string; // optional property
}

export interface CategoryTypes {
  categories: Category[];
  totalCount: number;
  getCategories: (payload: getParamsType) => void;
  updateCategory: (payload: updateDataType) => void;
  addCategories: (payload: updateDataType) => void;
}
export interface getParamsType {
  skip?: number;
  limit?: number;
  searchOn: { isActive?: boolean; paginate?: boolean };
}
export interface updateDataType {
  _id: string;
  name: string;
  isActive: any;
}

export interface Props {
  open: boolean;
  onCloseModal: () => void;
  selectedCategory: any;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}
export interface AddCategoryProps {
  open: boolean;
  onCloseModal: () => void;
}
