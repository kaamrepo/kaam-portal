import { useState } from "react";
import getStyleByClass from "./checkbox-css";
const TableCheckbox = (props: any) => {
  const { isDisabled, title, isChecked, onChange } = props;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <label
      className={`flex items-center  space-x-2 px-0  border-remove ${
        isHovered || !isDisabled ? "cursor-pointer" : "pointer-events-none"
      }`}
    >
      <input
        type="checkbox"
        className={`hidden`}
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <div
        className={`w-5 h-5 ml-0 pt-[1px] border-2 rounded ${
          isChecked
            ? "brand-color-primary"
            : isDisabled
            ? " bg-white"
            : "bg-white"
        }`}
        style={{
          color: getStyleByClass("brand-color-secondary")?.backgroundColor,
          borderColor: isDisabled
            ? "#cbd5e1"
            : getStyleByClass("brand-color-primary")?.backgroundColor,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={title}
      >
        {isChecked && (
          <svg
            className="text-white w-3 h-3 m-auto mt-[7px]"
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24.17 16"
          >
            <g id="Layer_1-2" data-name="Layer 1" fill="#fff">
              <path
                className="cls-1"
                d="m8.11,18.89L.59,11.37c-.78-.78-.78-2.05,0-2.83.78-.78,2.05-.78,2.83,0l4.69,4.69L20.76.59c.78-.78,2.05-.78,2.83,0,.78.78.78,2.05,0,2.83l-15.48,15.48Z"
              />
            </g>
          </svg>
        )}
      </div>
    </label>
  );
};

export default TableCheckbox;
