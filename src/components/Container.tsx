import { useCallback, useState } from "react";
import { Box, Button, Text } from "@tlon/indigo-react";

import HeaderBar from "./Header/HeaderBar";
import MasterTicketForm from "./Forms/MasterTicketForm";
import Modal from "./Modal";
import SwapForm from "./Forms/SwapForm";
import WalletForm from "./Forms/WalletForm";
import { useStore } from "../store";
import Account from "../account";
import LoadingIndicator from "./Results/LoadingIndicator";
import SuccessDisplay from "./Results/SuccessDisplay";
import ErrorDisplay from "./Results/ErrorDisplay";
import Footer from "./Footer/Footer";

export interface RefreshProps {
  refresh: (account: Account) => void;
}

export interface ContainerProps extends RefreshProps {
  connectWalletConnector: () => void;
  connectMetamask: () => void;
}

const Container = ({
  refresh,
  connectWalletConnector,
  connectMetamask,
}: ContainerProps) => {
  const {
    successTxHashes,
    errorMessage,
    loading,
    setSuccessTxHashes,
    setErrorMessage,
  } = useStore();

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [promptForMasterTicket, setPromptForMasterTicket] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  const toggleWalletModal = useCallback(() => {
    setShowWalletModal(!showWalletModal);
  }, [showWalletModal, setShowWalletModal]);

  const toggleMasterTicketModal = useCallback(() => {
    setPromptForMasterTicket(false);
  }, [setPromptForMasterTicket]);

  const hideWalletModal = () => setShowWalletModal(false);

  return (
    <div className="layout-container">
      {showWarning && (
        <Box
          // className="bg-yellow"
          style={{
            backgroundColor: "#f0ad4e",

            textAlign: "center",
            padding: "10px",

            width: "100vw",
            position: "fixed",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Warning: The Uniswap pools for WSTR no longer have liquidity.
            Converting stars to WSTR is not recommended.
          </Text>
          <Button
            style={{
              position: "absolute",
              right: "20px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
            }}
            onClick={() => setShowWarning(false)}
          >
            ✕
          </Button>
        </Box>
      )}
      <HeaderBar {...{ refresh, toggleWalletModal }} />

      <section className="app-layout">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingBottom={7}
        >
          <SwapForm {...{ refresh, toggleWalletModal }} />

          <Footer style={{ alignSelf: "flex-end" }} />
        </Box>

        {showWalletModal && (
          <Modal hideModal={hideWalletModal}>
            <WalletForm
              {...{ refresh, connectWalletConnector, connectMetamask }}
              hideModal={hideWalletModal}
              showMasterTicketModal={() => setPromptForMasterTicket(true)}
            />
          </Modal>
        )}

        {promptForMasterTicket && (
          <Modal hideModal={toggleMasterTicketModal}>
            <MasterTicketForm
              refresh={refresh}
              hideModal={() => setPromptForMasterTicket(false)}
              hideParentModal={hideWalletModal}
            />
          </Modal>
        )}

        {!!successTxHashes.length && (
          <Modal hideModal={() => setSuccessTxHashes([])}>
            <SuccessDisplay onClose={() => setSuccessTxHashes([])} />
          </Modal>
        )}

        {errorMessage && (
          <Modal hideModal={() => setErrorMessage("")}>
            <ErrorDisplay onClose={() => setErrorMessage("")} />
          </Modal>
        )}

        {loading && (
          <Modal hideModal={() => null}>
            <LoadingIndicator />
          </Modal>
        )}
      </section>
    </div>
  );
};

export default Container;
