import { Table } from "ant-table-extensions";
import React from "react";

const ContentsTable = ( {
  data = [],
  columns,
  style = { 
    marginTop:"25px"
  }
}) => {

    return <Table
      style={ style }
      dataSource = { data }
      columns = { columns }
      rowClassName = {(record, index) => {
        return "blueback-text"
      }}
      pagination={{
        pageSizeOptions: [ '10', '20', '50', '100', '500'],
        showSizeChanger: true,
        locale: { items_per_page: "" },
        showTotal: (total, range )=>{
          return `total (${total})`
        }
      }}
    />
}

export default ContentsTable;