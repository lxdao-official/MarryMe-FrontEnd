import React, { FC } from "react";
import Box from "@mui/material/Box";

import Header from "./header";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

const PageLayout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default PageLayout;
