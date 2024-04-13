import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

import { formatAddress } from "@/utils/utility";

interface Props {
  proposalAddress: string;
  recipientAddress: string;
  attestationLink: string;
}

const MarriageCertificate: FC<Props> = ({
  proposalAddress,
  recipientAddress,
  attestationLink,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "24px",
        }}
      >
        <Typography>{formatAddress(proposalAddress)}</Typography>
        <Typography>💗</Typography>
        <Typography>{formatAddress(recipientAddress)}</Typography>
      </Box>
      <Typography target="__blank" component="a" href={attestationLink}>
        {attestationLink}
      </Typography>
    </Box>
  );
};

export default MarriageCertificate;
