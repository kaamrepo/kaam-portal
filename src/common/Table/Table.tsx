import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { toast } from "react-hot-toast";
import TableCheckbox from "./TableCheckbox";
function toString(value: any) {
  return value === undefined || value === null ? "" : String(value);
}
export interface ColumnDef {
  headCssCustomization?: string;
  key: string;
  label: string;
  type:
    | "text"
    | "number"
    | "date"
    | "datetime"
    | "sr_no"
    | "checkbox"
    | "time"
    | "element"
    | "string";
  onChange?: (event: ChangeEvent<HTMLInputElement>, row: any) => void;
  onclick?: (row: any) => void;
  render?: (row: any) => JSX.Element;
  computedValue?: (row: any) => string;
  onClickSelectall?: (flag: boolean) => void;
  flag?: boolean;
}
export function getElem(obj: { [key: string]: any }, key: string) {
  return key.split(".").reduce((curObj, curKey) => curObj?.[curKey], obj);
}
function getCellText(column: ColumnDef, row: any): string {
  return column.computedValue
    ? column.computedValue(row)
    : column.type === "date"
    ? moment(String(getElem(row, column.key))).format("DD-MMM-YYYY")
    : column.type === "datetime"
    ? moment(String(getElem(row, column.key))).format("DD-MMM-YYYY HH:mm A")
    : column.type === "time"
    ? moment(String(getElem(row, column.key))).format("HH:mm")
    : toString(getElem(row, column.key));
}
function Table(props: {
  type?: string;
  data: any[];
  columns: ColumnDef[];
  setSkip?: any;
  totalCount: number;
  skip?: any;
  limit?: any;
  onChangeLimit?: any;
  sortable?: boolean;
  pageable?: boolean;
  APIcall?: any;
  searchOn?: object;
  strictColumns?: boolean;
  searchInput?: object;
  tableRowStyling?: string;
}) {
  const [data, setData] = useState(props?.data ?? []);
  const [pageNo, setPageNo] = useState(1);
  let limit = [5, 10, 15, 20, 25, 30, 50, 100];
  useEffect(() => {
    props?.APIcall({
      skip: Number(props?.skip),
      limit: Number(props?.limit),
      searchOn: props?.searchInput,
    });
  }, [Number(props?.skip), Number(props?.limit)]);
  const pagedData = data;
  const numPages = Math.ceil(props?.totalCount / props?.limit);
  useEffect(() => {
    setPageNo(1);
    props.setSkip(0);
  }, [props?.totalCount]);
  useEffect(() => {
    let newData = [...(props?.data ?? [])];
    setData(newData);
  }, [props?.data]);
  return (
    <>
      <div className="bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex justify-start pl-2 py-1">
          <span className="">
            Total Count :{" "}
            {`${
              props?.totalCount < 10
                ? `0${props?.totalCount}`
                : props?.totalCount
            }`}
          </span>
        </div>
        <div className="overflow-auto h-[60vh]">
          <table className="border-collapse w-full min-w-full divide-y divide-gray-200  border-gray-100 ">
            <thead>
              <tr className="sticky top-0  bg-slate-600 font-color text-white text-lg p-2">
                {props?.columns?.map((column, index) => (
                  <th
                    key={index}
                    className={`py-2 text-sm  font-medium capitalize remove-border  ${
                      column?.headCssCustomization
                        ? column?.headCssCustomization
                        : column.type === "checkbox"
                        ? "w-[51px]"
                        : ""
                    }`}
                  >
                    <div
                      className={
                        "flex flex-row items-center border-remove " +
                        (column.type === "element"
                          ? "px-2.5"
                          : "px-2.5 justify-start")
                      }
                    >
                      {column.type === "checkbox" && data?.length > 0 ? (
                        <div className="text-center remove-border cursor-pointer">
                          <TableCheckbox
                            isChecked={column.flag}
                            onChange={(e: any) => {
                              if (column.onClickSelectall) {
                                column?.onClickSelectall(e.target.checked);
                              }
                            }}
                            title={"Select All"}
                          />
                        </div>
                      ) : null}
                      <div className="text-center remove-border">
                        <span>{column.label}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {pagedData?.map((row, indexOfRow) => (
                <tr
                  key={indexOfRow}
                  className={`primary-derived-color-two active:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-200`}
                >
                  {props?.columns.map((column, index, array) => (
                    <td
                      className={
                        "py-[9px] pl-2.5 border-b break-all max-w-[120px] cursor-default truncate ... " +
                        (column.type === "element" ? "" : "") +
                        (index === array.length - 1 ? "px-2" : "") +
                        (column?.headCssCustomization
                          ? column?.headCssCustomization
                          : column.type === "checkbox"
                          ? "w-[50px]"
                          : "")
                      }
                      key={index}
                      onClick={() => {
                        if (column.onclick) {
                          column.onclick(row);
                        }
                      }}
                    >
                      {column.render ? (
                        column.render(row)
                      ) : column.type === "sr_no" ? (
                        indexOfRow + 1 * (pageNo - 1) * 10 + 1 + props.skip
                      ) : column.type === "checkbox" ? (
                        <div className="w-fit h-fit -mx-[2px] flex justify-start">
                          <TableCheckbox
                            isDisabled={
                              row.hasOwnProperty("isEnabled")
                                ? row.isEnabled
                                : false
                            }
                            onChange={(event: any) =>
                              column.onChange && column.onChange(event, row)
                            }
                            isChecked={Boolean(getElem(row, column.key))}
                            title={"Select"}
                          />
                        </div>
                      ) : (
                        <div
                          className={`cursor-default ${
                            props?.columns[0]?.type !== "checkbox"
                              ? "px-0.5"
                              : ""
                          }`}
                        >
                          {getCellText(column, row)}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {/* </tr> */}
            </tbody>
          </table>
        </div>
        {props?.data?.length > 0 ? (
          <>
            {props?.pageable === true ? (
              <div className=" overflow-auto h-cover pt-3 ">
                <div>
                  <div className="flex justify-between items-center ">
                    <div className="flex m-2 space-x-5">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Rows per page :
                        </label>
                      </div>
                      <select
                        className="border border-gray-200 rounded cursor-pointer "
                        onChange={(e: any) => {
                          props?.onChangeLimit(e?.target?.value);
                          props?.setSkip(0);
                          setPageNo(1);
                        }}
                        value={props?.limit}
                      >
                        {limit?.map((elem, index) => (
                          <option className="cursor-pointer" key={index}>
                            {elem}
                          </option>
                        ))}
                      </select>
                      <div></div>
                    </div>
                    <div className="flex">
                      <div className="flex m-2 space-x-2">
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Jump on page no. :
                          </label>
                        </div>
                        <div>
                          <input
                            className="w-20 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            onChange={(e: any) => {
                              let input = e.target.value;
                              let errorMsg;
                              if (!/^(\d{0,9})(\.\d{1,2})?$/.test(input)) {
                                errorMsg = `Insert valid Positive Number`;
                                toast.error(errorMsg);
                              } else if (input && input < 1) {
                                errorMsg = `Insert must be Positive Number`;
                                toast.error(errorMsg);
                              } else if (input && input > numPages) {
                                errorMsg = `Input must be less than ${numPages}`;
                                toast.error(errorMsg);
                              } else if (input.trim() === "") {
                                props?.setSkip(0);
                                setPageNo(1);
                                props?.onChangeLimit(props?.limit);
                              } else {
                                setPageNo(input - 1 + 1);
                                props?.setSkip(
                                  input * props?.limit - props?.limit
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="m-2">
                        <Pagination
                          numPages={numPages}
                          totalCount={props?.totalCount}
                          skip={props?.skip}
                          setSkip={props?.setSkip}
                          data={data}
                          setPageNo={setPageNo}
                          pageNo={pageNo}
                          limit={props?.limit}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Table;
