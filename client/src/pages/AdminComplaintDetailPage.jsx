import { useState, useEffect } from "react";
import SideBarAdmin from "../components/SideBarAdmin";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import ComplaintStatus from "../components/ComplaintStatus";
import Button from "../components/Button";
import AlertModal from "../components/Modal/AlertModal";
import axios from "axios";

function AdminComplaintDetailPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/filing-complaint/admin/complaint-list/${id}`
        );
        setComplaint(data.data);

        // const { data, error } = await supabase
        //   .from("user_complaint")
        //   .select("*")
        //   .eq("id", id)
        //   .single();

        // if (error) {
        //   throw error;
        // }

        // if (data) {
        //   setComplaint(data);
        // }
      } catch (error) {
        console.error("Error fetching complaint:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleUpdate = async (status) => {
    try {
      await axios.post(
        `http://localhost:3000/filing-complaint/admin/complaint-list/${id}`,
        { complaint_status: status, updated_at: new Date().toISOString() }
      );
      // const { error } = await supabase
      //   .from("user_complaint")
      //   .update({
      //     complaint_status: status,
      //     updated_at: new Date().toISOString(),
      //   })
      //   .eq("id", id);

      // if (error) {
      //   throw error;
      // }
      window.location.reload();
      setIsCancelModalOpen(false);
      setIsResolveModalOpen(false);
    } catch (error) {
      console.error("Error updating complaint:", error.message);
    }
  };

  const handleCloseModal = () => {
    setIsCancelModalOpen(false);
    setIsResolveModalOpen(false);
  };

  const showFullIssue = () => {
    alert(complaint.complaint_issue);
  };

  const returnToComplaintList = () => {
    navigate("/admin/complaint-list");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!complaint) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="flex h-screen bg-white w-full overflow-hidden">
      <SideBarAdmin />
      <div className="w-full">
        <div className="h-20 flex items-center border-b border-b-gray-400">
          <div className="flex items-center pl-14 pr-14 w-full">
            <img
              className="w-[1.5rem] mr-6 cursor-pointer"
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
            <span className="ml-6 ">
              <ComplaintStatus status={complaint.complaint_status} />
            </span>
            {complaint.complaint_status === "Pending" && (
              <div className="flex gap-2 ml-auto">
                <Button
                  ghost
                  type="button"
                  onClick={() => setIsCancelModalOpen(true)}
                  className="text-red-500 rounded-[6rem] w-fit"
                >
                  Cancel Complaint
                </Button>
                <Button
                  primary
                  type="button"
                  onClick={() => setIsResolveModalOpen(true)}
                  className=" text-white rounded-[6rem] w-fit shadow-md"
                  style={{
                    boxShadow: "2px 2px 12px 0px rgba(64, 50, 133, 0.41)",
                  }}
                >
                  Resolve Complaint
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-100 flex justify-center">
          <div className="pl-14 pr-14 pt-12 w-[75rem]">
            <div className="overflow-auto text-black font-medium rounded-2xl h-[58.813rem]">
              <div className="flex flex-col items-center bg-white gap-10 h-auto pt-10 pb-20 rounded-b-2xl border-2 border-gray-200">
                <div className="flex text-center w-[55rem] border-b border-solid border-gray-300 pb-10">
                  <span className="text-body1 text-20px font-semibold leading-30px tracking-normal text-left text-gray-700">
                    {`Complaint by: `}
                    <span className="text-16px font-normal text-black">
                      {complaint.user_name}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col w-[55rem] gap-2">
                    <span className="text-body1 text-20px font-semibold leading-30px tracking-normal text-left text-gray-700">{`Issue`}</span>
                    <div className="overflow-auto scrollbar-hide">
                      <p className="text-16px font-normal whitespace-nowrap text-black">
                        {complaint.complaint_issue}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-[55rem] min-h-fit max-h-60 gap-2">
                    <span className="text-body1 text-20px font-semibold leading-30px tracking-normal text-left text-gray-700">{`Description`}</span>
                    <div className="overflow-auto scrollbar-hide">
                      <p className="text-16px font-normal w-[55rem] text-black">
                        {complaint.complaint_description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-[55rem] gap-2">
                    <span className="text-body1 text-20px font-semibold leading-30px tracking-normal text-left text-gray-700">{`Date Submitted`}</span>
                    <p className="text-16px font-normal text-black">
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {complaint.complaint_status === "Cancel" ? (
                    <div className="flex flex-col w-[55rem] gap-2 border-t border-solid border-gray-300 pt-10">
                      <span className="text-body1 text-20px font-semibold leading-30px tracking-normal text-left text-gray-700">{`Canceled Date`}</span>
                      <p className="text-16px font-normal text-black">
                        {`${new Date(
                          complaint.updated_at
                        ).toLocaleDateString()} ${new Date(
                          complaint.updated_at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}`}
                      </p>
                    </div>
                  ) : complaint.complaint_status === "Resolved" ? (
                    <div className="flex flex-col w-[55rem] gap-2 border-t border-solid border-gray-300 pt-10">
                      <span className="text-body1 text-20px font-semibold leading-30px tracking-normal text-left text-gray-700">{`Resolved Date`}</span>
                      <p className="text-16px font-normal text-black">
                        {`${new Date(
                          complaint.updated_at
                        ).toLocaleDateString()} ${new Date(
                          complaint.updated_at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}`}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertModal
        isOpen={isCancelModalOpen}
        onClose={handleCloseModal}
        isConfirm={() => handleUpdate("Cancel")}
        CancelResolveModal={true}
      ></AlertModal>

      <AlertModal
        isOpen={isResolveModalOpen}
        onClose={handleCloseModal}
        isConfirm={() => handleUpdate("Resolved")}
        ResolveModal={true}
      ></AlertModal>
    </div>
  );
}

export default AdminComplaintDetailPage;
