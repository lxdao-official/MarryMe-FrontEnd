"use client";
import React, { ChangeEvent, FC, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Contract } from "ethers";
import { Box, TextField, Button, Typography, Tooltip } from "@mui/material";
import styled from "styled-components";
import contractInfo from "@/utils/contractsOperation";
import { useEthersSigner } from "@/hooks";
import showMessage from "./showMessage";

interface FormValueType {
  loverAddress: string;
  vowsMessage: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #f1ecda;
  width: 480px;
  padding: 24px;
  border-radius: 10px;
  gap: 20px;

  @media screen and (max-width: 600px) {
    width: 340px;
    padding: 20px;
  }
`;

const ProposalSection: FC = () => {
  const [value, setValue] = useState<FormValueType>({
    loverAddress: "",
    vowsMessage: "",
  });
  const [error, setError] = useState<FormValueType>({
    loverAddress: "",
    vowsMessage: "",
  });
  const [displayProposalLinkButton, setDisplayProposalLinkButton] =
    useState<boolean>(false);
  const [copiedProposalLink, setCopiedProposalLink] = useState<boolean>(false);
  const [isMarried, setIsMarried] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const signer = useEthersSigner({
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID!),
  });
  const { address: contractAddress, abi } = contractInfo();

  useEffect(() => {
    async function getMarryStatus() {
      const contract = new Contract(contractAddress!, abi, signer);
      const isMarried = await contract.checkMarried(address);
      setIsMarried(isMarried);
    }
    if (isConnected && address) {
      getMarryStatus();
    } else {
      setIsMarried(false);
    }
  }, [isConnected, signer]);

  const handleOnChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    fieldName: string
  ) => {
    const newValue: string = event.target.value;
    const cloneValue: any = Object.assign({}, value);
    const cloneError = Object.assign({}, error);
    cloneValue[fieldName] = newValue;
    setValue(cloneValue);

    if (fieldName === "loverAddress") {
      cloneError.loverAddress = isValidAddress(newValue)
        ? ""
        : "Please fill in a valid address.";
    }

    if (fieldName === "vowsMessage") {
      cloneError.vowsMessage = isValidVows(newValue)
        ? ""
        : "The length of the love letter must be greater than 0 and less than 100";
    }

    setError(cloneError);
  };

  const isValidAddress = (value: string): boolean => {
    const addressRegex: RegExp = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(value);
  };

  const isValidVows = (value: string): boolean => {
    return value.length > 0 && value.length <= 100;
  };

  const submitButtonDisabled =
    !isConnected ||
    !value.loverAddress ||
    !value.vowsMessage ||
    error.loverAddress ||
    error.vowsMessage;

  const handleSubmit = async () => {
    try {
      const { address: contractAddress, abi } = contractInfo();
      const contract = new Contract(contractAddress!, abi, signer);
      const res = await contract.submitProposal(
        value.loverAddress,
        value.vowsMessage
      );
      if (res) {
        setDisplayProposalLinkButton(true);
      }
    } catch (error: any) {
      showMessage({
        title: "Faild to propose.",
        type: "error",
        body: error.message,
      });
    }
  };

  const handleCopyProposalLink = () => {
    const proposalLink = `${window.location.origin}/accept-proposal/${value.loverAddress}`;
    navigator.clipboard
      .writeText(proposalLink)
      .then(() => {
        setCopiedProposalLink(true);
      })
      .catch((error) => {
        setCopiedProposalLink(false);
        showMessage({
          title: "Faild to copy the proposal link.",
          type: "error",
          body: error.message,
        });
      });
  };

  return (
    <Wrapper className="proposal-section-wrapper">
      <Typography
        sx={{
          fontSize: "28px",
          textShadow: "5px 5px #e95aab",
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        PROPOSE TO YOUR LOVER
      </Typography>
      <ContentWrapper>
        {isMarried ? (
          <Typography sx={{ textAlign: "center" }}>
            {`You're already married, so you can't propose again.`}
          </Typography>
        ) : (
          <>
            <TextField
              id="lover-address"
              label="Your lover address"
              value={value.loverAddress}
              onChange={(event) => {
                handleOnChange(event, "loverAddress");
              }}
              variant="outlined"
              error={Boolean(error.loverAddress)}
              helperText={error.loverAddress}
              sx={{ width: "100%" }}
            />
            <TextField
              multiline
              minRows={4}
              maxRows={8}
              id="vows-message"
              label="Love letter"
              placeholder="Please bravely express your love to your lover."
              value={value.vowsMessage}
              onChange={(event) => {
                handleOnChange(event, "vowsMessage");
              }}
              variant="outlined"
              error={Boolean(error.vowsMessage)}
              helperText={error.vowsMessage}
              sx={{ width: "100%" }}
            />
            <Button
              variant="contained"
              disabled={!!submitButtonDisabled}
              onClick={handleSubmit}
              sx={{ maxWidth: "100%" }}
            >
              Submit
            </Button>
            {displayProposalLinkButton && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography sx={{ fontSize: "14px", marginBottom: "12px" }}>
                  Please send the proposal link to your lover.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{ fontSize: "12px", wordBreak: "break-word" }}
                  >{`${window.location.origin}/accept-proposal/${value.loverAddress}`}</Typography>
                  <Tooltip
                    open={copiedProposalLink}
                    onClose={() => {
                      setCopiedProposalLink(false);
                    }}
                    title="copied!"
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "40px", fontSize: "12px", marginTop: "8px" }}
                      onClick={handleCopyProposalLink}
                    >
                      Copy
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            )}
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProposalSection;
