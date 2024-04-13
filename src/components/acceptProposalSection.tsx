import React, { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { Box, Button, Typography } from "@mui/material";

import MarriageCertificate from "./marriageCertificate";
import { formatAddress } from "@/utils/utility";

const AcceptProposalSection: FC = () => {
  const [rejectedProposal, setRejectedProposal] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);
  const [attestationLink, setAttestationLink] = useState("");
  const { address, isConnected, isDisconnected } = useAccount();
  const pathname = usePathname();
  const isProposalFrom = pathname?.replace("/accept-proposal/", "") || "";
  // TODO: get sign message from contract
  // TODO: verify if this connected address match the proposal address
  // TODO: if already generated the attestation, just show the marriage certificate

  const handleAcceptProposal = () => {
    // TODO: call the contract acceptProposal function
    // TODO: once it's successful, will show the marriage certificate
    setProposalSuccess(true);
    setAttestationLink("todo");
  };

  const handleRejectProposal = () => {
    setRejectedProposal(true);
  };

  if (proposalSuccess && address) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid #ff7aba",
          width: "400px",
          padding: "24px",
          borderRadius: "10px",
          gap: "20px",
        }}
      >
        <MarriageCertificate
          proposalAddress={isProposalFrom}
          recipientAddress={address}
          attestationLink={attestationLink}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid #ff7aba",
        width: "400px",
        padding: "24px",
        borderRadius: "10px",
        gap: "20px",
      }}
    >
      {isConnected ? (
        rejectedProposal ? (
          <Box>
            <Typography>
              {`Don't love ${formatAddress(
                isProposalFrom
              )}? You may want to make a proposal to the other people, `}
              <Typography component="a" href="/">
                let's make it!
              </Typography>
            </Typography>
          </Box>
        ) : (
          <>
            <Typography>{isProposalFrom}</Typography>
            <Typography>vows message</Typography>
            <Button variant="contained" onClick={handleAcceptProposal}>
              I do
            </Button>
            <Button variant="contained" onClick={handleRejectProposal}>
              no
            </Button>
          </>
        )
      ) : (
        <Typography>{`Please connect your wallet first to see the love words ${formatAddress(
          isProposalFrom
        )} said to you.`}</Typography>
      )}
    </Box>
  );
};

export default AcceptProposalSection;
