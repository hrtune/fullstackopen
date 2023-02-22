import { useState } from "react";
import { Entry, EntryWithoutId, Discharge, Diagnosis } from "../types";
import patientService from "../services/patients";
import { AlertColor } from "@mui/material";
import { AxiosError } from "axios";

interface Props {
  id: string;
  addEntry: (entry: Entry) => void;
  setAlert: (severity: AlertColor, message: string) => void;
  cancel: () => void;
  diagnoses: Diagnosis[];
}
const NewHospitalEntry = ({
  id,
  addEntry,
  setAlert,
  cancel,
  diagnoses,
}: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [code, setCode] = useState<Diagnosis["code"]>("");
  const [codes, setCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });

  const allCodes = diagnoses.map((d) => d.code);

  const formStyle = {
    borderStyle: "dashed",
    padding: "10px",
    margin: "15px 5px",
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: EntryWithoutId = {
      type: "Hospital",
      date,
      description,
      specialist,
      discharge,
    };

    console.log("adding:", newEntry);

    if (codes.length) {
      newEntry.diagnosisCodes = codes;
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
      <h4>New Hospital entry</h4>
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
          Discharge:
          <br />
          date:{" "}
          <input
            name="dischargeDate"
            type="date"
            value={discharge.date}
            onChange={(e) =>
              setDischarge({
                ...discharge,
                date: e.target.value,
              })
            }
          />{" "}
          criteria:{" "}
          <input
            name="criteria"
            type="text"
            value={discharge.criteria}
            onChange={(e) =>
              setDischarge({
                ...discharge,
                criteria: e.target.value,
              })
            }
          />
        </div>
        <div>
          Diagnosis codes:{" "}
          <select value={code} onChange={(e) => setCode(e.target.value)}>
            <option key="default" value="">
              --- select code ---
            </option>
            {allCodes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              if (code && !codes.includes(code)) {
                setCodes(codes.concat(code));
                setCode("");
              }
            }}
          >
            add code
          </button>
          <button type="button" onClick={() => setCodes([])}>
            clear
          </button>
        </div>
        <div>{codes.join(", ")}</div>
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

export default NewHospitalEntry;
