import { useEffect, useState } from "react";
import useUserStore from "../../store/user.store";
import Table, { ColumnDef } from "../../common/Table/Table";
import useLoginStore from "../../store/login.store";
import useApprovalStore from "../../store/approval.store";

export const ApprovalTable = ({ searchInput }: { searchInput?: string }) => {
  const { user } = useLoginStore();
  const {getApprovals,approvals} = useApprovalStore()
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState<Number>(0);
  const [searchOn, setSearchOn]: any = useState({
    excludeIds: user._id,
    isActive: true,
  });
  const { getUser, users, totalCount } = useUserStore();
  useEffect(() => {
    if (searchInput) {
      getUser({
        skip: Number(skip),
        limit: limit,
        searchOn: {
          wildString: searchInput,
          excludeIds: user._id,
          isActive: true,
        },
      });
      setSearchOn({
        wildString: searchInput,
        excludeIds: user._id,
        isActive: true,
      });
    }
  }, [searchInput, setSearchOn])
  useEffect(() => {
    getApprovals();
  }, []);
  const tableColumnDef: ColumnDef[] = [
    {
      key: ``,
      label: "Requestor",
      type: "string",
      render: (row: { firstname: string; lastname: string }) => (
        <div>
          <span className="truncate ...">{`${row.firstname} ${row.lastname}`}</span>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      type: "string",
    },
    {
        key: ``,
        label: "Available posting",
        type: "string",
        render: (row: { firstname: string; lastname: string }) => (
          <div>
            <span className="truncate ...">{`${row.firstname} ${row.lastname}`}</span>
          </div>
        ),
      },
    {
        key: ``,
        label: "Requested posting",
        type: "string",
        render: (row: { firstname: string; lastname: string }) => (
          <div>
            <span className="truncate ...">{`${row.firstname} ${row.lastname}`}</span>
          </div>
        ),
      },
    {
      key: ``,
      label: "Available Applicaiton",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">{row.isactive ? "Yes" : "No"}</span>
        </div>
      ),
    },
    {
      key: ``,
      label: "Requested Applicaiton",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">{row.isactive ? "Yes" : "No"}</span>
        </div>
      ),
    },
    {
      key: ``,
      label: "Action",
      type: "string",
      render: (row) => (
        <div>
          <span className="truncate ...">{row.isactive ? "Yes" : "No"}</span>
        </div>
      ),
    },
   
  ];
  return (
    <div className="rounded-sm border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="">
        <Table
          columns={tableColumnDef}
          data={users ?? []}
          totalCount={totalCount}
          pageable={true}
          searchInput={searchOn}
          APIcall={getUser}
          limit={limit}
          onChangeLimit={setLimit}
          skip={skip}
          setSkip={setSkip}
        />
      </div>
    </div>
  );
};
