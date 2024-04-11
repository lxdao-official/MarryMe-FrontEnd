import React, { FC } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";

interface Props {
  children: React.ReactNode;
}

const PageLayout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Box>Header</Box>
      {children}
      <Box>Footer</Box>
    </Box>
  );
};

export default PageLayout;
