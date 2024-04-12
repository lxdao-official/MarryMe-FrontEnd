"use client";
import React, { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Typography } from "@mui/material";

const Header: FC = () => {
  return (
    <Box>
      <Typography>MarryMe</Typography>
      <ConnectButton />
    </Box>
  );
};

export default Header;
