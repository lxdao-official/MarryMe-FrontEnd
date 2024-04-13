"use client";
import React, { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Typography } from "@mui/material";

const Header: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "80px",
        marginRight: "80px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Typography>MarryMe</Typography>
      <ConnectButton />
    </Box>
  );
};

export default Header;
