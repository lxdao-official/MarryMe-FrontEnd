import React, { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { Contract } from "ethers";
import { useAccount } from "wagmi";
import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";

import MarriageCertificate from "./marriageCertificate";
import showMessage from "./showMessage";
import { formatAddress } from "@/utils/utility";
import contractInfo from "@/utils/contractsOperation";
import { useEthersSigner } from "@/hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  & .MuiButton-root:hover {
    background-color: #e5acc2;
  }
`;

const AcceptProposalSection: FC = () => {
  const [rejectedProposal, setRejectedProposal] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);
  const [attestationLink, setAttestationLink] = useState("");
  const { address, isConnected, isDisconnected } = useAccount();
  const signer = useEthersSigner();
  const pathname = usePathname();
  const proposalReceiver = pathname?.replace("/accept-proposal/", "") || "";
  // TODO: get sign message from contract
  // TODO: verify if this connected address match the proposal address
  // TODO: if already generated the attestation, just show the marriage certificate

  const handleAcceptProposal = async () => {
    // TODO: call the contract acceptProposal function
    // TODO: once it's successful, will show the marriage certificate
    // try {
    //   const { address: contractAddress, abi } = contractInfo();
    //   const contract = new Contract(contractAddress, abi, signer);
    //   const res = await contract
    //     .connect(address)
    //     .confirmProposal(deployer.getAddress(), "Yes, I do.");
    //   if (res) {
    setProposalSuccess(true);
    setAttestationLink("todo");
    //   }
    // } catch (error) {
    //   showMessage({
    //     title: "Faild to accept the proposal.",
    //     type: "error",
    //     body: error.message,
    //   });
    // }
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
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            textShadow: "5px 5px #e95aab",
          }}
        >
          Congratulations!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid #f1ecda",
            width: "480px",
            padding: "24px",
            borderRadius: "10px",
            gap: "20px",
          }}
        >
          <MarriageCertificate
            proposalAddress={proposalReceiver}
            recipientAddress={address}
            attestationLink={attestationLink}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Wrapper>
      <Typography sx={{ fontSize: "28px", textShadow: "5px 5px #e95aab" }}>
        Proposal I received
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid #f1ecda",
          width: "480px",
          padding: "24px",
          borderRadius: "10px",
          gap: "20px",
        }}
      >
        {isConnected && address === proposalReceiver ? (
          rejectedProposal ? (
            <Box>
              <Typography>
                {`Don't love ${formatAddress(
                  proposalReceiver
                )}? You may want to make a proposal to the other people, `}
                <Typography component="a" href="/">
                  let's make it!
                </Typography>
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography>
                Do you accept proposal creator address's proposal?
              </Typography>
              <Typography>💌 vows message</Typography>
              <Box sx={{ display: "flex", gap: "12px" }}>
                <Button variant="contained" onClick={handleAcceptProposal}>
                  Yes, I do
                </Button>
                <Button
                  variant="contained"
                  onClick={handleRejectProposal}
                  sx={{ backgroundColor: "#e5acc2" }}
                >
                  Sorry, I don't
                </Button>
              </Box>
            </Box>
          )
        ) : (
          <Box>
            <Typography>{`Please connect your wallet to check the love letters from your admirer(s).`}</Typography>
            <Typography
              sx={{ fontSize: "12px", marginTop: "15px" }}
            >{`Your receiving address is: ${proposalReceiver}`}</Typography>
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};

export default AcceptProposalSection;
