export const Paginations = ({ currentPage, totalPages, handlePageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 3;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-3 py-2 rounded-full shadow-sm border text-sm font-medium transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-600 hover:bg-primary hover:text-white hover:scale-105"
        }`}
      >
        ⬅ Prev
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
            currentPage === page
              ? "bg-primary text-white font-bold shadow-md"
              : "bg-white text-gray-600 hover:bg-primary hover:text-white hover:scale-105"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-3 py-2 rounded-full shadow-sm border text-sm font-medium transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-600 hover:bg-primary hover:text-white hover:scale-105"
        }`}
      >
        Next ➡
      </button>
    </div>
  );
};
