import React, { FC, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Contract } from "ethers";
import { useAccount } from "wagmi";
import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";

import MarriageCertificate from "./marriageCertificate";
import showMessage from "./showMessage";
import formatAddress from "@/utils/utility";
import contractInfo from "@/utils/contractsOperation";
import { useEthersSigner } from "@/hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & .MuiButton-root:hover {
    background-color: #e5acc2;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #f1ecda;
  width: 480px;
  min-height: 200px;
  padding: 24px;
  border-radius: 10px;
  gap: 20px;
  position: relative;
  & .marriage-address {
    font-size: 24px;
  }
  & .marriage-icon {
    font-size: 30px;
  }
  @media screen and (max-width: 600px) {
    width: 340px;
    padding: 20px;

    & .marriage-address {
      font-size: 18px;
    }
    & .marriage-icon {
      font-size: 24px;
    }

    & .envelope {
      width: 100%;
      height: 250px;
      border: 2px solid #f1ecda;
      position: relative;
    }

    & .flap {
      border-left: 146px solid transparent;
      border-right: 146px solid transparent;
      border-top: 125px solid #f1ecda;
    }
  }
`;

const ProposalWrapper = styled.div`
  & .MuiButton-root:hover {
    background-color: #e5acc2;
  }
`;

const AcceptProposalSection: FC = () => {
  const [rejectedProposal, setRejectedProposal] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);
  const [attestationLink, setAttestationLink] = useState("");
  const [receivedProposals, setReceivedProposals] = useState([]);
  const [loverLettersOpened, setLoverLettersOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const signer = useEthersSigner({
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID!),
  });
  const pathname = usePathname();
  const proposalReceiver = pathname?.replace("/accept-proposal/", "");
  const { address: contractAddress, abi } = contractInfo();

  const handleOpenLoveLetters = useCallback(async () => {
    setLoverLettersOpened(true);
    setLoading(true);
    if (isConnected && address === proposalReceiver) {
      try {
        const contract = new Contract(contractAddress!, abi, signer);
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
          setLoading(false);
          setReceivedProposals(formattedArray);
        }
      } catch (error: any) {
        setLoading(false);
        showMessage({
          title: "Faild to fetch the received proposals.",
          type: "error",
          body: error.message,
        });
      }
    }
  }, [isConnected, proposalReceiver, signer]);

  const handleAcceptProposal = useCallback(
    async (proposalAddress: string, signer: any) => {
      try {
        const contract = new Contract(contractAddress!, abi, signer);
        const res = await contract
          .connect(signer)
          //@ts-ignore
          .confirmProposal(proposalAddress, "Yes, I do.");
        await res.wait();
        const attestationID = await contract.getMarryAttestationId(
          proposalAddress
        );
        if (attestationID) {
          setProposalSuccess(true);
          setAttestationLink(
            `${
              process.env.NEXT_PUBLIC_ATTESTATION_URL
            }0x${attestationID.toString(16)}`
          );
        }
      } catch (error: any) {
        showMessage({
          title: "Faild to accept the proposal.",
          type: "error",
          body: error.message,
        });
      }
    },
    []
  );

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
        <ContentWrapper>
          <MarriageCertificate
            proposalAddress={proposalReceiver!}
            recipientAddress={address}
            attestationLink={attestationLink}
          />
        </ContentWrapper>
      </Box>
    );
  }

  return (
    <Wrapper>
      <Typography
        sx={{
          fontSize: "28px",
          textShadow: "5px 5px #e95aab",
          textAlign: "center",
          marginBottom: "12px",
        }}
      >
        Proposal I received
      </Typography>
      <ContentWrapper>
        {loading && (
          <div className="heart-wrapper">
            <div className="envelope-heart" onClick={handleOpenLoveLetters} />
          </div>
        )}
        {isConnected && address === proposalReceiver ? (
          rejectedProposal ? (
            <Box>
              <Typography>
                {`Don't love ${formatAddress(
                  proposalReceiver!
                )}? You may want to make a proposal to the other people, `}
                <Typography
                  component="a"
                  href="/"
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  let&apos;s make it!
                </Typography>
              </Typography>
            </Box>
          ) : (
            <>
              {loverLettersOpened ? (
                receivedProposals &&
                receivedProposals.map(
                  (proposal: { address: string; message: string }) => {
                    return (
                      <ProposalWrapper key={address}>
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
                                handleAcceptProposal(proposal.address, signer);
                              }}
                            >
                              Yes, I do
                            </Button>
                            <Button
                              variant="contained"
                              onClick={handleRejectProposal}
                              sx={{ backgroundColor: "#e5acc2" }}
                            >
                              Sorry, I don&apos;t
                            </Button>
                          </Box>
                        </Box>
                      </ProposalWrapper>
                    );
                  }
                )
              ) : (
                <div className="envelope">
                  <div className="flap" />
                  <div className="heart-wrapper">
                    <div
                      className="envelope-heart"
                      onClick={handleOpenLoveLetters}
                    />
                  </div>
                </div>
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
      </ContentWrapper>
    </Wrapper>
  );
};

export default AcceptProposalSection;
