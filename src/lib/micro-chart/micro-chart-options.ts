import { DataPoint } from 'highcharts';
import { DtChartOptions } from '@dynatrace/angular-components/chart';
import { DtMicroChartColorPlaceholder } from './micro-chart-colorizer';

export const _DT_MICROCHART_DEFAULT_OPTIONS: DtChartOptions = {
  colors: [DtMicroChartColorPlaceholder.PRIMARY],
  chart: {
    height: 150,
    plotBorderWidth: 0,
    marginTop: 15,
    marginBottom: 30,
    spacingBottom: 0,
    spacingTop: 0,
  },
  plotOptions: {
    column: {
      states: {
        hover: {
          color: DtMicroChartColorPlaceholder.LIGHTER,
        },
        select: {
          color: DtMicroChartColorPlaceholder.DARKER,
        },
      },
    },
    line: {
      marker: {
        enabled: true,
        states: {
          hover: {
            fillColor: DtMicroChartColorPlaceholder.LIGHTER,
            radius: 7,
            halo: false,
            lineWidth: 2,
            lineWidthPlus: 0,
            lineColor: DtMicroChartColorPlaceholder.PRIMARY,
          },
          select: {
            radius: 7,
            fillColor: DtMicroChartColorPlaceholder.DARKER,
          },
        },
      },
    },
    series: {
      dataLabels: {
        crop: false,
        overflow: 'none',
        style: {
          fontWeight: 'normal',
        },
      },
      states: {
        hover: {
          halo: false,
        },
      },
    },
  },
  legend: {
    enabled: false,
  },
  xAxis: {},
  yAxis: {},
};

export const _DT_MICROCHART_MINMAX_DATAPOINT_OPTIONS: DataPoint = {
  dataLabels: {
    enabled: true,
  },
  marker: {
    lineColor: DtMicroChartColorPlaceholder.DARKER,
    enabled: true,
    radius: 7,
    lineWidth: 2,
    states: {
      hover: {
        lineColor: DtMicroChartColorPlaceholder.DARKER,
        fillColor: DtMicroChartColorPlaceholder.LIGHTER,
      },
    },
  },
};

export const _DT_MICROCHART_LINE_MIN_DATAPOINT_OPTIONS = {
  dataLabels: {
    verticalAlign: 'top',
    y: 3,
  },
};

export const _DT_MICROCHART_LINE_MAX_DATAPOINT_OPTIONS = {
  dataLabels: {
    verticalAlign: 'bottom',
    y: -3,
  },
};

export const _DT_MICROCHART_COLUMN_MINMAX_DATAPOINT_OPTIONS = {
  borderColor: DtMicroChartColorPlaceholder.DARKER,
  dataLabels: {
    verticalAlign: 'bottom',
  },
  borderWidth: 2,
};