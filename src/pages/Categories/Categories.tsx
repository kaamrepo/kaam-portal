import DefaultLayout from '../../layout/DefaultLayout';
import 'react-responsive-modal/styles.css';
import { EditCategoryModal } from './EditCategoryModal';
import { useEffect, useState } from 'react';
import useCategoryStore from '../../store/categories.store';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Category } from '../../types/category.types';
import { AddCategoriesModal } from './AddCategoriesModal';
export const Categories = () => {
  const {categories,getCategories} = useCategoryStore()
  type SelectedCategory = Category | null;

  
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>(null);

  const openEditCategoryModal = (category:Category) => {
    setSelectedCategory(category);
    setIsModalEditOpen(true);
  };

  const closeEditCategoryModal = () => {
    setIsModalEditOpen(false);
  };
  const openAddCategoryModal = () => {
   
    setIsModalAddOpen(true);
  };

  const closeAddCategoryModal = () => {
    setIsModalAddOpen(false);
  };
  useEffect(()=>{
    const payload = {
      isActive:true
    }
    getCategories(payload);
    
  },[getCategories,selectedCategory])
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-row justify-between align-middle">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Categories
          </h4>
          <Link
              to="#"
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={() => openAddCategoryModal()}
           > 
             Add
            </Link> 
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Created On
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                isActive
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                CreatedBy
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {categories?.map((category, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === categories?.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0"></div>
                <p className="hidden text-black dark:text-white sm:block">
                  {category.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{moment(category.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{category.isActive ? 'Yes' : 'No'}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{category?.createdBy?.firstname} {category?.createdBy?.lastname}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <span onClick={() => openEditCategoryModal(category)}>
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditCategoryModal
        open={isModalEditOpen}
        onCloseModal={closeEditCategoryModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />{' '}
      <AddCategoriesModal
        open={isModalAddOpen}
        onCloseModal={closeAddCategoryModal}
      />{' '}
    </DefaultLayout>
  );
};
