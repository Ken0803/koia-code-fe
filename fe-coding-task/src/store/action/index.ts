import { TDataset, TBarChartData } from './../../libs/types';

const SET_CHART_ACTION = "SET_CHART_ACTION";
const ADD_LOG_STORAGE_ACTION = "ADD_LOG_STORAGE_ACTION";
const SET_LOG_STORAGE_ACTION = 'SET_LOG_STORAGE_ACTION';

interface TStorageItem {
  id: number;
  title: string;
  chartData: TBarChartData;
}

export function setChartDataAction(xAxis: string[], series: TDataset[]) {
  let payload = {
    xAxis,
    series
  }
  return {
    type: SET_CHART_ACTION,
    payload
  }
}

export function addSearchLog(searchText: string, xAxis: string[], series: TDataset[]) {
  let payload = {
    xAxis,
    series
  }
  return {
    type: ADD_LOG_STORAGE_ACTION,
    title: searchText,
    payload
  }
}

export function setLocalStorageLogAction(data: TStorageItem) {
  return {
    type: SET_LOG_STORAGE_ACTION,
    data
  }
}