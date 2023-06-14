import { Link } from "react-router-dom";
import { Icon, Box, Text } from "@tlon/indigo-react";
import urbitLogo from "./Icons/urbit-logo.png";

const NavBar = () => {
  return (
    <header className="mainHeader" >
      <Box
        color="#9a9a9a"
        fontSize={14}
        fontWeight={600}
        padding={20}
        height={80}
        paddingTop={40}
        justifyContent={"space-between"}
        display="flex"
        flexDirection="row"
        alignItems="center"


      >
        <Box

          display="flex"
          flex={1}
          style={{ display: "flex", alignItems: "center" }}

        >
          <div>
            <img src={urbitLogo} alt="Urbit Icon" width={35} height={35} />
          </div>

          <Text
            fontSize={16}
            color="white"
            fontWeight={800}
            marginLeft={10}
            style={{ whiteSpace: "nowrap", fontFamily: "Plus Jakarta Sans" }}
          >
            Star Market
          </Text>
        </Box>

        <Box className="responsive-hide" display="inline-block" marginRight={35}>
          <a href="#urbit-stars">
            <Text fontSize={16} color="white" fontWeight={600} style={{ fontFamily: "Plus Jakarta Sans" }}>
              Urbit Stars
            </Text>
          </a>
        </Box>
        <Box className="responsive-hide" display="inline-block" marginRight={35}>
          <a href="#where-to-buy">
            <Text fontSize={16} color="white" fontWeight={600}>
              Buy a star
            </Text>
          </a>
        </Box>
        <Box className="responsive-hide" display="inline-block" marginRight={35}>
          <a href="#wrapped-star">
            <Text fontSize={16} color="white" fontWeight={600}>
              Wrapped Star
            </Text>
          </a>
        </Box>

        <Box className="responsive-hide" display="inline-block" marginRight={35}>
          <a href="#about-urbit">
            <Text fontSize={16} color="white" fontWeight={600}>
              About Urbit
            </Text>
          </a>
        </Box>
        <Box className="responsive-hide" display="inline-block" marginRight={35}>
          <a href="#media">
            <Text fontSize={16} color="white" fontWeight={600}>
              Media
            </Text>
          </a>
        </Box>
        <Link to="/app" className="pill-button bg-yellow remove-when-reduced-2">
          <Text fontSize={16} fontWeight={600} style={{ whiteSpace: "nowrap" }}>
            Convert to WSTR
          </Text>
          <Icon
            color="black"
            size={16}
            icon="Swap"
            style={{ marginLeft: 10, fontWeight: 800 }}
          />
        </Link>
      </Box>
    </header >

  );
};

export default NavBar;
