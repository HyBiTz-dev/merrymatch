import { useState, useEffect } from "react";
import SideBarAdmin from "../components/SidebarAdmin";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";

function AdminComplaintDetailPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const { data, error } = await supabase
          .from("user_complaint")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setComplaint(data);
        }
      } catch (error) {
        console.error("Error fetching complaint:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const showFullIssue = () => {
    alert(complaint.complaint_issue);
  };

  const returnToComplaintList = () => {
    navigate("/admin/complaint-list");
  };

  if (loading) {
    return <div>Monkey...</div>;
  }

  if (!complaint) {
    return <div>Donkey...</div>;
  }

  return (
    <div className="flex bg-white w-[90rem] h-[78.5rem]">
      <SideBarAdmin />
      <div className="w-[75rem]">
        <div className="h-20 flex items-center  border-b border-b-gray-400">
          <div className="flex pl-14 pr-14 w-full">
            <img
              className="w-[1.5rem] mr-6"
              src="/images/arrow_back.svg"
              onClick={returnToComplaintList}
            />
            <span
              className="font-bold text-2xl text-gray-900"
              onClick={showFullIssue}
            >
              {complaint.complaint_issue.length > 20
                ? `${complaint.complaint_issue.substring(0, 20)}...`
                : complaint.complaint_issue}
            </span>
            <span className="ml-6">{complaint.complaint_status}</span>
          </div>
        </div>
        <div className="bg-gray-100 flex h-[73.5rem]">
          <div className="pl-14 pr-14 pt-12 w-[75rem]">
            <div className="overflow-auto text-black font-medium rounded-2xl h-[58.813rem]">
              <div className="flex flex-col bg-white h-[31.25rem] rounded-b-2xl border-gray-200">
                <span>{`Complaint by: `}</span>
                <span>{complaint.user_name}</span>
                <span>{`Issue`}</span>
                <span>{complaint.complaint_issue}</span>
                <span>{`Description`}</span>
                <span>{complaint.complaint_description}</span>
                <span>{`Date Submitted`}</span>
                <span>
                  {new Date(complaint.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintDetailPage;
