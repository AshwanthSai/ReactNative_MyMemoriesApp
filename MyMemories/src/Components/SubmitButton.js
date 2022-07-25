import React from "react";
import AppButton from "./AppButton";

import { useFormikContext } from "formik";

function SubmitButton({ title, marginTop, loading, width }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      loading={loading}
      marginTop={marginTop}
      title={title}
      onPress={handleSubmit}
      width={width}
    />
  );
}

export default SubmitButton;
