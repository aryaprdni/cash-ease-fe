"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Wallet", path: "/wallet" },
    { label: "Laporan", path: "/report" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #eee",
        color: "black",
        px: 4,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              bgcolor: "#5C26A1",
              width: 36,
              height: 36,
              fontWeight: "bold",
            }}
          >
            G
          </Avatar>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#5C26A1" }}
          >
            CashEase
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Button
                key={item.path}
                onClick={() => router.push(item.path)}
                sx={{
                  color: "black",
                  fontWeight: isActive ? "bold" : "normal",
                  borderBottom: isActive ? "2px solid black" : "none",
                  borderRadius: 0,
                  textTransform: "none",
                  pb: 0.5,
                  minWidth: "auto",
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
