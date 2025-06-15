"use client";

import {
  Container,
  TextField,
  Button,
  Stack,
  Box,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InfoCard from "@/app/components/info-card";
import UserTable from "@/app/components/user-table";
import HeroBanner from "@/app/components/hero-banner";
import { AllUsers } from "@/app/types/user";
import FormModal from "@/app/components/form-modal";
import { useEffect, useState } from "react";
import { createUser, getAllUsers } from "./api";
import { useSnackbar } from "@/app/contexts/snackbar-context";
import { AxiosError } from "axios";

export default function WalletPage() {
  const [users, setUsers] = useState<AllUsers>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { showMessage } = useSnackbar();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (formData: {
    name: string;
    account_number: string;
    bank: string;
  }) => {
    try {
      await createUser(formData);
      showMessage("User berhasil ditambahkan", "success");
      await fetchUsers();
    } catch (error) {
      let message = "Terjadi kesalahan saat menambahkan user";

    if (
      error instanceof AxiosError &&
      error.response?.data?.errors?.message
    ) {
      message = error.response.data.errors.message;
    }

    showMessage(message, "error");
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchSearch = async () => {
        try {
          setLoading(true);
          const data = await getAllUsers(searchQuery || undefined);
          setUsers(data);
        } catch (err) {
          console.error("Error searching users:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSearch();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <>
      <HeroBanner title="Wallet" />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: "80%",
            margin: "0 auto",
            mt: 5,
            borderRadius: 2,
            border: "0.5px solid #ddd",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Container maxWidth="xl" sx={{ my: 4 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={4}>
              <Box flex={1}>
                <InfoCard
                  icon={<AccountBalanceWalletIcon />}
                  label="Total Uang"
                  value={`Rp ${users?.totalBalance.toLocaleString("id-ID")}`}
                />
              </Box>
              <Box flex={1}>
                <InfoCard
                  icon={<AccountCircleOutlinedIcon />}
                  label="Total User"
                  value={`${users?.totalUsers}`}
                />
              </Box>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              mb={4}
              height={45}
            >
              <Box flex={1}>
                <TextField
                  fullWidth
                  placeholder="Cari berdasarkan nama"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    height: 45,
                    "& .MuiInputBase-root": {
                      height: "100%",
                    },
                    "& .MuiInputBase-input": {
                      height: "100%",
                      boxSizing: "border-box",
                      padding: "8px 14px",
                    },
                  }}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ height: "100%", bgcolor: "#5C26A1" }}
                  onClick={() => setOpen(true)}
                >
                  + Tambah User
                </Button>
              </Box>
            </Stack>

            <UserTable users={users?.users ?? []} onSuccessAction={fetchUsers} />

            <FormModal<{
              name: string;
              account_number: string;
              bank: string;
            }>
              open={open}
              onClose={() => setOpen(false)}
              onSubmit={handleAddUser}
              title="Tambah User"
              fields={[
                {
                  label: "Nama",
                  placeholder: "Masukkan nama",
                  name: "name",
                  value: "",
                },
                {
                  label: "Rekening",
                  placeholder: "Masukkan rekening",
                  name: "account_number",
                  value: "",
                },
                {
                  label: "Bank",
                  placeholder: "Masukkan bank",
                  name: "bank",
                  value: "",
                },
              ]}
            />
          </Container>
        </Box>
      )}
    </>
  );
}
