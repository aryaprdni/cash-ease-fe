"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type Field = {
  label: string;
  placeholder: string;
  value: string;
  name: string;
};

interface FormModalProps<T extends Record<string, unknown>> {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: T) => void | Promise<void>;
  title: string;
  fields: Field[];
  submitLabel?: string;
  cancelLabel?: string;
}

export default function FormModal<T extends Record<string, unknown>>({
  open,
  onClose,
  onSubmit,
  title,
  fields,
  submitLabel = "Simpan",
  cancelLabel = "Batal",
}: FormModalProps<T>) {
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, f.value || ""]))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit(formData as T);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 0, position: "relative", minHeight: 56 }}>
        <Typography
          fontSize="1.2rem"
          fontWeight={600}
          textAlign="center"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {title}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: "auto", width: "80%" }} />

      <DialogContent>
        <Stack spacing={3}>
          {fields.map((field) => (
            <Box key={field.name}>
              <Typography fontSize="0.9rem" fontWeight={500} mb={1}>
                {field.label}
              </Typography>
              <TextField
                fullWidth
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  bgcolor: "#F5F5F5",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                  "& input": {
                    padding: "12px 16px",
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            height: 48,
            borderRadius: 2,
            color: "#5C26A1",
            borderColor: "#5C26A1",
            textTransform: "none",
            fontWeight: 600,
            mr: 1,
          }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{
            height: 48,
            borderRadius: 2,
            bgcolor: "#5C26A1",
            textTransform: "none",
            fontWeight: 600,
            ml: 1,
          }}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
