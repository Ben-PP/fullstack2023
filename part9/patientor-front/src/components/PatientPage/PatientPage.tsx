import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Male, Female, Icecream } from "@mui/icons-material";

import patientService from "../../services/patients";
import EntryDetails from "./Entry";
import { Patient, Diagnosis } from "../../types";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patients }: Props) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients.find((p) => p.id === id);
  const [patientFull, setPatientFull] = useState<Patient | undefined>(
    undefined
  );
  useEffect(() => {
    patientService
      .getPatient(id as string)
      .then((result) => setPatientFull(result));
  }, [id]);
  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === "male" ? (
          <Male />
        ) : patient.gender === "female" ? (
          <Female />
        ) : (
          <Icecream />
        )}
      </h2>
      <p>ssn: {patientFull ? patientFull.ssn : ""}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patientFull
        ? patientFull.entries.map((entry) => {
            return <EntryDetails key={entry.id} entry={entry} />;
          })
        : null}
    </div>
  );
};

export default PatientPage;
