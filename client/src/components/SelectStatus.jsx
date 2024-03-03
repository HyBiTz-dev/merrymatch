import { Formik, Field, Form, ErrorMessage } from "formik";

function SelectStatus({ selectedStatus, onSelectStatus }) {
  return (
    <Formik
      initialValues={{ status: selectedStatus }}
      onSubmit={(values) => {
        onSelectStatus(values.status);
      }}
    >
      <Form>
        <div className="pr-14">
          <Field
            as="select"
            name="status"
            className="border bg-white rounded-lg p-3 w-[12.5rem] text-gray-400 focus:border-purple-500 outline-none border-gray-400"
            value={selectedStatus}
            onChange={(e) => {
              onSelectStatus(e.target.value);
            }}
          >
            <option value="" label="All Status" />
            <option value="New" label="New" />
            <option value="Pending" label="Pending" />
            <option value="Resolved" label="Resolved" />
            <option value="Cancel" label="Cancel" />
          </Field>

          <ErrorMessage name="status" component="div" />
        </div>
      </Form>
    </Formik>
  );
}

export default SelectStatus;
