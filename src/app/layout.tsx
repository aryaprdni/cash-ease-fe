import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Outfit } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { SnackbarProvider } from "./contexts/snackbar-context";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "CashEase",
  description: "Wallet Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider theme={theme}>
          {" "}
          <CssBaseline />
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <SnackbarProvider>
              {children}
            </SnackbarProvider>
          </main>
          <Footer />
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
