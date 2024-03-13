import Logo from "./Icons/Logo";
import { Icon, Box, Text, Image } from "@tlon/indigo-react";
import { Link } from "react-router-dom";

const SectionBar = () => {
  return (
    <div style={{ paddingBottom: "2em" }}>
      <Box className="header-row">
        <Logo />
        <Box className="logo-home">Star Market</Box>

        <div className="remove-when-reduced">
          <a href="#urbit-stars">
            <Box display="inline-block" marginRight={35}>
              <span className="section-item">Urbit Stars</span>
            </Box>
          </a>
          <a href="#markets">
            <Box display="inline-block" marginRight={35}>
              <span className="section-item">Markets</span>
            </Box>
          </a>
          <a href="#price-chart">
            <Box display="inline-block" marginRight={35}>
              <span className="section-item">Price</span>
            </Box>
          </a>
          <a href="#media">
            <Box display="inline-block" marginRight={35}>
              <span className="section-item">Media</span>
            </Box>
          </a>
          <Link
            to="/app"
            className="pill-button bg-yellow"
            style={{ marginLeft: "2em", borderRadius: 5, marginRight: 0 }}
          >
            <Text
              fontSize={14}
              fontWeight={600}
              style={{ whiteSpace: "nowrap" }}
            >
              Convert to WSTR
            </Text>
            <Icon
              color="black"
              size={16}
              icon="Swap"
              style={{ marginLeft: 10, fontWeight: 800 }}
            />
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default SectionBar;
