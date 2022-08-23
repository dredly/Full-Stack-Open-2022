import { HealthCheckRating, EntryFormValuesHealthCheck } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Formik } from "formik";
import { Grid, Button } from "@material-ui/core";

import { Form, Field } from "formik";
import { TextField, SelectField, HealthCheckRatingOption } from "../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: EntryFormValuesHealthCheck) => void;
  onCancel: () => void;
}

const hcrOptions: HealthCheckRatingOption[] = [
	{value: HealthCheckRating.Healthy, label: 'Healthy'},
	{value: HealthCheckRating.LowRisk, label: 'Low Risk'},
	{value: HealthCheckRating.HighRisk, label: 'High Risk'},
	{value: HealthCheckRating.CriticalRisk, label: 'Critical Risk'},
];

const AddEntryFormHealthCheck = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnoses }] = useStateValue();

	return (
		<Formik
			initialValues={{
				description: "",
				date: "",
				specialist: "",
				diagnosisCodes: [],
				healthCheckRating: 0,
				type: "HealthCheck",
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				const errors: { [field: string]: string } = {};
				const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!dateRegex.test(values.date)) {
					errors.date = 'Date must be format YYYY-MM-DD';
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (![0, 1, 2, 3].includes(values.healthCheckRating)) {
					errors.healthCheckRating = requiredError;
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
						<SelectField label="Health Check Rating" name="healthCheckRating" options={hcrOptions} />
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

export default AddEntryFormHealthCheck;