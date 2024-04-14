import React, { FC, useState, useEffect } from "react";
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
  const [receivedProposals, setReceivedProposals] = useState([]);
  const { address, isConnected, isDisconnected } = useAccount();
  const signer = useEthersSigner();
  const pathname = usePathname();
  const proposalReceiver = pathname?.replace("/accept-proposal/", "") || "";
  // TODO: verify if this connected address match the proposal address
  // TODO: if already generated the attestation, just show the marriage certificate

  const { address: contractAddress, abi } = contractInfo();
  const contract = new Contract(contractAddress, abi, signer);

  useEffect(() => {
    const getProposalInfo = async () => {
      if (isConnected && address === proposalReceiver) {
        try {
          const info = await contract.getProposalsReceivedBy(proposalReceiver);
          if (info) {
            const proposalArray = JSON.parse(JSON.stringify(info, null, 2));
            const addressArray = proposalArray[0];
            const messageArray = proposalArray[1];

            const formattedArray = addressArray.map(
              (item: string, index: number) => {
                return { address: item, message: messageArray[index] };
              }
            );

            setReceivedProposals(formattedArray);
          }
        } catch (error) {
          showMessage({
            title: "Faild to fetch the received proposals.",
            type: "error",
            body: error.message,
          });
        }
      }
    };
    getProposalInfo();
  }, [isConnected]);

  const handleAcceptProposal = async (proposalAddress: string) => {
    try {
      const res = await contract
        .connect(address)
        .confirmProposal(proposalAddress, "Yes, I do.");
      if (res) {
        setProposalSuccess(true);
        setAttestationLink("todo");
      }
    } catch (error) {
      showMessage({
        title: "Faild to accept the proposal.",
        type: "error",
        body: error.message,
      });
    }
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
            <>
              {receivedProposals &&
                receivedProposals.map(
                  (proposal: { address: string; message: string }) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <Typography>
                          {`Do you accept ${formatAddress(
                            proposal.address
                          )}'s proposal?`}
                        </Typography>
                        <Typography>💌 {proposal.message}</Typography>
                        <Box sx={{ display: "flex", gap: "12px" }}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              handleAcceptProposal(proposal.address);
                            }}
                          >
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
                    );
                  }
                )}
            </>
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
