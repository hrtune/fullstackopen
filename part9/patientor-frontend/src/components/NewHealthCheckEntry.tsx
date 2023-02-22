import { useState } from "react";
import { Entry, EntryWithoutId } from "../types";
import patientService from "../services/patients";
import { AlertColor } from "@mui/material";
import { AxiosError } from "axios";

interface Props {
  id: string;
  addEntry: (entry: Entry) => void;
  setAlert: (severity: AlertColor, message: string) => void;
}
const NewHealthCheckEntry = ({ id, addEntry, setAlert }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [codes, setCodes] = useState<string>("");

  const formStyle = {
    borderStyle: "dashed",
    padding: "10px",
    margin: "15px 5px",
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: EntryWithoutId = {
      type: "HealthCheck",
      description,
      specialist,
      date,
      healthCheckRating: Number(rating),
    };

    console.log("adding:", newEntry);

    if (codes) {
      newEntry.diagnosisCodes = codes.split(",");
    }

    try {
      const data: Entry = await patientService.addEntry(id, newEntry);
      addEntry(data);
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
      <h4>New HealthCheck entry</h4>
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
          Healthcheck rating:{" "}
          <input
            name="rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
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
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewHealthCheckEntry;
