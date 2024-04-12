import React, { FC } from "react";
import ReactDOM from "react-dom";

import { Box, Dialog, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";

const IconWrapper = styled.div``;

const DialogWrapper = styled.div`
  font-size: 16px;
  padding: 20px;
  min-width: 200px;
  width: 100%;
  max-width: 450px;
  display: flex;
`;

const DialogBody = styled.div`
  margin-top: 10px;
  color: #00000073;
  line-height: 1.6;
  word-break: break-word;
`;

interface Props {
  onClose?: () => void;
  visible?: boolean;
  type: string;
  title: string;
  body: React.ReactNode;
}

const SimpleModal: FC<Props> = (props) => {
  const { onClose, visible, type, title, body } = props;

  return (
    <Dialog onClose={onClose} open={visible}>
      <DialogWrapper>
        <Box paddingX={1}>
          <Box display="flex" alignItems="center" gap="8px">
            {type && (
              <IconWrapper>
                {type === "success" ? (
                  <CheckCircleIcon
                    sx={{
                      fontSize: "40px",
                    }}
                    color="success"
                  ></CheckCircleIcon>
                ) : type === "info" ? (
                  <InfoIcon
                    sx={{
                      fontSize: "40px",
                    }}
                    color="info"
                  ></InfoIcon>
                ) : (
                  <ErrorIcon
                    sx={{
                      fontSize: "40px",
                    }}
                    color="error"
                  ></ErrorIcon>
                )}
              </IconWrapper>
            )}
            <Typography lineHeight={2} variant="h6">
              {title}
            </Typography>
          </Box>
          <DialogBody>{body}</DialogBody>
        </Box>
      </DialogWrapper>
    </Dialog>
  );
};

function showMessage(options: Props) {
  const { title, body, type } = options;
  const container = document.createDocumentFragment();

  function render({ visible }) {
    ReactDOM.render(
      <SimpleModal
        title={title}
        visible={visible}
        body={body}
        type={type}
        onClose={close}
      />,
      container
    );
  }

  function close() {
    render({ visible: false });
  }

  render({ visible: true });
}

export default showMessage;
