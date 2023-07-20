import { Icon, Box, Button } from "@tlon/indigo-react";
import { filters } from "../../utils/analyzer-utils"

interface FilterBarProps {
  selectedFilter: string;
  star: string;
  applyFilter: (filter: string) => void;
  reset: () => void;
}

const FilterBar = (props: FilterBarProps) => {
  const { star, selectedFilter } = props;

  const renderFilters = () => {
    return filters.map((filter) => {
      return (
        <Box key={filter}>
          <Button
            style={{
              padding: 7,
              marginRight: 5,
              marginTop: 10,
              backgroundColor:
                selectedFilter === filter ? "#007bff" : "white",
              color: selectedFilter === filter ? "white" : "black",
            }}
            onClick={() => props.applyFilter(filter)}
          >
            {filter}
            {selectedFilter === filter && (
              <Icon
                color="white"
                size={18}
                icon="X"
                style={{ marginLeft: 7 }}
              />
            )}
          </Button>
        </Box>
      );
    });
  };

  const renderContent = () => {
    return (
      <Box
        style={{
          backgroundColor: "#f3f2f0",
          minHeight: 75,
          padding: 20,
          fontWeight: 600,
        }}
      >

        {star && renderBackButton()}

        {/* <div style={{ marginTop: 25 }}>Filter Tags:</div> */}
        <div
          style={{
            flexWrap: "wrap",
            display: "flex",
            fontSize: 15,
            alignItems: "center",
            marginTop: 10
          }}
        >
          {renderFilters()}
        </div>
      </Box>
    )
  }


  const renderBackButton = () => {
    return (

      <Button
        onClick={props.reset}
        style={{ padding: 15, backgroundColor: "black", color: "white" }}
      >
        <Icon color="white" size={16} icon="ArrowWest" />

        <div
          style={{
            marginLeft: 10,
            marginRight: 10,
            fontFamily: "Source Code Pro",
            fontSize: 20,
            fontWeight: 400,
            flex: 1,
          }}
        >
          {star}
        </div>
      </Button>
    )
  }


  return (
    <>
      {renderContent()}
    </>
  );
};

export default FilterBar;
