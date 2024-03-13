import { TBarChartData } from "../../libs/types";

export interface TChartDataState {
  value: TBarChartData;
}

const initialState: TChartDataState = {
  value: {
    xAxis: [],
    series: []
  }
}

export const chartDataReducer = (state: TChartDataState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CHART_ACTION':
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
}
