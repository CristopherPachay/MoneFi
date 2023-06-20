import * as Yup from "yup";

const borrowerSchema = Yup.object().shape({
  userId: Yup.number().required("UserId value must be provided"),
  ssn: Yup.string().max(20).required("SSN value must be provided"),
  statusId: Yup.number().required("Status value must be provided"),
  annualIncome: Yup.number().required("Annual Income value must be provided"),
  locationId: Yup.number().required("Location value must be provided"),
  id: Yup.number().required("Id value must be provided"),
});

export default borrowerSchema;
