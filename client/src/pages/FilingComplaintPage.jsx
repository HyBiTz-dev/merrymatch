import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComplaintForm from "../components/ComplaintForm";
import axios from "axios";
import { useAuth } from "../context/authentication";

function FilingComplaintPage() {
  const { state } = useAuth();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const complaintData = {
      userId: state.id,
      userName: state.name,
      issue: values.issue,
      description: values.description,
    };

    if (!values.issue || !values.description) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/filing-complaint/submit",
        complaintData
      );

      console.log(response);

      if (response.status === 200) {
        console.log("Complaint submitted successfully:", response.data);
        resetForm();
      } else {
        console.error("Failed to submit complaint:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar auth />
      <main>
        <div className="bg-main flex justify-center content-center w-full h-[53.5rem]">
          <div className="flex flex-row mt-20 justify-between content-center w-[70rem] mb-20">
            <div className="flex flex-col justify-center gap-2">
              <p className="text-beige-700 text-sm font-semibold">COMPLAINT</p>
              <h1 className="text-purple-500 text-[2.875rem] font-extrabold leading-[3.5rem] mb-[2.3rem]">
                If you have any trouble <br /> Don't be afraid to tell us!
              </h1>
              <ComplaintForm onSubmit={handleSubmit} />
            </div>
            <img src="/images/login-photo.png" alt="Login Photo" className="" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FilingComplaintPage;
