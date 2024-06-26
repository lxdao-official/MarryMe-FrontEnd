import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

import formatAddress from "@/utils/utility";

interface Props {
  proposalAddress: string;
  recipientAddress: string;
  attestationLink: string;
}

// TODO: Add twitter share functionality
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
          justifyContent: "center",
          width: "100%",
          gap: "24px",
        }}
      >
        <Typography className="marriage-address">
          {formatAddress(proposalAddress)}
        </Typography>
        <Typography className="marriage-icon">💗</Typography>
        <Typography className="marriage-address">
          {formatAddress(recipientAddress)}
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        Congratulations on your marriage, you have a unique on-chain marriage
        attestation now, just like your love: free, unparalleled, and
        exclusively yours!
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        Please check your on-chain marriage attestation:{" "}
        <Typography
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          target="__blank"
          component="a"
          href={attestationLink}
        >
          click here
        </Typography>
      </Typography>
    </Box>
  );
};

export default MarriageCertificate;
