import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../Components/AppTextInput";
import colors from "../config/colors";
import ValidationErrorMessage from "./ValidationErrorMessage";

function AppFromField({
  name,
  editable,
  width,
  label,
  labelFontFamily = "Poppins_Medium",
  onRightIconPress,
  alignItems,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, touched, errors } = useFormikContext();
  //handling formik methods, same methods for get input data
  return (
    <>
      <AppTextInput
        alignItems={alignItems}
        onRightIconPress={onRightIconPress}
        onBlur={() => setFieldTouched(name)}
        backgroundColor={colors.white}
        //Sets input data in formik using formik context hook
        onChangeText={handleChange(name)}
        width={width}
        editable={editable}
        {...otherProps}
      />
      {/* this will show error if input text not match with validation schema */}
      <ValidationErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFromField;
