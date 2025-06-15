'use client';

import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import FormModal from "./form-modal";
import { User } from "../types/user";
import { topUpUser, transferSaldo, updateUser } from "../(pages)/wallet/api";
import { useSnackbar } from "../contexts/snackbar-context";
import { AxiosError } from "axios";

type ModalType = "ubah" | "transfer" | "topup";
type UbahForm = { name: string };

export default function ActionMenu({ user, onSuccessAction }: { user: User, onSuccessAction?: () => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedData, setSelectedData] = useState<UbahForm | null>(null);

  const open = Boolean(anchorEl);

  const { showMessage } = useSnackbar();

const handleSubmit = async (data: Record<string, string | number>) => {
  try {
    if (modalType === "ubah") {
      await updateUser(user.id, { name: data.name as string });
      showMessage("User berhasil diupdate", "success");
    } else if (modalType === "transfer") {
      await transferSaldo({
        senderId: user.id,
        recipientName: data.name as string,
        amount: Number(data.amount),
      });
      showMessage("Transfer berhasil", "success");
    } else if (modalType === "topup") {
      await topUpUser(user.id, { amount: Number(data.amount) });
      showMessage("Top up berhasil", "success");
    }
    onSuccessAction?.();
    setOpenModal(false);
  } catch (error) {
    let message = "Terjadi kesalahan saat menambahkan user";
    
    if (
        error instanceof AxiosError &&
        error.response?.data?.errors?.message
      ) {
          message = error.response.data.errors.message;
        }
    showMessage(message, "error");
  }
};


  const handleOpenModal = (type: ModalType) => {
    setAnchorEl(null);
    setModalType(type);

    if (type === "ubah") {
      setSelectedData({ name: user.name });
    } else {
      setSelectedData(null);
    }

    setOpenModal(true);
  };

  const renderFields = () => {
    switch (modalType) {
      case "ubah":
        return [
          {
            label: "Nama",
            placeholder: "Masukkan nama",
            name: "name",
            value: selectedData?.name || "",
          },
        ];
      case "transfer":
        return [
          {
            label: "Nama Penerima",
            placeholder: "Masukkan nama",
            name: "name",
            value: "",
          },
          {
            label: "Nominal",
            placeholder: "Masukkan jumlah",
            name: "amount",
            value: "",
          },
        ];
      case "topup":
        return [
          {
            label: "Nominal",
            placeholder: "Masukkan nominal",
            name: "amount",
            value: "",
          },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 40,
          height: 40,
          bgcolor: "#f5e9ff",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ p: 0, color: "#004d40" }}
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 2,
              minWidth: 150,
            },
          }}
        >
          <MenuItem onClick={() => handleOpenModal("ubah")}>Ubah</MenuItem>
          <MenuItem onClick={() => handleOpenModal("transfer")}>Transfer</MenuItem>
          <MenuItem onClick={() => handleOpenModal("topup")}>Top Up</MenuItem>
        </Menu>
      </Box>

      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={
          modalType === "ubah"
            ? "Update User"
            : modalType === "transfer"
            ? "Transfer Saldo"
            : modalType === "topup"
            ? "Top Up"
            : ""
        }
        fields={renderFields()}
        submitLabel={
          modalType === "ubah"
            ? "Yakin, Update"
            : modalType === "transfer"
            ? "Transfer"
            : modalType === "topup"
            ? "Top Up"
            : "Simpan"
        }
        cancelLabel="Batal"
      />
    </>
  );
}
