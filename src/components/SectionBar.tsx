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
        </div>
      </Box>
    </div>
  );
};

export default SectionBar;
