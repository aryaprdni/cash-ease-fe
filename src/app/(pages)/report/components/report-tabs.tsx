"use client";

import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DataTable from "./data-table-report";
import { User } from "@/app/types/user";
import { getAllUsers } from "../api";
import { formatRupiah } from "@/app/utils/formatter";
import { format } from "date-fns";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { id } from "date-fns/locale";

const tabConfig = [
  {
    label: "Saldo",
    type: "saldo",
    columns: ["Nama", "Tanggal", "Bank", "Saldo"],
  },
  {
    label: "Top Up",
    type: "topup",
    columns: ["Nama", "Tanggal", "Nominal"],
  },
  {
    label: "Transfer",
    type: "transfer",
    columns: ["Pengirim", "Penerima", "Tanggal", "Nominal"],
  },
];

export default function ReportTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [rows, setRows] = useState<(string | number)[][]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const type = tabConfig[activeTab].type;
      const data = await getAllUsers(type, debouncedKeyword, startDate, endDate);

      const formattedRows = data.users.map((user: User) => {
        if (type === "saldo") {
          return [
            user.name ?? "",
            user.created_at ?? "",
            `${user.bank ?? ""}`,
            formatRupiah(user.balance ?? 0),
          ];
        } else if (type === "topup") {
          return [
            user.name ?? "",
            user.created_at ?? "",
            formatRupiah(user.amount ?? 0),
          ];
        } else if (type === "transfer") {
          return [
            user.sender_name ?? "",
            user.receiver_name ?? "",
            user.created_at ?? "",
            formatRupiah(user.amount ?? 0),
          ];
        }
        return [];
      });

      setRows(formattedRows);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const { columns } = tabConfig[activeTab];

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(e, val) => setActiveTab(val)}
        sx={{ mb: 2 }}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        {tabConfig.map((tab, idx) => (
          <Tab
            key={tab.label}
            label={tab.label}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: activeTab === idx ? "#fff !important" : "#662AB2",
              bgcolor: activeTab === idx ? "#662AB2" : "#EDE4FF",
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          borderRadius: 3,
          bgcolor: "white",
          p: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography fontWeight={600} mb={1}>
          Pencarian
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          <TextField
            fullWidth
            placeholder="Cari"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchData();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
            sx={{ bgcolor: "#662AB2", color: "#fff" }}
            onClick={() => setIsFilterModalOpen(true)}
          >
            Tanggal
          </Button>
        </Stack>

        {loading ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <DataTable columns={columns} rows={rows} />
        )}
      </Box>

      <Dialog
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Pilih Rentang Tanggal</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
            <DateRangePicker
              calendars={2}
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              localeText={{ start: "Mulai", end: "Selesai" }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDateRange([null, null]);
              setStartDate("");
              setEndDate("");
              fetchData();
              setIsFilterModalOpen(false);
            }}
            color="inherit"
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              if (dateRange[0] && dateRange[1]) {
                setStartDate(format(dateRange[0], "yyyy-MM-dd"));
                setEndDate(format(dateRange[1], "yyyy-MM-dd"));
              }
              setIsFilterModalOpen(false);
            }}
            variant="contained"
          >
            Terapkan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
