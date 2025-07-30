import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { CircularLoading } from "@/lib/loadings";
// import FfmpegTest from "@/features/post/lib/Files";

const SalesLineChart = () => {
  const chart = useChart({
    data: [
      { sale: 10, month: "January" },
      { sale: 95, month: "February" },
      { sale: 87, month: "March" },
      { sale: 88, month: "May" },
      { sale: 65, month: "June" },
      { sale: 90, month: "August" },
    ],
    series: [{ name: "sale", color: "teal.solid" }],
  });

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <LineChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke={chart.color("border")}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          stroke={chart.color("border")}
        />
        <Tooltip
          animationDuration={100}
          cursor={false}
          content={<Chart.Tooltip />}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
};

const AllocationBarChart = () => {
  const chart = useChart({
    data: [
      { allocation: 60, type: "Stock" },
      { allocation: 45, type: "Crypto" },
      { allocation: 12, type: "ETF" },
      { allocation: 4, type: "Cash" },
    ],
    series: [{ name: "allocation", color: "teal.solid" }],
  });

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey={chart.key("type")} />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
};
const metricCards = [
  { label: "Followers", value: "12,345", change: "+12%" },
  { label: "Reach", value: "25,678", change: "+8%" },
  { label: "Engagement", value: "5,432", change: "+5%" },
];
export function MainContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);
  if (loading) return <CircularLoading />;
  return (
    <Box>
      <Grid
        w="full"
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={4}
        mb={10}
      >
        {/* <FfmpegTest /> */}
        {metricCards.map((stat) => (
          <Box key={stat.label} p={4} borderRadius="lg" bg="bg.MUTED">
            <Text fontSize="sm" color="fg.MUTED">
              {stat.label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="fg.DEFAULT">
              {stat.value}
            </Text>
            <Text fontSize="sm" color="secondary.500" fontWeight="medium">
              {stat.change}
            </Text>
          </Box>
        ))}
      </Grid>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={6}>
        <GridItem>
          <Box
            bg="white"
            _dark={{ bg: "primary.800" }}
            borderRadius="lg"
            p={4}
            shadow="md"
          >
            <Text fontWeight="medium" mb={2}>
              User Growth
            </Text>
            <SalesLineChart />
          </Box>
        </GridItem>

        <GridItem>
          <Box
            bg="white"
            _dark={{ bg: "primary.800" }}
            borderRadius="lg"
            p={4}
            shadow="md"
          >
            <Text fontWeight="medium" mb={2}>
              Allocation
            </Text>
            <AllocationBarChart />
          </Box>
        </GridItem>
      </Grid>

      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        <Box
          flex="1"
          bg="white"
          _dark={{ bg: "primary.800" }}
          p={4}
          borderRadius="lg"
          shadow="md"
        >
          <Text fontWeight="medium" mb={2}>
            Recent Activity
          </Text>
          {/* Add list/table here */}
        </Box>

        <Box
          flex="1"
          bg="white"
          _dark={{ bg: "primary.800" }}
          p={4}
          borderRadius="lg"
          shadow="md"
        >
          <Text fontWeight="medium" mb={2}>
            Overview
          </Text>
          {/* Extra widgets */}
        </Box>
      </Flex>
    </Box>
  );
}
