import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import HealingIcon from "@mui/icons-material/Healing";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { assertNever } from "../../utils";
import { Entry, SickLeave, Discharge } from "../../types";

interface Props {
  entry: Entry;
}

const EntryDetails: React.FC<Props> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck": {
      return (
        <EntryBase
          date={entry.date}
          description={entry.description}
          specialist={entry.specialist}
          healthCheckRating={entry.healthCheckRating}
          typeIcon={<MedicalServicesIcon />}
        />
      );
    }
    case "Hospital": {
      return (
        <EntryBase
          date={entry.date}
          description={entry.description}
          specialist={entry.specialist}
          typeIcon={<HealingIcon />}
          discharge={entry.discharge}
        />
      );
    }
    case "OccupationalHealthcare": {
      return (
        <EntryBase
          date={entry.date}
          description={entry.description}
          specialist={entry.specialist}
          typeIcon={<WorkIcon />}
          employer={entry.employerName}
          sickLeave={entry.sickLeave}
        />
      );
    }
    default:
      return assertNever(entry);
  }
};

interface EntryBaseProps {
  date: string;
  description: string;
  specialist: string;
  healthCheckRating?: number;
  typeIcon: React.ReactElement;
  employer?: string;
  sickLeave?: SickLeave;
  discharge?: Discharge;
}

const EntryBase = ({
  date,
  description,
  specialist,
  healthCheckRating,
  typeIcon,
  employer,
  sickLeave,
  discharge,
}: EntryBaseProps) => {
  let healthColor = "green";
  switch (healthCheckRating) {
    case 1:
      healthColor = "yellow";
      break;
    case 2:
      healthColor = "orange";
      break;
    case 3:
      healthColor = "red";
      break;
    default:
      break;
  }

  return (
    <div style={{ border: "2px solid", padding: "1em", marginTop: "1em" }}>
      <h4>
        {date} {typeIcon} {employer}
      </h4>
      {sickLeave !== undefined ? (
        <p>
          Sick leave: {sickLeave?.startDate} - {sickLeave?.endDate}
        </p>
      ) : null}
      {discharge !== undefined ? (
        <p>
          Discharged: {discharge?.date} - {discharge?.criteria}
        </p>
      ) : null}
      <p>{description}</p>
      {healthCheckRating !== undefined ? (
        <FavoriteIcon style={{ color: healthColor }} />
      ) : null}
      <p>specialist: {specialist}</p>
    </div>
  );
};

export default EntryDetails;
