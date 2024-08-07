import moment from "moment";
import { Modal } from "react-responsive-modal";
import { Props } from "../../types/category.types";
import useCategoryStore from "../../store/categories.store";
import toast from "react-hot-toast";
import { ThrottledBtn } from "../../common/Throtting/useThrottle";
import commonPermissionValidator from "../../common/commonPermissionValidator";
export const EditCategoryModal: React.FC<Props> = ({
  open,
  onCloseModal,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { updateCategory, getCategories } = useCategoryStore();
  const handleSubmit = async () => {
    const response: any = await updateCategory(selectedCategory);
    if (response?.status) {
      toast.success("Category updated successfully", {
        position: "top-right",
      });
      getCategories({ searchOn: { isActive: true } });
    } else {
      toast.error("unable to update category");
    }
    onCloseModal();
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      closeOnOverlayClick={false}
      center
    >
      <h2>Edit Category</h2>
      <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
        <div className="p-2.5 xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
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
      </div>
      <div
        className={`grid grid-cols-4 sm:grid-cols-4 ${"border-b border-stroke dark:border-strokedark"}`}
      >
        <div className="flex items-center gap-4 p-2.5 xl:p-5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Category name"
              value={selectedCategory?.name}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:text-white py-3 px-4 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-black dark:text-white">
            {moment(selectedCategory?.createdAt).format("MMMM Do YYYY")}
          </p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <select
            className="form-select text-meta-3"
            value={selectedCategory?.isActive ? "true" : "false"}
            onChange={(e) =>
              setSelectedCategory({
                ...selectedCategory,
                isActive: e.target.value === "true",
              })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-black dark:text-white">
            {selectedCategory?.createdBy?.firstname}{" "}
            {selectedCategory?.createdBy?.lastname}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <ThrottledBtn
          delay={500}
          btnTitle={"Submit"}
          className={
            "inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          }
          onClick={handleSubmit}
          disabled={commonPermissionValidator([
            "CATEGORIES_CREATE",
            "CATEGORIES_UPDATE",
          ])}
        ></ThrottledBtn>
      </div>
    </Modal>
  );
};
