import React from "react";
import { Entry } from "../types";
import HealthCheckDetails from "./EntryDetailComponents/HealthCheckDetails";
import HospitalDetails from "./EntryDetailComponents/HospitalDetails";
import OccupationalHealthcareDetails from "./EntryDetailComponents/OccupationalHealthcareDetails";
import { assertNever } from "../utils";

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
	switch (entry.type) {
	case "HealthCheck":
		return <HealthCheckDetails entry={entry} />;
	case "Hospital":
		return <HospitalDetails entry={entry} />;
	case "OccupationalHealthcare":
		return <OccupationalHealthcareDetails entry={entry} />;
	default:
		return assertNever(entry);
	}
};

export default EntryDetails;