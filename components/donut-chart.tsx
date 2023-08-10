import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface BrandData {
  brandName: string;
  share: number;
  numFacings?: number;
}

interface BrandShareDoughnutChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  };
  brandShareData: BrandData[]; 
}

const BrandShareDoughnutChart: React.FC<BrandShareDoughnutChartProps> = ({ data, brandShareData }) => {

  
  const chartOptions : any= {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const brandData = data.labels[context.dataIndex] as string;
            const share = data.datasets[0].data[context.dataIndex];
            const numFacings = brandData === 'Other Brands' ? context.raw : brandShareData.find(brand => brand.brandName === brandData)?.numFacings;
            return `${brandData} - ${(share * 100).toFixed(2)}% (${numFacings} Facing${numFacings !== 1 ? 's' : ''})`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={chartOptions} />;
};

export default BrandShareDoughnutChart;
