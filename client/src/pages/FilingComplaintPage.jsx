import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComplaintForm from "../components/ComplaintForm";

function FilingComplaintPage() {
  const handleSubmit = (values, { setSubmitting }) => {
    const complaintForm = {
      issue: values.issue,
      description: values.description,
      submittingDate: new Date().toISOString(),
    };

    console.log("Complaint Info:", complaintForm);
    setSubmitting(false);
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
