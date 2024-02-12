import SideBarAdmin from "../components/SidebarAdmin";
import SelectStatus from "../components/SelectStatus";

function AdminComplaintListPage() {
  return (
    <div className="flex bg-white w-[90rem]">
      <SideBarAdmin />
      <div className="w-[75rem]">
        <div className="h-20 flex items-center  border-b border-b-gray-400">
          <span className="font-bold text-2xl text-gray-900 pl-14 pr-14 w-full">
            Complaint List
          </span>
          <div className="flex">
            <div className="relative pr-4">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered focus:border-purple-500 w-80 max-w-xs pl-12 bg-inherit border-gray-400"
              />
              <img
                src="/images/search.svg"
                alt="search icon"
                className="absolute flex items-center inset-y-3 left-0 pl-4"
              />
            </div>
            <SelectStatus />
          </div>
        </div>
        <div className="bg-gray-100 flex h-[calc(100vh_-_80px)]">
          <div className="pl-14 pr-14 pt-12 w-[75rem]">
            <div className="overflow-x-auto text-black font-medium rounded-2xl">
              <table className="table">
                <thead className="bg-gray-400">
                  <tr className="border-gray-200 text-gray-800 font-medium">
                    <th className="w-[10.25rem] px-10 py-[0.625rem]">User</th>
                    <th className="w-[12.5rem]">Issue</th>
                    <th className="w-[26.25rem]">Description</th>
                    <th className="w-[10.25rem]">Date Submitted</th>
                    <th className="w-[8.25rem]">Status</th>
                  </tr>
                </thead>
                <tbody className="font-normal">
                  <tr className="bg-white h-[5.625rem] rounded-b-2xl border-gray-200">
                    <td className="w-[10.25rem] px-10 py-[0.625rem]">name</td>
                    <td>iss</td>
                    <td>desc</td>
                    <td>date</td>
                    <td>
                      <button>stats</button>
                    </td>
                  </tr>
                  <tr className="bg-white h-[5.625rem] rounded-b-2xl border-gray-200">
                    <td className="w-[10.25rem] px-10 py-[0.625rem]">name</td>
                    <td>iss</td>
                    <td>desc</td>
                    <td>date</td>
                    <td>
                      <button>stats</button>
                    </td>
                  </tr>
                  <tr className="bg-white h-[5.625rem] rounded-b-2xl border-gray-200">
                    <td className="w-[10.25rem] px-10 py-[0.625rem]">name</td>
                    <td>iss</td>
                    <td>desc</td>
                    <td>date</td>
                    <td>
                      <button>stats</button>
                    </td>
                  </tr>
                  <tr className="bg-white h-[5.625rem] rounded-b-2xl border-gray-200">
                    <td className="w-[10.25rem] px-10 py-[0.625rem]">name</td>
                    <td>iss</td>
                    <td>desc</td>
                    <td>date</td>
                    <td>
                      <button>stats</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintListPage;
