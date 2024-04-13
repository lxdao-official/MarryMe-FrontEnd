import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

const Footer: FC = () => {
  return (
    <Box
      sx={{
        height: "280px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "80px",
        marginRight: "80px",
        position: "fixed",
        bottom: "0",
      }}
    >
      <Box>
        <Typography>MarryMe</Typography>
        <Typography>© 2024, MerryMe & Marry3 & LXDAO</Typography>
      </Box>
      <Typography
        target="_blank"
        component="a"
        href="https://github.com/lxdao-official/MarryMe-FrontEnd"
      >
        <Typography
          component="img"
          src={`/github.svg`}
          sx={{
            display: "block",
            width: "30px",
            height: "30px",
          }}
        />
      </Typography>
    </Box>
  );
};

export default Footer;
