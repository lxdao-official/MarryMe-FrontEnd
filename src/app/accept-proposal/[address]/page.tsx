"use client";
import React, { FC } from "react";

import PageLayout from "@/components/pageLayout";
import AcceptProposalSection from "@/components/acceptProposalSection";

import "../../globals.css";

const AcceptProposalPage: FC = () => {
  return (
    <PageLayout>
      <AcceptProposalSection />
    </PageLayout>
  );
};

export default AcceptProposalPage;
