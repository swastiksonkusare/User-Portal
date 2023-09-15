import React from "react";

import "./Pagination.scss";

const Pagination = ({ prevPage, currentPage, totalPages, nextPage }) => {
  return (
    <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <div className="page-number">
        Page {currentPage} of {totalPages}
      </div>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
