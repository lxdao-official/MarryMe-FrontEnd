import React, { FC } from "react";
import Box from "@mui/material/Box";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import Header from "./header";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, base],
  ssr: true,
});

const queryClient = new QueryClient();

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
            <Box>
              <Header />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "80px",
                }}
              >
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default PageLayout;
