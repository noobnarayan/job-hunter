import { Card, DonutChart, Title } from "@tremor/react";

const departments = [
  {
    name: "Marketing",
    sales: 80,
  },
  {
    name: "Sales",
    sales: 57,
  },
  {
    name: "Human Resources",
    sales: 39,
  },
  {
    name: "Finance",
    sales: 24,
  },
  {
    name: "IT",
    sales: 19,
  },
  {
    name: "Operations",
    sales: 14,
  },
];

const DashBoardDonutChart = () => (
  <Card className="max-w-lg">
    <Title>Hiring by Departments </Title>
    <DonutChart
      className="mt-6"
      data={departments}
      category="sales"
      index="name"
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
    />
  </Card>
);
export default DashBoardDonutChart;
