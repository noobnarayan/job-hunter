import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";
const chartdata = [
  {
    date: "Dec 21",
    Impressions: 200,
    Applications: 150,
  },
  {
    date: "Dec 22",
    Impressions: 220,
    Applications: 180,
  },
  {
    date: "Dec 23",
    Impressions: 210,
    Applications: 170,
  },
  {
    date: "Dec 24",
    Impressions: 230,
    Applications: 190,
  },
  {
    date: "Dec 25",
    Impressions: 240,
    Applications: 200,
  },
  {
    date: "Dec 26",
    Impressions: 250,
    Applications: 210,
  },
  {
    date: "Dec 27",
    Impressions: 260,
    Applications: 220,
  },
];

const DashboardAreaChart = () => {
  return (
    <Card>
      <Title>Impressions and applicatoins overtime</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata}
        index="date"
        categories={["Impressions", "Applications"]}
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
};
export default DashboardAreaChart;
