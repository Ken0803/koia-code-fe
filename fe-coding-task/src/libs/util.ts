// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

export const MIN_YEAR = 2009;
export const MAX_YEAR = new Date().getFullYear() - 1; // TODO: Looks like API returns error when quarter is in future, restrict selection to only previous quarters
export const API_BASE_URL = "https://data.ssb.no/api/v0/no/table/07241";


export const options = [
  {
    name: "Boliger i alt",
    value: "00",
  },
  {
    name: "Småhus",
    value: "02",
  },
  {
    name: "Blokkleiligheter",
    value: "03"
  }
];

