import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function StatCard({ value, label }) {
  return (
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h5">{value}</Typography>
        <Typography variant="body2">{label}</Typography>
      </CardContent>
    </Card>
  );
}
