"use client";
import React, { FC } from "react";
import { Dancing_Script } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Wrapper = styled.div`
  margin-left: 80px;
  margin-right: 80px;
  @media screen and (max-width: 600px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const Header: FC = () => {
  return (
    <Wrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 99 }}>
          <Typography component="a" href="/" sx={{ fontSize: "32px" }}>
            <span className={dancingScript.className}>MarryMe</span>
          </Typography>
          <div className="heart1" />
        </Box>
        <ConnectButton />
      </Box>
    </Wrapper>
  );
};

export default Header;
