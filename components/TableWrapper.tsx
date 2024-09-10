const TableWrapper = ({ children }) => {
  return (
    <div className="w-2/5 overflow-x-auto">
      <table className="table-fixed">{children}</table>
    </div>
  )
}

export default TableWrapper
