"use client";

import React, { useState } from "react";
import { ShadcnECharts, ReactECharts } from "@/lib/echarts";
const numberFormatter = new Intl.NumberFormat();

function Chart() {
  const [loading, setLoading] = useState(false);

  // mock data
  const xAxis = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const yAxis: number[] = [];
  for (let i = 0; i < 12; i++) {
    yAxis.push(Math.floor(Math.random() * 5000) + 1000);
  }

  const option = {
    grid: {
      show: false,
      containLabel: false,
      top: "10%",
      height: "80%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      formatter: (params: any) => {
        let dom = `<div style="text-align: left"><div style="text-align: center;font-weight: 600">Yearly ${params[0].axisValue} Cost</div>`;
        let item, value;

        for (let i = 0; i < params.length; i++) {
          item = params[i];
          // value = Number.parseInt(item.data);
          value = `$${numberFormatter.format(item.data)}`;
          if (item.seriesName !== "Shadow") {
            dom += `<div style="color: #fff">${item.marker}<span style="text-align:left; color: rgba(0, 0, 0, 0.85);">${item.seriesName}:<span> <span style="color: rgba(0, 0, 0, 0.85);">${value}</span></div>`;
          }
        }
        return dom + "</div>";
      },
    },
    xAxis: {
      type: "category",
      data: xAxis,
      // axisLabel: {
      //   inside: true,
      //   color: '#fff',
      // },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
        formatter: function (value: any, index: number) {
          if (Number.isInteger(value)) {
            return value;
          }
          return null;
        },
      },
    },
    series: [
      {
        data: yAxis,
        type: "bar",
      },
    ],
  };

  const onChartReadyCallback = (e: any) => {
    // console.log('onChartReadyCallback:', e);
  };

  const onChartClick = (e: any) => {
    // console.log("onChartClick:", e);
  };

  const onEvents = {
    click: onChartClick,
    // 'legendselectchanged': onChartLegendselectchanged
  };

  return (
    <div>
      <ReactECharts
        echarts={ShadcnECharts}
        option={option}
        showLoading={loading}
        loadingOption={{
          color: "#16a34a",
        }}
        notMerge={true}
        lazyUpdate={true}
        // style={{ height: "250px", width: "100%" }}
        // theme={"SHADCN"}
        onChartReady={onChartReadyCallback}
        onEvents={onEvents}
        // opts={}
      />
    </div>
  );
}

export default React.memo(Chart);
