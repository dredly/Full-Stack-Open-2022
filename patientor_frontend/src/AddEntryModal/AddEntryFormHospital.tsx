import { EntryFormValuesHospital} from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Formik } from "formik";
import { Grid, Button } from "@material-ui/core";

import { Form, Field } from "formik";
import { TextField } from "../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: EntryFormValuesHospital) => void;
  onCancel: () => void;
}

const AddEntryFormHospital = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnoses }] = useStateValue();

	return <Formik
		initialValues={{
			description: "",
			date: "",
			specialist: "",
			diagnosisCodes: [],
			dischargeDate: "",
			dischargeCriteria: "",
			type: "Hospital"
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
			if (!dateRegex.test(values.dischargeDate)) {
				errors.dischargeDate = dateInvalidError;
			}
			if (!values.dischargeCriteria) {
				errors.dischargeCriteria = requiredError;
			}
			return errors;
		}}
	>
		{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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
						label="Discharge Date"
						placeholder="YYYY-MM-DD"
						name="dischargeDate"
						component={TextField}
					/>
					<Field
						label="Discharge Criteria"
						placeholder="discharge criteria"
						name="dischargeCriteria"
						component={TextField}
					/>
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
	</Formik>;
};

export default AddEntryFormHospital;