import {
  NewPatient,
  Gender,
  Entry,
  Diagnosis,
  EntryWithoutId,
  HealthCheckEntry,
  BaseEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !(
      "name" in object &&
      "dateOfBirth" in object &&
      "ssn" in object &&
      "gender" in object &&
      "occupation" in object &&
      "entries" in object
    )
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };

  return newPatient;
};

export const toNewDiagnosis = (object: unknown): Diagnosis => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (!("code" in object && "name" in object)) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const newDiagnosis: Diagnosis = {
    code: parseCode(object.code),
    name: parseName(object.name),
  };

  if ("latin" in object) {
    newDiagnosis.latin = parseLatin(object.latin);
  }

  return newDiagnosis;
};

type NewBaseEntry = Omit<BaseEntry, "id">;
type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
type NewHospitalEntry = Omit<HospitalEntry, "id">;
type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, "id">;

export const toNewEntry = (object: unknown): EntryWithoutId => {
  const newBaseEntry: NewBaseEntry = toNewBaseEntry(object);

  if (!("type" in newBaseEntry)) {
    throw new Error("Incorrect data: type field is missing");
  }

  if (!isString(newBaseEntry.type)) {
    throw new Error("Incorrect data: type field should be string");
  }

  switch (newBaseEntry.type) {
    case "HealthCheck":
      return toNewHealthCheckEntry(newBaseEntry);
    case "Hospital":
      return toNewHospitalEntry(newBaseEntry);
    case "OccupationalHealthcare":
      return toNewOccupationalHealthcareEntry(newBaseEntry);
    default:
      throw new Error("Incorrect data: type field is wrong");
  }
};

const toNewBaseEntry = (object: unknown): NewBaseEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("description" in object && "date" in object && "specialist" in object)
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const newBaseEntry: NewBaseEntry = {
    ...object,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };

  if ("diagnosisCodes" in object) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

const toNewHealthCheckEntry = (object: NewBaseEntry): NewHealthCheckEntry => {
  if (!("healthCheckRating" in object)) {
    throw new Error("Incorrect data: healthCheckRating field is missing");
  }

  const newEntry: NewHealthCheckEntry = {
    ...object,
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };

  return newEntry;
};

const toNewHospitalEntry = (object: NewBaseEntry): NewHospitalEntry => {
  if (!("discharge" in object)) {
    throw new Error("Incorrect data: discharge field is missing");
  }

  return {
    ...object,
    type: "Hospital",
    discharge: parseDischarge(object.discharge),
  };
};

const toNewOccupationalHealthcareEntry = (
  object: NewBaseEntry
): NewOccupationalHealthcareEntry => {
  if (!("employerName" in object && "sickLeave" in object)) {
    throw new Error("Incorrect data: some fields are missing");
  }

  return {
    ...object,
    type: "OccupationalHealthcare",
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave),
  };
};

const parseDiagnosisCodes = (array: unknown): Array<Diagnosis["code"]> => {
  if (!isArray(array) || !isDiagnosisCodes(array)) {
    throw new Error("Incorrect diagnosisCodes");
  }

  return array;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!isObject(object) || !isSickLeave(object)) {
    throw new Error("Incorrect sickLeave");
  }

  return object;
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect employerName");
  }
  return name;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isObject(discharge) || !isDischarge(discharge)) {
    throw new Error("Incorrect discharge");
  }

  return discharge;
};

const parseHealthCheckRating = (number: unknown): HealthCheckRating => {
  if (!isNumber(number) || !isHealthCheckRating(number)) {
    throw new Error("Incorrect healthCheckRating");
  }

  return number;
};

const parseDescription = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect description");
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date");
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect specialist");
  }
  return specialist;
};

const parseCode = (code: unknown): string => {
  if (!code || !isString(code)) {
    throw new Error("Incorrect code");
  }
  return code;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect name");
  }
  return name;
};

const parseLatin = (latin: unknown): string => {
  if (!latin || !isString(latin)) {
    throw new Error("Incorrect name");
  }
  return latin;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date");
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect ssn");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect occupation");
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender");
  }
  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries) || !isEntries(entries)) {
    throw new Error("Incorrect entries");
  }

  return entries;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isObject = (object: unknown): object is object => {
  return typeof object === "object";
};

const isArray = (array: unknown): array is Array<unknown> => {
  return array instanceof Array;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(text);
};

const isEntry = (entry: unknown): boolean => {
  return true || entry; // fix this for actual entry type
};

const isEntries = (array: Array<unknown>): array is Array<Entry> => {
  return array.reduce((acc: boolean, e: unknown) => isEntry(e) && acc, true);
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isDischarge = (discharge: object): discharge is Discharge => {
  if (!("date" in discharge && "criteria" in discharge)) {
    return false;
  }
  return (
    isString(discharge.date) &&
    isDate(discharge.date) &&
    isString(discharge.criteria)
  );
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
  if (!("startDate" in sickLeave && "endDate" in sickLeave)) {
    return false;
  }

  return (
    isString(sickLeave.startDate) &&
    isDate(sickLeave.startDate) &&
    isString(sickLeave.endDate) &&
    isDate(sickLeave.endDate)
  );
};

const isDiagnosisCodes = (
  codes: Array<unknown>
): codes is Array<Diagnosis["code"]> => {
  return codes.reduce(
    (acc: boolean, code: unknown) => acc && isString(code),
    true
  );
};
