import { useState } from "react";
import { Entry, EntryWithoutId, SickLeave } from "../types";
import patientService from "../services/patients";
import { AlertColor } from "@mui/material";
import { AxiosError } from "axios";

interface Props {
  id: string;
  addEntry: (entry: Entry) => void;
  setAlert: (severity: AlertColor, message: string) => void;
  cancel: () => void;
}
const NewOccupationalHealthcareEntry = ({
  id,
  addEntry,
  setAlert,
  cancel,
}: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [codes, setCodes] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });

  const formStyle = {
    borderStyle: "dashed",
    padding: "10px",
    margin: "15px 5px",
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: EntryWithoutId = {
      type: "OccupationalHealthcare",
      date,
      description,
      specialist,
      employerName,
      sickLeave,
    };

    console.log("adding:", newEntry);

    if (codes) {
      newEntry.diagnosisCodes = codes.split(",");
    }

    try {
      const data: Entry = await patientService.addEntry(id, newEntry);
      addEntry(data);
      cancel();
      setAlert("success", "Entry added successfully");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) setAlert("error", error.response.data);
        else setAlert("error", error.message);
      }
    }
  };

  return (
    <div style={formStyle}>
      <h4>New Occupational healthcare entry</h4>
      <form onSubmit={submit}>
        <div>
          Description:{" "}
          <input
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          Date:{" "}
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          Specialist:{" "}
          <input
            name="specialist"
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        <div>
          Employer name:{" "}
          <input
            name="employerName"
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        </div>
        <div>
          Sick leave:
          <br />
          start date:{" "}
          <input
            name="startDate"
            type="date"
            value={sickLeave.startDate}
            onChange={(e) =>
              setSickLeave({
                ...sickLeave,
                startDate: e.target.value,
              })
            }
          />{" "}
          end date:{" "}
          <input
            name="endDate"
            type="date"
            value={sickLeave.endDate}
            onChange={(e) =>
              setSickLeave({
                ...sickLeave,
                endDate: e.target.value,
              })
            }
          />
        </div>
        <div>
          Diagnosis codes:{" "}
          <input
            name="codes"
            type="text"
            value={codes}
            onChange={(e) => setCodes(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <button onClick={cancel}>cancel</button>
      </div>
    </div>
  );
};

export default NewOccupationalHealthcareEntry;
