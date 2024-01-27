const TableWrapper = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  );
};

export default TableWrapper;
