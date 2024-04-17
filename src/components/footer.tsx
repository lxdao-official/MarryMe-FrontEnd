import React, { FC } from "react";
import { Dancing_Script } from "next/font/google";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const ProjectName = styled.div`
  font-size: 18px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: 250px;
  width: 100%;
  padding-left: 80px;
  padding-right: 80px;
  @media screen and (max-width: 600px) {
    height: 140px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const Footer: FC = () => {
  return (
    <Wrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <Box>
          <ProjectName className={dancingScript.className}>MarryMe</ProjectName>
          <Typography sx={{ marginTop: "8px" }}>
            © 2024,{" "}
            <Typography component="a" href="/">
              MarryMe
            </Typography>{" "}
            ♡{" "}
            <Typography
              target="_blank"
              component="a"
              href="https://marry3.love/"
            >
              Marry3
            </Typography>{" "}
            ♡{" "}
            <Typography target="_blank" component="a" href="https://lxdao.io/">
              LXDAO
            </Typography>
          </Typography>
        </Box>
        <Typography
          target="_blank"
          component="a"
          href="https://github.com/lxdao-official/MarryMe-FrontEnd"
        >
          <svg
            width="19"
            height="20.019999999999982"
            viewBox="0 0 19 20.019999999999982"
            fill="none"
          >
            <path
              id="path"
              fill-rule="evenodd"
              transform="translate(0 -1.8207657603852567e-14) rotate(0 9.5 10.01)"
              opacity="1"
              d="M6,19.02C6,19.57 6.45,20.02 7,20.02L13,20.02C13.55,20.02 14,19.57 14,19.02L14,16.02C14,15.45 13.88,14.91 13.67,14.42C14.63,14.09 15.5,13.63 16.26,13.06C17.89,11.83 19,10.06 19,8.02C19,6.67 18.52,5.43 17.71,4.4C17.92,3.58 17.9,2.75 17.82,2.12C17.75,1.55 17.65,0.81 17.25,0.36C16.66,-0.29 15.67,0.09 14.97,0.33C14.35,0.54 13.59,0.88 12.85,1.38C11.95,1.14 10.99,1.02 10,1.02C9.01,1.02 8.05,1.14 7.15,1.38C6.41,0.88 5.64,0.54 5.02,0.33C4.33,0.09 3.33,-0.29 2.74,0.36C2.34,0.81 2.25,1.5 2.18,2.08C2.18,2.09 2.17,2.11 2.17,2.12C2.09,2.75 2.07,3.58 2.28,4.4C1.48,5.44 1,6.67 1,8.02C1,10.06 2.11,11.83 3.74,13.06C4.5,13.63 5.37,14.09 6.33,14.42C6.12,14.9 6,15.44 6,16L5.83,16.03C5.12,16.13 4.66,16.04 4.34,15.91C3.58,15.59 3.19,14.78 2.71,14.16C2.42,13.77 1.98,13.29 1.32,13.07C0.79,12.9 0.23,13.18 0.05,13.7C-0.12,14.23 0.16,14.79 0.68,14.97C1.24,15.15 1.63,16.11 1.98,16.54C2.35,16.98 2.85,17.45 3.56,17.75C4.24,18.04 5.04,18.15 6,18.03L6,19.02Z "
              style={{ fill: "currentcolor" }}
            ></path>
          </svg>
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default Footer;
