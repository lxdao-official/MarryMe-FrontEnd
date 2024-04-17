"use client";
import React, { FC, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import Box from "@mui/material/Box";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, base, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled, { ServerStyleSheet, StyleSheetManager } from "styled-components";

import Header from "./header";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

const config = getDefaultConfig({
  appName: "MarryMe",
  projectId: "MARRY_ME",
  chains: [mainnet, polygon, base, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 150px 80px 100px 80px;
  @media screen and (max-width: 600px) {
    margin: 100px 24px 80px 24px;
  }
`;

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#f1ecda",
        },
        input: {
          color: "#f1ecda",
        },
        notchedOutline: {
          borderColor: "#f1ecda",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#f1ecda",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#e95aab",
          color: "#f1ecda",
        },
      },
    },
  },
});

const PageLayout: FC<Props> = ({ children }) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return styles;
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#f1ecda",
            accentColorForeground: "#e95aab",
            borderRadius: "medium",
            fontStack: "system",
          })}
        >
          <ThemeProvider theme={theme}>
            <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
              <Box>
                <Header />
                <Wrapper>{children}</Wrapper>
                <Footer />
              </Box>
            </StyleSheetManager>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default PageLayout;
