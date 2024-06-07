import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { Props } from "../../types/category.types";
import useCategoryStore from "../../store/categories.store";
import toast from "react-hot-toast";

interface Category {
  name: string;
  image: string;
  preview: string;
}

export const AddCategoriesModal: React.FC<Props> = ({ open, onCloseModal }) => {
  const { addCategories, getCategories } = useCategoryStore();
  const [categories, setCategories] = useState<Category[]>([
    { name: "", image: "", preview: "" },
  ]);

  useEffect(() => {
    if (open) {
      setCategories([{ name: "", image: "", preview: "" }]);
    }
  }, [open]);

  const handleCategoryChange = (index: number, value: string, type: string) => {
    const newCategories: any = [...categories];
    newCategories[index][type] = value;
    setCategories(newCategories);
  };

  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newCategories = [...categories];
        newCategories[index].image = file.name;
        newCategories[index].preview = reader.result as string;
        setCategories(newCategories);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    setCategories([...categories, { name: "", image: "", preview: "" }]);
  };

  const handleDeleteCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleSubmit = () => {
    const validCategories: any = categories.filter(
      (category) => category.name.trim() !== "" && category.image.trim() !== ""
    );
    if (validCategories.length > 0) {
      const response: any = addCategories(validCategories);
      if (response?.length !== 0) {
        toast.success("category Added Successfully", {
          position: "top-right",
        });
        getCategories({ searchOn: { isActive: true } });
        onCloseModal();
      }
    }
  };

  const isSubmitDisabled = categories.every(
    (category) => category.name.trim() === "" || category.image.trim() === ""
  );

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      closeOnOverlayClick={false}
      center
    >
      <h2>Add Categories</h2>
      <div className="p-4">
        {categories.map((category, index) => (
          <div key={index} className="mb-4 flex flex-row items-center">
            <input
              type="text"
              id={`categoryName${index}`}
              name={`categoryName${index}`}
              value={category.name}
              onChange={(e) =>
                handleCategoryChange(index, e.target.value, "name")
              }
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter category name"
            />
            <div className="mt-2 flex items-center justify-start">
              <input
                type="file"
                id={`categoryImage${index}`}
                name={`categoryImage${index}`}
                onChange={(e) => handleImageUpload(index, e)}
                className="mt-1 p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
              />
            </div>
            {category.preview && (
              <img
                src={category.preview}
                alt="Preview"
                className="mt-2 w-24 h-24"
              />
            )}
            <button
              type="button"
              onClick={() => handleDeleteCategory(index)}
              className="mt-1 ml-2"
            >
              <svg
                className="w-5 h-5 text-red-600 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddCategory}
            className="bg-primaryBGColor mr-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:meta-5 focus:outline-none focus:meta-5 focus:meta-5 focus:meta-5"
          >
            Insert Category
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`bg-primaryBGColor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isSubmitDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:meta-5 focus:outline-none focus:meta-5 focus:meta-5 focus:meta-5"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};
