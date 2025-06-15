import HeroBanner from "@/app/components/hero-banner";
import { Container, Stack } from "@mui/material";
import ReportTabs from "./components/report-tabs";

export default function ReportPage() {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <HeroBanner title="Laporan" />

      <Container maxWidth="xl" sx={{ mt: 4, flex: 1 }}>
        <ReportTabs />
      </Container>

    </Stack>
  );
}
