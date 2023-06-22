import React, { useState, useEffect } from "react";
import { Icon, Box, Row, Col, Button, Text, LoadingSpinner } from "@tlon/indigo-react";
import { formatNumber } from "../utils/text";
import Modal from "./Modal";
import LoadingIndicator from "./Results/LoadingIndicator";

const MetricsBar = () => {
  const { REACT_APP_DUNE_API_KEY } = process.env;

  const [starPrice, setStarPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const asyncFunction = async () => {
      setLoading(true);

      const apiUrl = `https://api.dune.com/api/v1/query/2627114/results?api_key=${REACT_APP_DUNE_API_KEY}`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
        });

        const res = await response.json();
        setStarPrice(res.result.rows[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    asyncFunction();
  }, [REACT_APP_DUNE_API_KEY]);

  const renderLoading = () => {
    return (<div className="loading small">
      <LoadingIndicator />
    </div>)


  };

  const getColor = (val: number) => {
    if (val > 0) {
      return "green"
    } else if (val < 0) {
      return "#ff7675"
    } else {
      return "gray"
    }
  }

  const getIcon = (val: number) => {
    if (val >= 0) {
      return "TriangleNorth"
    } else {
      return "TriangleSouth"
    }
  }



  const renderContent = () => {
    return (
      <>
        <Box className="metrics-label">Star Price: </Box>

        <>
          <Box>
            $
            {formatNumber(
              (starPrice?.["last_sale_usd"] ?? 0))}
          </Box>

          <Box
            style={{
              color:
                getColor(starPrice?.["percent_difference_last_sale_usd"] ?? 0),
              fontWeight: 800,
              marginLeft: 10,
            }}
          >
            {starPrice?.["percent_difference_last_sale_usd"] ?? 0}%
          </Box>
          <Icon
            color={getColor(starPrice?.["percent_difference_last_sale_usd"] ?? 0)}
            size={24}
            icon={getIcon(starPrice?.["percent_difference_last_sale_usd"] ?? 0)}
            style={{ marginLeft: 5, marginTop: 1 }}
          />

        </>

        <div className="remove-when-reduced-2">
          <div
            style={{
              marginLeft: 10,
              marginRight: 10,
            }}
          />

          <Box>
            {starPrice?.["last_sale_eth"] ?? 0} ETH
          </Box>
          <Box
            style={{
              marginLeft: 10,
              color: getColor(starPrice?.["percent_difference_last_sale_eth"] ?? 0),
              fontWeight: 800,
            }}
          >
            {starPrice?.["percent_difference_last_sale_eth"] ?? 0}%
          </Box>
          <Icon
            color={
              getColor(starPrice?.["percent_difference_last_sale_eth"] ?? 0
              )}
            size={24}
            icon={getIcon(starPrice?.["percent_difference_last_sale_eth"] ?? 0)}
            style={{ marginLeft: 5, marginTop: 1 }}
          />
        </div>

        <div
          className="remove-when-reduced"
          style={{
            borderRight: "1px solid gray",
            transform: "scaleX(0.5)",
            height: "45%",
            marginLeft: 20,
            marginRight: 30,
          }}
        />
        <div className="remove-when-reduced">
          <Box className="metrics-label">
            Fully Diluted Market Cap.
          </Box>
          <Box>
            $
            {formatNumber
              ((starPrice?.["avg_current_week_usd"] ?? 0) * 65280
              )}
          </Box>
        </div>

        <Icon
          onClick={() => setShowModal(true)}
          color="black"
          size={22}
          icon="Info"
          style={{ marginLeft: 25, cursor: "pointer" }}
        />

        {showModal &&
          <Modal hideModal={() => setShowModal(false)} >
            <Box className="message-container">
              <Text>

                <h3>
                  Calculations:
                </h3>
                <ul>
                  <li>
                    <b>Star Price: </b>Most recent sale on OpenSea.
                  </li>
                  <br />

                  <li>
                    <b>% Chg: </b>Most recent sale on OpenSea compared to the previous week's average price.
                  </li>
                  <br />

                  <li>
                    <b>Fully Diluted Market Cap: </b>Current week's average price * 65,280 stars.
                  </li>

                </ul>

                <p>
                  Please note that some delay may be present in reporting.
                </p>

              </Text>
            </Box>
          </Modal>
        }

      </>
    );
  };

  return (
    <Box
      style={{
        backgroundColor: "#f3f2f0",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        fontSize: 15,
        fontFamily: 'Source Code Pro'
      }}
    >
      {loading ? renderLoading() : renderContent()}

    </Box>
  );
};

export default MetricsBar;
