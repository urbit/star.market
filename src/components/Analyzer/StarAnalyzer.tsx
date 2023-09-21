import React, { useEffect, useState } from "react";
import HomeHeader from "../Header/HomeHeader";
import { Icon, Button, LoadingSpinner } from "@tlon/indigo-react";
import "./StarAnalyzer.scss";
import * as utils from "../../utils/analyzer-utils";
import ob from "urbit-ob";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import PlanetTable from "./PlanetTable";
import FilterBar from "./FilterBar";
import SearchBarFilter from "./SearchBarFilter";
import { formatNumber } from "../../utils/text";
import { pluralize } from "../../utils/text";
import StarTextInput from "./StarTextInput";
import Footer from "../Footer/Footer";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";

interface Planet {
  point: number;
  patp: string;
  tags?: string[];
}

interface RouteParams {
  star: string;
}

const StarAnalyzer = () => {
  const { star: starUrl } = useParams<RouteParams>();
  const [patp, setPatp] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [starSigil, setStarSigil] = useState<JSX.Element | undefined>();
  const [showTextInput, setShowTextInput] = useState<boolean>(
    starUrl ? false : true
  );
  const [tableData, setTableData] = useState<Planet[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [textFilter, setTextFilter] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);

  const LoadingSpinnerAsAny = LoadingSpinner as any;

  useEffect(() => {
    // for when page is naviagted to via link

    if (starUrl && ob.isValidPatp(starUrl) && starUrl.length === 7) {
      setLoading(true);

      const tag = params.get("tag");
      const filter = params.get("filter");

      // Timeout used to allow the loading spinner to first render,
      // otherwise it doesn't load due to the 65k planet array being generated

      setTimeout(() => {
        setShowTextInput(false);
        setPatp(starUrl);
        startAnalyzing(starUrl);
        setSelectedFilter(tag || "");
        setTextFilter(filter || "");
      }, 1500);
    } else {
      setShowTextInput(true);

      // redirects to input screen if invalid patp
      setShouldRedirect(true);
    }
  }, []);

  useEffect(() => {
    // to generate sigil image on input screen

    if (patp && ob.isValidPatp(patp) && patp.length === 7) {
      const _sigil = sigil({
        patp: patp,
        renderer: reactRenderer,
        size: 130,
        colors: ["black", "#FFFFFF"],
      });

      setStarSigil(_sigil);
    } else {
      setStarSigil(undefined);
    }
  }, [patp]);

  const handleApplyFilters = () => {
    history.push({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const handleFilterClick = (filter: string) => {
    params.set("tag", filter);

    resetPagination();

    if (selectedFilter === filter) {
      setSelectedFilter("");
      params.delete("tag");
    } else {
      setSelectedFilter(filter);
    }
    handleApplyFilters();
  };

  const startAnalyzing = (_star: string) => {
    const planets = utils.getPlanets(_star);

    setTableData(planets);
    setLoading(false);
    setShowTextInput(false);

    // update url with the star

    if (!starUrl) {
      history.push(`/star-analyzer/${_star}`);
    }
  };

  const resetPagination = () => {
    setItemOffset(0);
    setCurrentPage(0);
  };


  const checkInput = (_star: string) => {
    // reset filters and pagination

    setSelectedFilter("");
    setTextFilter("");

    resetPagination();

    const _patp = utils.formatPatp(_star);

    if (!ob.isValidPatp(_patp) || _patp?.length !== 7) {
      setInputError(true);
      setLoading(false);
      return;
    } else {
      setLoading(true);

      // Timeout used to allow the loading spinner to first render

      setTimeout(() => {
        startAnalyzing(_star);
      }, 1500);
    }
  };

  const renderSigil = () => {
    return (
      starSigil && (
        <div className="shimmer">
          <div className="sigil">{starSigil}</div>
          <div className="patp-text">
            {patp}
            <br />
            <div style={{ fontSize: 12, textAlign: "right", color: "gray" }}>
              {ob.isValidPatp(patp) && ob.patp2dec(patp)}
            </div>
          </div>
        </div>
      )
    );
  };

  const handleTextChange = (val: string) => {
    inputError && setInputError(false);
    const formattedPatp = utils.formatPatp(val);
    setPatp(formattedPatp);
  };

  const renderTextInput = () => {
    return (
      <div className="star-input-container">
        <div style={{ height: 160 }}>{renderSigil()}</div>

        <StarTextInput
          error={inputError}
          patp={patp}
          onChange={handleTextChange}
          execute={() => checkInput(patp)}
        />
        <Button
          className="analyze-button"
          style={{
            backgroundColor: "#f6b451",
            fontWeight: 600,
            padding: 22,
          }}
          onClick={() => checkInput(patp)}
        >
          {!loading ? (
            "Analyze"
          ) : (
            <LoadingSpinnerAsAny
              size={20}
              background={"#858585"}
              foreground={"#525252"}
            />
          )}
        </Button>
        <div className="small-text">
          Star Analyzer is a tool for exploring the spawnable planets of an
          Urbit star.
          <br />
          Planets are tagged based on arbitrary properties that may be of
          interest.
        </div>
      </div>
    );
  };

  const applyTextFilter = (val: string) => {
    setTextFilter(val);

    resetPagination();

    // update url
    params.set("filter", val);
    handleApplyFilters();
  };

  const clearTextFilter = () => {
    setTextFilter("");

    resetPagination();

    // update url
    params.delete("filter");
    handleApplyFilters();
  };

  const renderResults = () => {
    const filteredData = tableData.filter(
      (item) =>
        (item.tags?.includes(selectedFilter) || !selectedFilter) &&
        (item.patp.toLowerCase().includes(textFilter.toLowerCase()) ||
          !textFilter)
    );

    return (
      <>
        <div className="filter-container">
          <SearchBarFilter
            handleSubmit={applyTextFilter}
            placeholder={"Filter planets by name"}
          />
          {textFilter && (
            <Button
              style={{
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
              onClick={clearTextFilter}
            >
              {textFilter}
              <Icon
                color="black"
                size={16}
                icon="X"
                style={{ marginLeft: 10 }}
              />
            </Button>
          )}
        </div>

        <div className="result-text">
          {`${formatNumber(filteredData?.length)} ${pluralize(
            "result",
            filteredData?.length,
            true
          )}`}
        </div>

        {filteredData.length > 0 && (
          <PlanetTable
            items={filteredData}
            currentPage={currentPage}
            itemOffset={itemOffset}
            setCurrentPage={(page: number) => setCurrentPage(page)}
            setItemOffset={(offset: number) => setItemOffset(offset)}
          />
        )}
      </>
    );
  };

  const resetInput = () => {
    setShowTextInput(true);
    history.push("/star-analyzer");
  };

  const renderLoading = () => {
    return (
      <div className="spinner-container">
        <LoadingSpinnerAsAny size={50} />
        <div className="loading-text">Loading planets...</div>
      </div>
    );
  };

  const renderContent = () => {
    if (showTextInput) {
      return <div style={{ width: "100%" }}>{renderTextInput()}</div>;
    } else {
      return <div className="page-container">{renderResults()}</div>;
    }
  };

  return (
    <>
      {shouldRedirect && <Redirect to="/star-analyzer" />}

      {!showTextInput && !loading && (
        <FilterBar
          applyFilter={handleFilterClick}
          selectedFilter={selectedFilter}
          star={patp}
          reset={resetInput}
        />
      )}

      {loading && renderLoading()}
      <div className="layout-container">
        {showTextInput && !loading && <HomeHeader gray />}

        {!loading && renderContent()}
      </div>
      {!showTextInput && <Footer className="footer-home" />}
    </>
  );
};

export default StarAnalyzer;
