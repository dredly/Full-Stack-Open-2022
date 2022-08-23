import { EntryFormValuesOccupational} from "../types";
import { xor } from "../utils";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Formik } from "formik";
import { Grid, Button } from "@material-ui/core";

import { Form, Field } from "formik";
import { TextField } from "../AddPatientModal/FormField";



interface Props {
  onSubmit: (values: EntryFormValuesOccupational) => void;
  onCancel: () => void;
}

const AddEntryFormOccupational = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnoses }] = useStateValue();

	//To shut eslint up
	console.log(onSubmit, onCancel);
	return (
		<Formik
			initialValues={{
				description: "",
				date: "",
				specialist: "",
				diagnosisCodes: [],
				employerName: "",
				isSickLeave: false,
				sickLeaveStartDate: "",
				sickLeaveEndDate: "",
				type: "OccupationalHealthcare"
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				const dateInvalidError = 'Date must be format YYYY-MM-DD';
				const errors: { [field: string]: string } = {};
				const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!dateRegex.test(values.date)) {
					errors.date = dateInvalidError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.employerName) {
					errors.employerName = requiredError;
				}
				if (values.sickLeaveStartDate && !dateRegex.test(values.sickLeaveStartDate)) {
					errors.sickLeaveStartDate = dateInvalidError;
				}
				if (values.sickLeaveEndDate && !dateRegex.test(values.sickLeaveEndDate)) {
					errors.sickLeaveEndDate = dateInvalidError;
				}
				if(xor(values.sickLeaveStartDate, values.sickLeaveEndDate)) {
					errors.sickLeaveEndDate = 'You must select both a start and end date if theres is sick leave';
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
				return (
					<Form className="form ui">
						<Field
							label="Description"
							placeholder="description"
							name="description"
							component={TextField}
						/>
						<Field
							label="Date"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<Field
							label="Specialist"
							placeholder="specialist"
							name="specialist"
							component={TextField}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>
						<Field
							label="Employer Name"
							placeholder="Employer name"
							name="employerName"
							component={TextField}
						/>
						<label>
							<Field type="checkbox" name="isSickLeave" />
							Sick leave?
						</label>
						{values.isSickLeave
							? <>
								<Field
									label="Start of sick leave"
									placeholder="YYYY-MM-DD"
									name="sickLeaveStartDate"
									component={TextField}
								/>
								<Field
									label="End of sick leave"
									placeholder="YYYY-MM-DD"
									name="sickLeaveEndDate"
									component={TextField}
								/>
							</>
							: null
						}
						<Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="contained"
									style={{ float: "left" }}
									type="button"
									onClick={onCancel}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									style={{
										float: "right",
									}}
									type="submit"
									variant="contained"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryFormOccupational;