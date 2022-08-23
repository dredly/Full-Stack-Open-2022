import { Entry, EntryFormValues } from "../types";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddEntryFormHealthCheck from "./AddEntryFormHealthCheck";
import AddEntryFormHospital from "./AddEntryFormHospital";
import AddEntryFormOccupational from "./AddEntryFormOccupational";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryType: Entry['type']
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, entryType }: Props) => (
	<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
		<DialogTitle>Add a new patient</DialogTitle>
		<Divider />
		<DialogContent>
			{error && <Alert severity="error">{`Error: ${error}`}</Alert>}
			{entryType === "HealthCheck"
				? <AddEntryFormHealthCheck onSubmit={onSubmit} onCancel={onClose}/>
				: entryType === "Hospital"
					? <AddEntryFormHospital onSubmit={onSubmit} onCancel={onClose}/>
					: <AddEntryFormOccupational onSubmit={onSubmit} onCancel={onClose} />
			}
		</DialogContent>
	</Dialog>
);

export default AddEntryModal;