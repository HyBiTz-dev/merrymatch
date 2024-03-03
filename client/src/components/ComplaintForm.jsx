import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  issue: Yup.string()
    .required("Issue topic is required")
    .max(255, "Must be at most 255 characters long"),
  description: Yup.string()
    .required("Please describe your issue")
    .max(1024, "Must be at most 1024 characters long"),
});

const ComplaintForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ issue: "", description: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col">
          <label htmlFor="issue" className="text-black text-base mb-1">
            Issue
            <ErrorMessage
              name="issue"
              component="span"
              className="text-red-500 text-xs italic ml-1"
            />
          </label>
          <Field
            as="input"
            id="issue"
            type="text"
            name="issue"
            placeholder="Max 255 characters"
            className={`bg-white border-solid border ${
              errors.issue && touched.issue
                ? "border-red-500"
                : "border-gray-400"
            } rounded-lg p-3 w-[28.3rem] mb-10 placeholder-gray-600 focus:outline-none focus:border-purple-600 text-black`}
          />
          <label htmlFor="description" className="text-black text-base mb-1">
            Description
            <ErrorMessage
              name="description"
              component="span"
              className="text-red-500 text-xs italic ml-1"
            />
          </label>
          <Field
            as="textarea"
            id="description"
            name="description"
            placeholder="Max 1024 characters"
            className={`bg-white border-solid border ${
              errors.description && touched.description
                ? "border-red-500"
                : "border-gray-400"
            } rounded-lg p-3 w-[28.3rem] h-[12rem] mb-10 placeholder-gray-600 focus:outline-none focus:border-purple-600 text-black`}
          />
          <button
            type="submit"
            className="btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white border-none rounded-3xl w-[6.375rem] h-12 font-bold mt-10 mb-10 drop-shadow-[2px_2px_12px_0_rgba(64,50,133,0.16)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ComplaintForm;
