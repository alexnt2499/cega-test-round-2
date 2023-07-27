import { AppShell, Container, Header, createStyles, rem } from "@mantine/core";
import React, { FC } from "react";
import { cega_logo_white } from "../assets";
import ConnectWalletButton from "../components/ConnectWalletButton";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const HEADER_HEIGHT = rem(70);

const useStyles = createStyles(() => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <AppShell
      padding="md"
      header={
        <Header height={HEADER_HEIGHT} px={30}>
          <div className={classes.inner}>
            <img src={cega_logo_white} alt="cega_logo_white" width={120} />
            <ConnectWalletButton />
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container>{children}</Container>
    </AppShell>
  );
};

export default MainLayout;
