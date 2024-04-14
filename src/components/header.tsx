"use client";
import React, { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Dancing_Script } from "next/font/google";
import { Box, Typography } from "@mui/material";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

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
      <Box sx={{ position: "relative" }}>
        <Typography
          component="a"
          href="/"
          className={dancingScript.className}
          sx={{ fontSize: "32px" }}
        >
          MarryMe
        </Typography>
        <div className="heart1" />
      </Box>
      <ConnectButton />
    </Box>
  );
};

export default Header;
