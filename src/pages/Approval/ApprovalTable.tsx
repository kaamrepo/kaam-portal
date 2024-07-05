import { useEffect, useState } from "react";
import Table, { ColumnDef } from "../../common/Table/Table";
import useLoginStore from "../../store/login.store";
import useApprovalStore from "../../store/approval.store";

export const ApprovalTable = ({ searchInput }: { searchInput?: string }) => {
  const { user } = useLoginStore();
  const {getApprovals,approvals,totalCount} = useApprovalStore()
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState<Number>(0);
  const [searchOn, setSearchOn]: any = useState({
    excludeIds: user._id,
    isActive: true,
  });
  console.log("totalCount",totalCount);
  const handleApproval = (user: User) => {

    setIsModalOpen(true);
  };
  useEffect(() => {
    if (searchInput) {
        getApprovals({
        skip: Number(skip),
        limit: limit,
        // searchOn: {
        //   wildString: searchInput,
        //   excludeIds: user._id,
        //   isActive: true,
        // },
      });
    //   setSearchOn({
    //     wildString: searchInput,
    //     excludeIds: user._id,
    //     isActive: true,
    //   });
    }
  }, [])
  useEffect(() => {
    getApprovals();
  }, []);
  const tableColumnDef: ColumnDef[] = [
    {
      key: ``,
      label: "Requestor",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">{`${row?.userDetails?.firstname} ${row?.userDetails?.lastname}`}</span>
        </div>
      ),
    },
    {
      key: ``,
      label: "Phone",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">{`${row?.userDetails?.phone}`}</span>
        </div>
      ),
    },

    {
        key: ``,
        label: "Available posting",
        type: "string",
        render: (row) => (
          <div>
            <span className="flex justify-center truncate ...">{`${row?.userDetails?.allowedjobposting}`}</span>
          </div>
        ),
      },
    {
        key: ``,
        label: "Requested posting",
        type: "string",
        render: (row) => (
          <div>
            <span className="flex justify-center truncate ...">{`${row?.requestedjobposting}`}</span>
          </div>
        ),
      },
    {
      key: ``,
      label: "Available Applicaiton",
      type: "string",
      render: (row) => (
        <div>
        <span className="flex justify-center truncate ...">{`${row?.userDetails?.allowedjobapplication}`}</span>
        </div>
      ),
    },
    {
      key: ``,
      label: "Requested Applicaiton",
      type: "string",
      render: (row) => (
        <div>
         <span className="flex justify-center truncate ...">{`${row?.requestedjobapplication}`}</span>
        </div>
      ),
    },
    {
      key: ``,
      label: "Action",
      type: "string",
      render: (row) => (
        <>
        <button
            className="flex items-center justify-center rounded-md bg-meta-3 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
            onClick={() => handleApproval(row)}
          >
            {row?.status}
          </button>
      </>
      ),
    },
   
  ];
  return (
    <div className="rounded-sm border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="">
        <Table
          columns={tableColumnDef}
          data={approvals ?? []}
          totalCount={totalCount}
        //   pageable={true}
        //   searchInput={searchOn}
          APIcall={getApprovals}
          limit={limit}
          onChangeLimit={setLimit}
          skip={skip}
          setSkip={setSkip}
        />
      </div>
    </div>
  );
};
