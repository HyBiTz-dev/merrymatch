import { useState, useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import ComplaintStatus from "./ComplaintStatus";

const ComplaintTable = ({ selectedStatus, searchText }) => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("user_complaint")
          .select("*");

        if (error) {
          throw error;
        }

        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        const formattedData = sortedData.map((complaint) => ({
          ...complaint,
          created_at: new Date(complaint.created_at).toLocaleDateString(),
        }));

        setComplaints(formattedData);
      } catch (error) {
        console.error("Error fetching data from Supabase:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = async (complaintId, complaintStatus) => {
    if (complaintStatus === "New") {
      try {
        await supabase
          .from("user_complaint")
          .update({ complaint_status: "Pending" })
          .eq("id", complaintId);
      } catch (error) {
        console.error("Error updating status:", error.message);
        return;
      }
    }

    navigate(`/admin/complaint-details/${complaintId}`);
  };

  return (
    <div className="bg-gray-100 flex justify-center  h-[73.5rem]">
      <div className="pl-14 pr-14 pt-12 w-[75rem]">
        <div className="overflow-auto text-black font-medium rounded-2xl h-[58.813rem] scrollbar-hide">
          <table className="table">
            <thead className="bg-gray-400 sticky top-0">
              <tr className="border-gray-200 text-gray-800 font-medium">
                <th className="w-[10.25rem] px-10 py-[0.625rem]">User</th>
                <th className="w-[12.5rem]">Issue</th>
                <th className="w-[26.25rem]">Description</th>
                <th className="w-[10.25rem]">Date Submitted</th>
                <th className="w-[8.25rem]">Status</th>
              </tr>
            </thead>
            <tbody className="font-normal">
              {complaints
                .filter(
                  (complaint) =>
                    (selectedStatus
                      ? complaint.complaint_status === selectedStatus
                      : true) &&
                    (searchText
                      ? complaint.user_name
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                        complaint.complaint_issue
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                        complaint.complaint_description
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                        complaint.created_at
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      : true)
                )
                .map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="bg-white h-[5.625rem] rounded-b-2xl border-gray-200"
                    onClick={() =>
                      handleRowClick(complaint.id, complaint.complaint_status)
                    }
                  >
                    <td className="w-[10.25rem] px-10 py-[0.625rem]">
                      {complaint.user_name}
                    </td>
                    <td>
                      {complaint.complaint_issue.length > 20
                        ? `${complaint.complaint_issue.substring(0, 20)}...`
                        : complaint.complaint_issue}
                    </td>
                    <td>
                      {complaint.complaint_description.length > 40
                        ? `${complaint.complaint_description.substring(
                            0,
                            40
                          )}...`
                        : complaint.complaint_description}
                    </td>
                    <td>{complaint.created_at}</td>
                    <td>
                      <ComplaintStatus status={complaint.complaint_status} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTable;
