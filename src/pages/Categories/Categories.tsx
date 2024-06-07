import DefaultLayout from "../../layout/DefaultLayout";
import "react-responsive-modal/styles.css";
import { EditCategoryModal } from "./EditCategoryModal";
import { useEffect, useState } from "react";
import useCategoryStore from "../../store/categories.store";
import { Category } from "../../types/category.types";
import Table, { ColumnDef } from "../../common/Table/Table";
import { AddCategoriesModal } from "./AddCategoriesModal";
export const Categories = () => {
  const { categories, getCategories, totalCount } = useCategoryStore();
  type SelectedCategory = Category | null;
  let [limit, setLimit] = useState(10);
  let [skip, setSkip] = useState<Number>(0);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>(null);

  const openEditCategoryModal = (category: Category) => {
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
  const tableColumnDef: ColumnDef[] = [
    {
      key: `name`,
      label: "Name",
      type: "string",
    },
    {
      key: "createdAt",
      label: "Created At",
      type: "date",
    },
    {
      key: ``,
      label: "Is Active",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">{row.isActive ? "Yes" : "No"}</span>
        </div>
      ),
    },
    {
      key: ``,
      label: "Created By",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">
            {`${row.createdBy.firstname} ${row.createdBy.lastname}`}
          </span>
        </div>
      ),
    },

    {
      key: "",
      label: "Actions",
      type: "element",
      render: (row) => (
        <>
          <div className="flex space-x-1">
            <span onClick={() => openEditCategoryModal(row)}>
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
        </>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-row justify-between align-middle py-1">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Categories
          </h4>
          <button
            className="flex items-center justify-center rounded-md bg-meta-3 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={() => openAddCategoryModal()}
          >
            Add
          </button>
        </div>

        <div className="">
          <Table
            columns={tableColumnDef}
            data={categories ?? []}
            totalCount={totalCount}
            pageable={true}
            APIcall={getCategories}
            limit={limit}
            onChangeLimit={setLimit}
            skip={skip}
            setSkip={setSkip}
          />
        </div>
      </div>
      <EditCategoryModal
        open={isModalEditOpen}
        onCloseModal={closeEditCategoryModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />{" "}
      <AddCategoriesModal
        open={isModalAddOpen}
        onCloseModal={closeAddCategoryModal}
        
      />{" "}
    </DefaultLayout>
  );
};
