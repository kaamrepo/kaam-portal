const Pagination = (props: {
  numPages: any;
  skip: any;
  limit: any;
  setSkip: any;
  totalCount: any;
  data: any;
  setPageNo: any;
  pageNo?: any;
  rowsPerPage?: number;
}) => {
  const totalPageLimit = 10;
  const pageNumbers = (total: any, max: any, current: any) => {
    const half = Math.round(max / 2);
    let to = max;
    if (current + half >= total) {
      to = total;
    } else if (current > half) {
      to = current + half;
    }
    let from = to - max;
    return Array.from({ length: max }, (_, i) => i + 1 + from);
  };

  return (
    <>
      <nav
        className="relative z-0 inline-flex rounded-md  -space-x-px"
        aria-label="Pagination"
      >
        <button
          className="relative inline-flex items-center px-1.5 py-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
          title="Go to first page"
          aria-label="Previous"
          onClick={() => {
            props.setPageNo(1);
            props.setSkip(0);
          }}
        >
          <span className="sr-only">Go to first page </span>
          {/* <img src={leftdoublearrow} /> */}
          <svg
            id="Left_Double_Arrow_Icon"
            data-name="Left Double Arrow Icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <g id="invisible_box" data-name="invisible box">
              <rect
                id="Rectangle_4412"
                data-name="Rectangle 4412"
                width="20"
                height="20"
                fill="none"
              />
            </g>
            <g
              id="icons_Q2"
              data-name="icons Q2"
              transform="translate(4.577 4.167)"
            >
              <path
                id="Path_204"
                data-name="Path 204"
                d="M12.991,15.834l4.417,4.417a.792.792,0,0,1-.083,1.25.875.875,0,0,1-1.125-.083l-4.958-5a.792.792,0,0,1,0-1.167l4.958-5a.875.875,0,0,1,1.125-.083.792.792,0,0,1,.083,1.25Z"
                transform="translate(-10.985 -10.001)"
                fill="#5b5b5b"
              />
              <path
                id="Path_205"
                data-name="Path 205"
                d="M24.991,15.834l4.417,4.417a.792.792,0,0,1-.083,1.25.875.875,0,0,1-1.125-.083l-4.958-5a.792.792,0,0,1,0-1.167l4.958-5a.875.875,0,0,1,1.125-.083.792.792,0,0,1,.083,1.25Z"
                transform="translate(-17.985 -10.001)"
                fill="#5b5b5b"
              />
            </g>
          </svg>
        </button>
        <button
          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-1.5 py-1.5 border text-sm font-medium cursor-pointer"
          title="Go to prev"
          aria-label="Previous"
          disabled={Number(props.pageNo) - 1 === 0}
          onClick={() => {
            props?.pageNo > 1 && props?.setPageNo(props?.pageNo - 1);
            props?.setSkip(props?.skip - props?.limit);
          }}
        >
          <span className="sr-only">Previous</span>
          {/* <img src={leftlinearrow} /> */}
          <svg
            id="Left_Arrow_Line_Icon"
            data-name="Left Arrow Line Icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <g id="invisible_box" data-name="invisible box">
              <rect
                id="Rectangle_4416"
                data-name="Rectangle 4416"
                width="20"
                height="20"
                fill="none"
              />
            </g>
            <g
              id="icons_Q2"
              data-name="icons Q2"
              transform="translate(6.66 4.167)"
            >
              <path
                id="Path_209"
                data-name="Path 209"
                d="M17.991,15.834l4.417-4.417a.792.792,0,0,0-.083-1.25.875.875,0,0,0-1.125.083l-4.958,5a.792.792,0,0,0,0,1.167l4.958,5a.875.875,0,0,0,1.125.083.792.792,0,0,0,.083-1.25Z"
                transform="translate(-15.985 -10.001)"
                fill="#5b5b5b"
              />
            </g>
          </svg>
        </button>
        {props?.numPages >= 10 ? (
          <>
            {pageNumbers(props?.numPages, totalPageLimit, props?.pageNo).map(
              (elem, index) => (
                <button
                  aria-current="page"
                  key={index}
                  className={
                    props?.pageNo === elem
                      ? "bg-slate-600 border-gray-300 text-white  items-center px-2 py-2 border text-sm font-medium cursor-pointer no-underline"
                      : "bg-white border-gray-300 text-gray-500  items-center px-2 py-2 border text-sm font-medium cursor-pointer no-underline"
                  }
                  onClick={() => {
                    props?.setSkip((elem - 1) * props?.limit);
                    props?.setPageNo(elem);
                  }}
                >
                  {elem}
                </button>
              )
            )}
          </>
        ) : (
          <>
            {[...Array(props?.numPages)].map((elem, index) => (
              <button
                key={index}
                aria-current="page"
                className={
                  props?.skip === index * props?.limit
                    ? "bg-slate-600 border-gray-300 text-white  items-center px-2 py-2 border text-sm font-medium cursor-pointer no-underline"
                    : "bg-white border-gray-300 text-gray-500  items-center px-2 py-2 border text-sm font-medium cursor-pointer no-underline"
                }
                onClick={() => {
                  props?.setPageNo(index + 1);
                  props?.setSkip(index * props?.limit);
                }}
              >
                {index + 1}
              </button>
            ))}
          </>
        )}
        <button
          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-2 py-2 border text-sm font-medium cursor-pointer no-underline"
          disabled
        >
          {(props?.pageNo - 1) * props?.limit + 1} -{" "}
          {Math.min(props?.pageNo * props?.limit, props?.totalCount)} of{" "}
          {props?.totalCount}
        </button>
        <button
          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-1.5 py-1.5 border text-sm font-medium cursor-pointer"
          title="Go to next"
          aria-label="Previous"
          disabled={props.pageNo >= Number(props?.numPages)}
          onClick={() => {
            props?.pageNo < props?.numPages &&
              props?.setPageNo(props?.pageNo + 1);
            props?.setSkip(props?.skip + Number(props?.limit));
          }}
        >
          <span className="sr-only">Next</span>
          {/* <img src={rightlinearrow} /> */}
          <svg
            id="Right_Arrow_Line_Icon"
            data-name="Right Arrow Line Icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <g id="invisible_box" data-name="invisible box">
              <rect
                id="Rectangle_4415"
                data-name="Rectangle 4415"
                width="20"
                height="20"
                fill="none"
              />
            </g>
            <g
              id="icons_Q2"
              data-name="icons Q2"
              transform="translate(6.65 4.167)"
            >
              <path
                id="Path_208"
                data-name="Path 208"
                d="M20.643,15.834l-4.417,4.417a.792.792,0,0,0,.083,1.25.875.875,0,0,0,1.125-.083l4.958-5a.792.792,0,0,0,0-1.167l-4.958-5a.875.875,0,0,0-1.125-.083.792.792,0,0,0-.083,1.25Z"
                transform="translate(-15.959 -10.001)"
                fill="#5b5b5b"
              />
            </g>
          </svg>
        </button>
        <button
          className="relative inline-flex items-center px-1.5 py-1.5 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
          title="Go to last page"
          onClick={() => {
            props.setPageNo(props.numPages);
            props.setSkip((props.numPages - 1) * props.limit);
          }}
        >
          <span className="sr-only">Next 10 record</span>
          {/* <img src={rightdoublearrow} /> */}
          <svg
            id="Right_Double_Arrow_Icon"
            data-name="Right Double Arrow Icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <g
              id="invisible_box"
              data-name="invisible box"
              transform="translate(-0.145 -0.145)"
            >
              <rect
                id="Rectangle_4413"
                data-name="Rectangle 4413"
                width="20"
                height="20"
                transform="translate(0.145 0.145)"
                fill="none"
              />
              <rect
                id="Rectangle_4414"
                data-name="Rectangle 4414"
                width="20"
                height="20"
                transform="translate(0.145 0.145)"
                fill="none"
              />
            </g>
            <g
              id="icons_Q2"
              data-name="icons Q2"
              transform="translate(4.065 4.083)"
            >
              <path
                id="Path_206"
                data-name="Path 206"
                d="M26.711,15.918,22.23,20.4a.8.8,0,0,0,.085,1.268.888.888,0,0,0,1.141-.085l5.03-5.072a.8.8,0,0,0,0-1.184l-5.03-5.072a.888.888,0,0,0-1.141-.085.8.8,0,0,0-.085,1.268Z"
                transform="translate(-16.887 -10.001)"
                fill="#5b5b5b"
              />
              <path
                id="Path_207"
                data-name="Path 207"
                d="M14.711,15.918,10.23,20.4a.8.8,0,0,0,.085,1.268.888.888,0,0,0,1.141-.085l5.03-5.072a.8.8,0,0,0,0-1.184l-5.03-5.072a.888.888,0,0,0-1.141-.085.8.8,0,0,0-.085,1.268Z"
                transform="translate(-9.959 -10.001)"
                fill="#5b5b5b"
              />
            </g>
          </svg>
        </button>
      </nav>
    </>
  );
};

export default Pagination;
