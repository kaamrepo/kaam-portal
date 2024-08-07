import { useEffect, useState } from "react";
import Table, { ColumnDef } from "../../common/Table/Table";
import useLoginStore from "../../store/login.store";
import useApprovalStore from "../../store/approval.store";
import { ApprovalModal } from "./ApprovalModal";
import { User } from "../../types/user.types"; // Adjust import based on your project structure
import moment from "moment";

export const ApprovalTable = ({ searchInput }: { searchInput?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State for selected user
  const { user } = useLoginStore();
  const { getApprovals, approvals, totalCount } = useApprovalStore();
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState<Number>(0);
  const [searchOn, setSearchOn] = useState({
    excludeIds: user._id,
    isActive: true,
  });

  useEffect(() => {
    if (searchInput) {
      getApprovals({
        skip: Number(skip),
        limit: limit,
      });
    }
  }, [searchInput, skip, limit, getApprovals]);

  useEffect(() => {
    getApprovals();
  }, [getApprovals]);

  const handleApproval = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeUserActivityModal = () => {
    setIsModalOpen(false);
  };

  const tableColumnDef: ColumnDef[] = [
    {
      key: "",
      label: "Requestor",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">{`${row?.userDetails?.firstname} ${row?.userDetails?.lastname}`}</span>
        </div>
      ),
    },
    {
      key: "",
      label: "Phone",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">{`${row?.userDetails?.phone}`}</span>
        </div>
      ),
    },
    {
      key: "",
      label: "Available posting",
      type: "string",
      render: (row) => (
        <div>
          <span className="flex justify-center truncate ...">{`${row?.userDetails?.allowedjobposting}`}</span>
        </div>
      ),
    },
    {
      key: "",
      label: "Requested posting",
      type: "string",
      render: (row) => (
        <div>
          <span className="flex justify-center truncate ...">{`${row?.requestedjobposting ? row?.requestedjobposting : 0}`}</span>
        </div>
      ),
    },
    {
      key: "",
      label: "Available Application",
      type: "string",
      render: (row) => (
        <div>
          <span className="flex justify-center truncate ...">{`${row?.userDetails?.allowedjobapplication}`}</span>
        </div>
      ),
    },
    {
      key: "",
      label: "Raised on",
      type: "string",
      render: (row) => (
        <div className="overflow-x-auto">
          <span className="npm whitespace-nowrap">
            {`${moment(row?.createdat).format('MM/DD/YYYY hh:mm a')}`}
          </span>
        </div>
      ),
    },
    {
      key: "",
      label: "Requested Application",
      type: "string",
      render: (row) => (
        <div>
          <span className="flex justify-center truncate ...">{`${row?.requestedjobapplication ? row?.requestedjobapplication : 0}`}</span>
        </div>
      ),
    },
    {
      key: "",
      label: "Action",
      type: "string",
      render: (row) => (
        <>
          <button
            className="flex items-center justify-center rounded-md bg-meta-3 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
            onClick={() => handleApproval(row)}
          >
            Approve
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
          APIcall={getApprovals}
          limit={limit}
          onChangeLimit={setLimit}
          skip={skip}
          setSkip={setSkip}
        />
        <ApprovalModal
          isOpen={isModalOpen}
          onClose={closeUserActivityModal}
          user={selectedUser}
        />
      </div>
    </div>
  );
};
