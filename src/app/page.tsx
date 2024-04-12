"use client";
import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import PageLayout from "../components/pageLayout";

import "./globals.css";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, base],
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <PageLayout>content</PageLayout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
