import { Formik, Field, Form, ErrorMessage } from "formik";

function SelectStatus() {
  const initialValues = {
    status: "",
  };

  return (
    <Formik initialValues={initialValues}>
      <Form>
        <div className="pr-14">
          <Field
            as="select"
            name="status"
            className="border bg-white rounded-lg p-3 w-[12.5rem] text-gray-400 focus:border-purple-500 outline-none border-gray-400"
          >
            <option value="" label="All Status" />
            <option value="new" label="New" />
            <option value="pending" label="Pending" />
            <option value="resolved" label="Resolved" />
            <option value="cancel" label="Cancel" />
          </Field>

          <ErrorMessage name="status" component="div" />
        </div>
      </Form>
    </Formik>
  );
}

export default SelectStatus;
