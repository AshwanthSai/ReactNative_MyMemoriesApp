import React from "react";
import { Formik } from "formik";

function AppForm({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  enableReinitialize,
}) {
  //formik wrapper component, encloses the input in every form.
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
