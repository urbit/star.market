import {
  Icon,
  Box,
  Text,
  LoadingSpinner,
} from "@tlon/indigo-react";

interface MarketInfoCardProps {
  title: string;
  value: Number;
  change?: Number;
  currency?: string;
  isLoading?: boolean;
}
const MarketInfoCard: React.FC<MarketInfoCardProps> = ({
  title,
  value,
  change,
  currency,
  isLoading,
}) => {
  const renderValue = () => {
    if (isLoading) {
      return (
        <Box style={{ marginTop: 10 }}>
          <LoadingSpinner />
        </Box>
      );
    }

    if (!isLoading && value) {
      return (
        <>
          <Text
            style={{
              fontSize: 18,
              color: "white",
              fontWeight: 800,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            {currency === "USD" ? "$" : ""}
            {Number(value.toFixed(currency === "USD" ? 0 : 2)).toLocaleString(
              "en-US"
            )}
          </Text>
        </>
      );
    } else
      return (
        <Text
          style={{
            fontSize: 18,
            color: "white",
            fontWeight: 800,
          }}
        >
          -
        </Text>
      );
  };

  const renderPercentChange = () => {
    if (isLoading) {
      return;
    }

    if (change) {
      return (
        <Box style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 18,
              color: change > 0 ? "#00b894" : "#ff7675",
              fontWeight: 800,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            {change > 0 ? "+" : ""}
            {change.toFixed(2)}%
          </Text>
        </Box>
      );
    }
  };

  return (
    <Box
      className="market-card"
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 20,
        borderRadius: 20,
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        background: "linear-gradient(to right, #080b2a, #16163a)",
        // marginRight: 10,
      }}
    >
      <Box
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: "#a0afc0",
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          {title}
        </Text>

        <Box
          style={{
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
            display: "flex",
          }}
        >
          {renderValue()}
          {renderPercentChange()}
        </Box>
      </Box>
      <Icon color="#582cff" size={55} icon="Info" />
    </Box>
  );
};

export default MarketInfoCard;
