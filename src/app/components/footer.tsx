"use client";

import { Box, Container, Typography, Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#4B0082",
        py: 3,
        color: "#ccc",
        mt: 5,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="body2" textAlign={{ xs: "center", md: "left" }}>
            Copyright © 2023 CashEase | All Rights Reserved
          </Typography>

          <Stack direction="row" spacing={1} mt={{ xs: 2, md: 0 }}>
            <IconButton size="small" sx={{ color: "#ccc" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: "#ccc" }}>
              <TwitterIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: "#ccc" }}>
              <InstagramIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: "#ccc" }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: "#ccc" }}>
              <YouTubeIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
