"use client"

import { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image'
import { Modal } from '@/components/ui/modal';
import { DataTableDemo } from '@/components/data-table';
import { setFilteredData } from '@/lib/setFilteredData';
import { calculateBrandShare } from '@/lib/brandShareData';
import { columns } from './column';
import { Chart, registerables } from 'chart.js';
import { DoughnutController } from 'chart.js';
import { ArcElement } from 'chart.js';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

Chart.register(...registerables, DoughnutController, ArcElement);

import BrandShareDoughnutChart from '@/components/donut-chart';
import { SkeletonProvider } from '@/providers/skelton-provider';
import { ImageDataProps, DetectionProps } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import ShelfAnalysisChart from '@/components/shelf-analysis-chart';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [imageData, setImageData] = useState<ImageDataProps | null>(null)
  const [tableData, setTableData] = useState<any>(null)
  const [brandChartData, setBrandChartData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState("asc")

  useEffect(() => {
    fetchData('asc');
  }, []);

  const fetchData = async (filter: string) => {
    const queryParams = {
      sortBy: 'desc'
    };
    try {
      setIsLoading(true)
      const response = await axios.get(`/api/upload`, { params: { sortBy: filter } });
      console.log('response.data =>', response.data);
      setIsLoading(false)
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpenModal = (data: any) => {
    setImageData(data);
    const filteredData: any[] = setFilteredData(data?.detections);
    const brandShareData = calculateBrandShare(filteredData)

    setTableData({ isValue: true, data: filteredData })
    console.log('filteredData =>', filteredData);
    setIsModalOpen(true);
    const chartData = {
      labels: brandShareData.map((brand:any) => brand.brandName),
      datasets: [
        {
          data: brandShareData.map((brand :any) => brand.share),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#A7A7A7'], // Add more colors if needed
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#A7A7A7'], // Add more colors if needed
        },
      ],
    };

    console.log('chartData => ', chartData);

    setBrandChartData({ brandShareData, chartData })

  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilter = (filter: string) => {
    console.log(filter);
    setPosition(filter)
    fetchData(filter);
  }

  return (

    <>
      {isLoading ? (
        <div className='flex flex-col mt-[200px] h-full space-y-8 items-center justify-center'>
          {/* <SkeletonProvider /> */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-[90px]'>
          {isModalOpen && tableData?.data?.length > 1 && (
            <Modal
              title='Insights'
              description='Checkout the product Insights'
              isOpen={true}
              onClose={handleCloseModal}
            >
              <div className="flex  max-w-60rem">

                <DataTableDemo columns={columns} data={tableData?.data} />
                <div className='mx-auto'>
                <ShelfAnalysisChart shelfAnalysisData={tableData?.data} />
                  <Image src={imageData?.imagePath || ''} alt='image' width={250} height={250} className='h-[250px] rounded-lg cursor-pointer' />
                  <div style={{ maxWidth: '400px', height: '200px' }} className='mt-4'>
                    <BrandShareDoughnutChart data={brandChartData?.chartData} brandShareData={brandChartData?.brandShareData} />
                  </div>
                </div>

              </div>
            </Modal>
          )}
          <div className="flex justify-between">
            <div className="container">
              {/* <h2 className="font-bold text-gray-700">Products</h2> */}
            </div>
            <div className='mr-[90px]'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={position} onValueChange={(value) => { handleFilter(value) }}>
                    <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="desc">Desending</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center mt-4">
            {data?.map((img: any) => (
              <div key={img.id} className='group'>
                <Image key={img.id} onClick={() => { handleOpenModal({ imagePath: img.imagePath, detections: img.detections }) }} src={img?.imagePath} alt='image' width={300} height={200} className="h-[330px] cursor-pointer rounded-lg transform transition-transform hover:brightness-55 group-hover:scale-105" />

              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
