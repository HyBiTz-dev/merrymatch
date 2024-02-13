import { Formik, Field, Form } from "formik";

const ComplaintForm = ({ onSubmit }) => {
  const initialValues = {
    issue: "",
    description: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="flex flex-col">
        <label htmlFor="issue" className="text-black text-base">
          Issue
        </label>
        <Field
          as="input"
          id="issue"
          type="text"
          name="issue"
          placeholder="Placeholder"
          className="bg-white border-solid border-[1px] rounded-lg border-gray-400 p-3 w-[28.3rem] mb-10 placeholder-gray-600 focus:outline-none focus:border-purple-600 text-black"
        />
        <label htmlFor="description" className="text-black text-base">
          Description
        </label>
        <Field
          as="textarea"
          id="description"
          name="description"
          placeholder="Placeholder"
          className="inline-block bg-white border-solid border-[1px] rounded-lg border-gray-400 p-3 w-[28.3rem] h-[14rem] mb-10 placeholder-gray-600 focus:outline-none focus:border-purple-600 text-black"
        />
        <button
          type="submit"
          className="btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white border-none rounded-3xl w-[6.375rem] h-12 font-bold mt-10 mb-10 drop-shadow-[2px_2px_12px_0_rgba(64,50,133,0.16)]"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default ComplaintForm;
