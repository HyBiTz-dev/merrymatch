import { useState } from "react";
import SideBarAdmin from "../components/SidebarAdmin";
import SelectStatus from "../components/SelectStatus";
import ComplaintTable from "../components/ComplaintTable";

function AdminComplaintListPage() {
  const [filterOptions, setFilterOptions] = useState({
    selectedStatus: "",
    searchText: "",
  });

  const handleFilterChange = (selectedStatus) => {
    setFilterOptions({ ...filterOptions, selectedStatus });
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setFilterOptions({ ...filterOptions, searchText });
  };

  return (
    <div className="flex bg-white w-full h-[78.5rem]">
      <SideBarAdmin />
      <div className="w-full">
        <div className="h-20 flex items-center border-b border-b-gray-400">
          <span className="font-bold text-2xl text-gray-900 pl-14 pr-14 w-full">
            Complaint List
          </span>
          <div className="flex">
            <div className="relative pr-4">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered focus:border-purple-500 w-80 max-w-xs pl-12 bg-inherit border-gray-400"
                onChange={handleSearchChange}
                value={filterOptions.searchText}
              />
              <img
                src="/images/search.svg"
                alt="search icon"
                className="absolute flex items-center inset-y-3 left-0 pl-4"
              />
            </div>
            <SelectStatus
              selectedStatus={filterOptions.selectedStatus}
              onSelectStatus={handleFilterChange}
            />
          </div>
        </div>
        <ComplaintTable
          selectedStatus={filterOptions.selectedStatus}
          searchText={filterOptions.searchText}
        />
      </div>
    </div>
  );
}

export default AdminComplaintListPage;
