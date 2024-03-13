import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Alert
} from "@mui/material";

import ChartCom from "./ChartCom";
import Filtercom from "./FilterCom";
import StorageCom from "./StorageCom";
import { addSearchLog, setLocalStorageLogAction } from "../store/action";
import { RootState } from "../store";
import { TStorageItem } from "../store/reducer/storageReducer";

/////////////// default component ///////////////////////////
const MainCom: React.FC = () => {
  const dispatch = useDispatch();

  const [alertLoding, setAlertloding] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const LocalStorageLog = localStorage.getItem("searchLog") ?? '[]';
  dispatch(setLocalStorageLogAction(JSON.parse(LocalStorageLog)));
  const chartData = useSelector((state: RootState) => state.rootReducer.chartDataReducer.value);

  const seachLogSaveAction = () => {
    if (searchTitle !== "") {
      const existingItem = JSON.parse(LocalStorageLog).find((item: TStorageItem) => item.title === searchTitle);
      if (existingItem) {
        setAlertloding(true);
      } else {
        dispatch(addSearchLog(searchTitle, chartData.xAxis, chartData.series));
      }
      setIsFormInvalid(false);
    } else {
      setIsFormInvalid(true);
    }
  }

  return (
    <Box sx={{ background: '#eef2f6', borderRadius: 3, p: 3 }}>
      <Grid container>
        <Grid item xs={12}>
          {alertLoding && (
            <Grid mb={2}>
              <Alert severity="warning" onClose={() => { setAlertloding(false) }} >
                Error, Title equal!
              </Alert>
            </Grid>

          )}
          <Grid container display={"flex"} flexDirection={"row"}>
            <Grid item lg={8} md={12} sm={12} xs={12} pr={3}>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ background: '#fff', color: '#364152', borderRadius: 3, border: '1px solid #90caf925', p: 5, mb: 3 }}>
                <Filtercom />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ background: '#fff', color: '#364152', borderRadius: 3, border: '1px solid #90caf925', p: 5 }}>
                <ChartCom />
              </Grid>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12} sx={{ background: '#fff', color: '#364152', borderRadius: 3, border: '1px solid #90caf925', p: 5, flexGrow: 1, }}>
              <Grid mb={5}>
                <Typography variant="h5">Save Search Log</Typography>
                <Grid display={"flex"} flexDirection={"row"} mt={3} gap={3}>
                  <TextField error={isFormInvalid} helperText={isFormInvalid && "Please fill out this field!"} id="standard-basic" variant="outlined" label="Search Title" onChange={(e) => setSearchTitle(e.target.value)} />
                  <Button sx={{ height: 56 }} variant="contained" onClick={seachLogSaveAction}>Log Save</Button>
                </Grid>
              </Grid>
              <StorageCom />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainCom;