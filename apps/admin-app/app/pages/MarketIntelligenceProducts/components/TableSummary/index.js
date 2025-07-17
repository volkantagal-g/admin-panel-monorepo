import { useEffect, useState } from 'react';
import { Table } from 'antd';

const TableSummary = (showPrediction, tableData, classes) => {
  const [uniqueList, setUniqueList] = useState({
    uniqueCategoryList: [],
    uniquePredCategoryList: [],
    uniqueSubCategoryList: [],
    uniquePredSubCategoryList: [],
    uniqueBrandList: [],
    uniqueProductList: [],
  });

  useEffect(() => {
    const filteredData = tableData;

    const uniqueCategoryList = [];
    const uniquePredCategoryList = [];
    const uniqueSubCategoryList = [];
    const uniquePredSubCategoryList = [];
    const uniqueBrandList = [];
    const uniqueProductList = [];

    filteredData.forEach(element => {
      if (!uniqueCategoryList.includes(element.category)) uniqueCategoryList.push(element.category);
      if (!uniquePredCategoryList.includes(element.pred_category)) uniquePredCategoryList.push(element.pred_category);
      if (!uniqueSubCategoryList.includes(element.subcategory)) uniqueSubCategoryList.push(element.subcategory);
      if (!uniquePredSubCategoryList.includes(element.pred_subcategory)) uniquePredSubCategoryList.push(element.pred_subcategory);
      if (!uniqueBrandList.includes(element.brand)) uniqueBrandList.push(element.brand);
      if (!uniqueProductList.includes(element.product_name)) uniqueProductList.push(element.product_name);
    });

    setUniqueList({
      uniqueCategoryList,
      uniquePredCategoryList,
      uniqueSubCategoryList,
      uniquePredSubCategoryList,
      uniqueBrandList,
      uniqueProductList,
    });
  }, [tableData]);

  return (
    <Table.Summary fixed="top">
      <Table.Summary.Row>
        <Table.Summary.Cell>
          <div
            className={classes.tableSummaryCell}
          >
            {uniqueList.uniqueCategoryList?.length}
          </div>
        </Table.Summary.Cell>
        {showPrediction ? (
          <Table.Summary.Cell>
            <div
              className={classes.tableSummaryCell}
            >
              {uniqueList.uniquePredCategoryList?.length}
            </div>
          </Table.Summary.Cell>
        )
          : null}
        <Table.Summary.Cell>
          <div className={classes.tableSummaryCell}>
            {uniqueList.uniqueSubCategoryList?.length}
          </div>
        </Table.Summary.Cell>
        {showPrediction ? (
          <Table.Summary.Cell>
            <div className={classes.tableSummaryCell}>
              {uniqueList.uniquePredSubCategoryList?.length}
            </div>
          </Table.Summary.Cell>
        )
          : null}
        <Table.Summary.Cell>
          <div className={classes.tableSummaryCell}>
            {uniqueList.uniqueBrandList?.length}
          </div>
        </Table.Summary.Cell>
        <Table.Summary.Cell>
          <div className={classes.tableSummaryCell}>
            {uniqueList.uniqueProductList?.length}
          </div>
        </Table.Summary.Cell>
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell />
        <Table.Summary.Cell />
      </Table.Summary.Row>
    </Table.Summary>
  );
};
export default TableSummary;
