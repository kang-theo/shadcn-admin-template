// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import { theme } from './theme';

// import charts, all with Chart suffix
import {
  // LineChart,
  // BarChart,
  // PieChart,
  // ScatterChart,
  RadarChart,
  // RadarSeriesOption,
  } from 'echarts/charts';

// import components, all suffixed with Component
import {
  TitleComponent,
  // TitleComponentOption,
  LegendComponent,
  // LegendComponentOption,
} from 'echarts/components';

// import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  // CanvasRenderer,
  SVGRenderer,
} from 'echarts/renderers';

// register theme object
echarts.registerTheme('SHADCN', theme);

// register the required components
echarts.use(
  [TitleComponent, LegendComponent, RadarChart, SVGRenderer]
);

export const ShadcnECharts = echarts;

// keep components of echarts-for-react in the lib
export const ReactECharts = ReactEChartsCore;