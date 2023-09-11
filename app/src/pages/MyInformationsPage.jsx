import { Typography } from "@mui/material";
import ModifyMyInformationsForm from "../components/ModifyMyInformationsForm";

export default function MyInformationsPage() {
  return (
    <div>
      <Typography sx={{ mb: 5 }} variant="h3">
        My informations
      </Typography>
      <ModifyMyInformationsForm />
    </div>
  );
}
