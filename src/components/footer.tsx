import React, { FC } from "react";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { Box, Typography } from "@mui/material";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Footer: FC = () => {
  return (
    <Box
      sx={{
        height: "280px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "80px",
        paddingRight: "80px",
        position: "fixed",
        bottom: "0",
      }}
    >
      <Box>
        <Typography className={dancingScript.className}>MarryMe</Typography>
        <Typography>
          © 2024,{" "}
          <Typography component="a" href="/">
            MerryMe
          </Typography>{" "}
          ♡{" "}
          <Typography target="_blank" component="a" href="https://marry3.love/">
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
        <Image src={`/github.svg`} alt="github-logo" width="30" height="30" />
      </Typography>
    </Box>
  );
};

export default Footer;
