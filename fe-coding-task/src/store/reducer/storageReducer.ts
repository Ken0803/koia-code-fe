import { TBarChartData } from "../../libs/types";

export interface TStorageItem {
  id: number;
  title: string;
  chartData: TBarChartData;
}

export interface TStorageState {
  value: TStorageItem[];
}

const initialState: TStorageState = {
  value: [],
}

export const storageReducer = (state: TStorageState = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_LOG_STORAGE_ACTION':
      const newItem: TStorageItem = {
        id: action.item_id, // Assuming action.item_id is a number
        title: action.title, // You might want to replace this with the actual title
        chartData: action.payload, // Assuming action.payload is TBarChartData
      };
      return {
        ...state,
        value: [...state.value, newItem],
      };

    case 'SET_LOG_STORAGE_ACTION':
      return {
        ...state,
        value: action.data,
      };
    default:
      return state;
  }
}