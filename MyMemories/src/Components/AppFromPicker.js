import React from "react";
import AppPicker from "./AppPicker";
import { useFormikContext } from "formik";
import ValidationErrorMessage from "./ValidationErrorMessage";

function AppFromPicker({
  name,
  items,
  icon,
  width,
  placeholder,
  PickerItemsComponent,
  numberOfColoms = 1,
}) {
  const { setFieldValue, errors, values, touched } = useFormikContext();

  return (
    <>
      <AppPicker
        items={items}
        numberOfColoms={numberOfColoms}
        placeholder={placeholder}
        onSelectedItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
        width={width}
        icon={icon}
        PickerItemsComponent={PickerItemsComponent}
      />
      <ValidationErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFromPicker;
