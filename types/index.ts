export type DetectionProps = {
    brandName: string
    createdAt: string
    height: string
    id: string
    imageId: string
    imageUUID: string
    productName: string
    shelfLevel: string
    upc: string
    width: string
    x: string
    y: string
  }
  
export interface ImageDataProps {
    imagePath: string;
    detections: DetectionProps[]
  }

  export interface ShelfAnalysisData {
    brandName: string;
    upc: string;
    numFacings: number;
    shelfLevel: string;
    productName: string;
  }
  
  export interface ShelfLevelsData {
    shelfLevel: string;
    percentage: number;
  }