import React, { ChangeEvent, FC, useState } from "react";
import { useAccount } from "wagmi";
import { Box, TextField, Button, Typography, Tooltip } from "@mui/material";
import showMessage from "./showMessage";

interface FormValueType {
  loverAddress: string;
  vowsMessage: string;
}

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
  const [copiedProposalLink, setCopiedProposalLink] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();

  const handleOnChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    fieldName: string
  ) => {
    const newValue: string = event.target.value;
    const cloneValue = Object.assign({}, value);
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
        : "The length of the vows must be greater than 0 and less than 100";
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

  const handleSubmit = () => {
    // TODO: call the smart contract submitProposal function
    // Once it's successful will show a copy URL button
    setDisplayProposalLinkButton(true);
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
          title: "Faild to copy",
          type: "error",
          body: error.message,
        });
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid #ff7aba",
        maxWidth: "400px",
        padding: "24px",
        borderRadius: "10px",
        gap: "20px",
      }}
    >
      <TextField
        id="lover-address"
        label="My lover address"
        value={value.loverAddress}
        onChange={(event) => {
          handleOnChange(event, "loverAddress");
        }}
        variant="outlined"
        error={Boolean(error.loverAddress)}
        helperText={error.loverAddress}
        sx={{ width: "350px" }}
      />
      <TextField
        multiline
        minRows={4}
        maxRows={8}
        id="vows-message"
        label="Vows"
        placeholder="Please bravely express your love to your lover."
        value={value.vowsMessage}
        onChange={(event) => {
          handleOnChange(event, "vowsMessage");
        }}
        variant="outlined"
        error={Boolean(error.vowsMessage)}
        helperText={error.vowsMessage}
        sx={{ width: "350px" }}
      />
      <Button
        variant="contained"
        disabled={submitButtonDisabled}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {displayProposalLinkButton && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontSize: "14px", marginBottom: "12px" }}>
            Please send the proposal link to your lover.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{ fontSize: "12px" }}
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
    </Box>
  );
};

export default ProposalSection;
