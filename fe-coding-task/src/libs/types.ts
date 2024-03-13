export type TChartData = {
  height: number;
  type: 'bar';
  options: {
    chart: { id: string; stacked: boolean; toolbar: { show: boolean }; zoom: { enabled: boolean } };
    responsive: { breakpoint: number; options: { legend: { position: 'bottom'; offsetX: number; offsetY: number } } }[];
    plotOptions: { bar: { horizontal: boolean; columnWidth: string } };
    xaxis: { type: 'category'; categories: string[] };
    legend: { show: boolean; fontSize: string; fontFamily: string; position: 'bottom'; offsetX: number; labels: { useSeriesColors: boolean }; markers: { width: number; height: number; radius: number }; itemMargin: { horizontal: number; vertical: number } };
    fill: { type: 'solid' };
    dataLabels: { enabled: boolean };
    grid: { show: boolean };
  };
  series: { id: string; data: number[], name: string }[];
}

export type TFormData = {
  houseType: string[],
  quarters: number[],
};

export type TDataset = {
  data: number[],
  name: string,
  id: string
};

export type TBarChartData = {
  xAxis: string[];
  series: TDataset[];
};
