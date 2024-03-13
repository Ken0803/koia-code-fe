import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@mui/material";

import { TBarChartData } from "../libs/types";
import { RootState } from "../store";
import { setChartDataAction } from "../store/action";
import { TStorageItem } from "../store/reducer/storageReducer";
const StorageCom = () => {

  const storageData = useSelector((state: RootState) => state.rootReducer.storageReducer.value);
  localStorage.setItem('searchLog', JSON.stringify(storageData));
  const dispath = useDispatch();
  const logReviewFunc = (data: TBarChartData) => {
    dispath(setChartDataAction(data.xAxis, data.series));
  }
  return (
    <>
      <Typography variant="h5">Storage</Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {storageData.map((item: TStorageItem, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center"><Button onClick={() => logReviewFunc(item.chartData)}>View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StorageCom;