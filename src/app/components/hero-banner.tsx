"use client";

import { Box, Typography } from "@mui/material";

interface HeroBannerProps {
  title: string;
}

export default function HeroBanner({ title }: HeroBannerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        py: 4,
        background: `radial-gradient(
          circle at 0% 0%,
          #4b1e8c 0%,
          #5C26A1 60%,
          #5C26A1 100%
        )`,
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
}
