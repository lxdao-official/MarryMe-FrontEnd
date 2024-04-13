import React, { FC } from "react";
import { Box, Button, Typography } from "@mui/material";

import PageLayout from "@/components/pageLayout";
import AcceptProposalSection from "@/components/acceptProposalSection";

const AcceptProposalPage: FC = () => {
  return (
    <PageLayout>
      <AcceptProposalSection />
    </PageLayout>
  );
};

export default AcceptProposalPage;
