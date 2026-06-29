import { PAGE_SIZE_OPTIONS } from "../utils/constants";

const Pagination = ({ currentPage, pageSize, totalCount, onPageChange, onPageSizeChange }) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="pagination">
            <div className="pagination-info">
                Showing <strong>{startItem}–{endItem}</strong> of <strong>{totalCount}</strong> users
            </div>

            <div className="pagination-controls">
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    «
                </button>
                <button
                    className="btn btn-sm btn-outline"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    ‹
                </button>

                <span className="page-indicator">
                    Page {currentPage} of {totalPages || 1}
                </span>

                <button
                    className="btn btn-sm btn-outline"
                    onClick={handleNext}
                    disabled={currentPage >= totalPages}
                >
                    ›
                </button>
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage >= totalPages}
                >
                    »
                </button>
            </div>

            <div className="page-size-selector">
                <label htmlFor="page-size">Rows:</label>
                <select
                    id="page-size"
                    value={pageSize}
                    onChange={(e) => {
                        onPageSizeChange(Number(e.target.value));
                        onPageChange(1); // reset to first page on size change
                    }}
                >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Pagination;