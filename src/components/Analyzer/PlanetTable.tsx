import { Icon } from "@tlon/indigo-react";
import "./StarAnalyzer.scss";
import { sigil, reactRenderer } from "@tlon/sigil-js";
import ReactPaginate from "react-paginate";
import * as utils from "../../utils/analyzer-utils";


interface Planet {
  point: number;
  patp: string;
  tags?: string[];
}

interface PlanetTableProps {
  items: Planet[];
  currentPage: number;
  itemOffset: number;
  setItemOffset: (offset: number) => void;
  setCurrentPage: (page: number) => void;
}

const PlanetTable: React.FC<PlanetTableProps> = (props) => {
  const { items, currentPage, itemOffset } = props;

  const Items: React.FC<{ currentItems: Planet[] }> = ({ currentItems }) => {
    return (
      <>
        {currentItems.map((planet, index) => (
          <tr key={index} >
            <td>
              {sigil({
                patp: planet.patp,
                renderer: reactRenderer,
                size: 30,
                colors: ["black", "#FFFFFF"],
              })}
            </td>
            <td>{planet.patp}</td>
            <td className={"remove-mobile"}>{planet.point}</td>
            <td style={{ overflowX: "auto", maxWidth: 130 }} >{renderTags(planet.tags || [])}</td>
          </tr>
        ))}
      </>
    );
  };

  const itemsPerPage = 100;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    props.setItemOffset(newOffset);
    props.setCurrentPage(event.selected);
  };

  const renderTags = (tags: string[]) => {
    return tags.map((tag, index) => {
      return (
        <span
          key={index}
          className="tag-badge"
          style={{
            backgroundColor: utils.getTagColor(tag),
          }}
        >
          {tag}
        </span>
      );
    });
  };

  return (
    <>
      <table className="planet-table-container">
        <thead>
          <tr id="unique-id" style={{ borderBottom: "2px solid #000" }}>
            <th style={{ padding: "30px 0" }}>Sigil</th>
            <th style={{ padding: "30px 0" }}>Name</th>
            <th className={"remove-mobile"} style={{ padding: "30px 0" }}>
              ID
            </th>
            <th style={{ padding: "30px 0" }}> Tags</th>
          </tr>
        </thead>
        <tbody style={{ whiteSpace: "nowrap" }}>
          <Items currentItems={currentItems} />
        </tbody>
      </table>

      <div
        className="pagination-container"
        style={{ cursor: "pointer", marginTop: 50 }}
      >
        <ReactPaginate
          forcePage={currentPage}
          nextLabel={<Icon color="#0056b3" size={16} icon="ChevronEast" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={0}
          pageCount={pageCount}
          previousLabel={<Icon color="#0056b3" size={16} icon="ChevronWest" />}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default PlanetTable;
