import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type:"datetime",
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-04-12T00:00:00.000z',
      '2021-04-13T00:00:00.000z',
      '2021-04-14T00:00:00.000z',
      '2021-04-15T00:00:00.000z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
}

const series = [
  { name: 'Series1', data: [31, 130, 20, 18] }
]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex width="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid felx="1" gap="4" w="100%" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius="8"
            pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart options={options} series={series} type="area" h={160} />
          </Box>

          <Box
            p="8"
            bg="gray.800"
            borderRadius="8"
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart options={options} series={series} type="area" h={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}