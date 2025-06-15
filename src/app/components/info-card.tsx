import { Box, Typography, Paper } from "@mui/material";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#7B1FA2",
          color: "#fff",
          borderRadius: 2,
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Paper>
  );
}
