import { ShelfAnalysisData, ShelfLevelsData } from '@/types';
import React, { useState, useEffect } from 'react';

const ShelfAnalysisChart: React.FC<{ shelfAnalysisData: ShelfAnalysisData[] }> = ({ shelfAnalysisData }) => {
  console.log('shelfAnalysisData =>', shelfAnalysisData);
  
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [shelfLevelsData, setShelfLevelsData] = useState<ShelfLevelsData[]>([]);

  const distinctBrands = [...new Set(shelfAnalysisData.map((item) => item.brandName))];



  useEffect(() => {
    const calculateShelfLevelPercentage = (brandName: string, shelfLevel: string): number => {
      const brandFacings = shelfAnalysisData.filter((item) => item.brandName === brandName);
      const totalFacings = brandFacings.reduce((total, item) => total + item.numFacings, 0);
      const shelfLevelFacings = brandFacings.filter((item) => item.shelfLevel === shelfLevel).reduce((total, item) => total + item.numFacings, 0);
  
      console.log(`Brand: ${brandName}, Shelf Level: ${shelfLevel}, Total Facings: ${totalFacings}, Shelf Level Facings: ${shelfLevelFacings}`);
  
      return (shelfLevelFacings / totalFacings) * 100;
    };
    if (selectedBrand) {
      const topPercentage = calculateShelfLevelPercentage(selectedBrand, 'Top');
      const middlePercentage = calculateShelfLevelPercentage(selectedBrand, 'Middle');
      const bottomPercentage = calculateShelfLevelPercentage(selectedBrand, 'Bottom');
      setShelfLevelsData([
        { shelfLevel: 'TOP', percentage: Math.round(topPercentage) },
        { shelfLevel: 'MIDDLE', percentage: Math.round(middlePercentage) },
        { shelfLevel: 'BOTTOM', percentage: Math.round(bottomPercentage) },
      ]);
    }
  }, [selectedBrand, shelfAnalysisData]);

  return (
    <div>
      {/* Dropdown for selecting the brand */}
      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="">Select Brand</option>
        {distinctBrands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      {selectedBrand && (
        <div>
          <h2>Shelf Level Distribution for {selectedBrand}</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {shelfLevelsData.map((data) => (
              <div
                key={data.shelfLevel}
                style={{
                  width: `${data.percentage}%`,
                  backgroundColor: data.shelfLevel === 'TOP' ? 'red' : data.shelfLevel === 'MIDDLE' ? 'blue' : 'green',
                  height: '20px',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {shelfLevelsData.map((data) => (
              <div key={data.shelfLevel}>{data.shelfLevel}: {data.percentage}%</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelfAnalysisChart;
