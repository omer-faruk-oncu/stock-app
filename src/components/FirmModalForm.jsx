import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { object, string, number } from "yup";
import { Form } from "formik";
import useStockRequest from "../services/useStockRequest";

export const firmSchema = object({
  name: string().required("Firma adı zorunludur"),
  phone: number().required("Firma telefonu zorunludur"),
  address: string().required("Firma adresi zorunludur"),
  image: string(),
});

const FirmModalForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isEditing,
  setSubmitting,
  handleSubmit,
}) => {
  const { createFirm, updateFirm } = useStockRequest();

  // const handleSubmit = (e) => {
  //   if (isEditing) {
  //     updateFirm(values._id, values);
  //   } else {
  //     createFirm(values);
  //   }
  // };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Firm Name"
          name="name"
          id="name"
          type="text"
          variant="outlined"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          label="Firm Phone"
          name="phone"
          id="phone"
          type="text"
          //pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
          variant="outlined"
          value={values.phone}
          onChange={handleChange}
        />
        <TextField
          label="address"
          name="address"
          id="address"
          type="text"
          variant="outlined"
          value={values.address}
          onChange={handleChange}
        />
        <TextField
          label="Firm Image"
          name="image"
          id="image"
          type="text"
          variant="outlined"
          value={values.image}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={() => createFirm(values)}
        >
          {isEditing ? "Update Firm" : "Add Firm"}
        </Button>
      </Box>
    </Form>
  );
};

export default FirmModalForm;
