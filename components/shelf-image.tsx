import React, { useState, useEffect } from 'react';

interface ShelfDetection {
    id: string;
    x: string;
    y: string;
    width: string;
    height: string;
    productName: string;
}

interface ShelfAnalyzerProps {
    imageUrl: string | undefined;
    detections: ShelfDetection[] | undefined;
    selectedProduct: string | undefined;
}

const ShelfAnalyzer: React.FC<ShelfAnalyzerProps> = ({ imageUrl, detections, selectedProduct }) => {
    const [tooltipContent, setTooltipContent] = useState<string | null>(null);
    const [imageSize, setImageSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        const image = new Image();
        image.src = imageUrl as string;

        image.onload = () => {
            setImageSize({ width: image.naturalWidth, height: image.naturalHeight });
        };

        image.onerror = (error) => {
            console.error('Error loading image:', error);
        };
    }, [imageUrl]);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const image = event.currentTarget;
        setImageSize({ width: image.naturalWidth, height: image.naturalHeight });
    };



    const handleMouseEnter = (productName: string) => {
        setTooltipContent(productName);
    };

    const handleMouseLeave = () => {
        setTooltipContent(null);
    };

    return (
        <div className="shelf-analyzer">
            <div className="shelf-image-container relative">
                <img src={imageUrl} alt="Shelf" onLoad={handleImageLoad} width="300px" height="300px" className="max-w-[300px] max-h-[300px] border rounded-lg" style={{ height: "300px", width: "300px" }} />
                <p>Original Image Size: {imageSize.width} x {imageSize.height}</p>
                {
                    detections?.map((detection, index) => (
                        <div
                            key={index}
                            className="absolute border-blue-500 border-2"
                            style={{
                                left: `${(parseFloat(detection.x) / imageSize?.width) * 300}px`,
                                top: `${(parseFloat(detection.y) / imageSize?.height) * 300}px`,
                                width: `${(parseFloat(detection.width) / imageSize?.width) * 300}px`,
                                height: `${(parseFloat(detection.height) / imageSize?.height) * 300}px`,
                                borderColor: (selectedProduct && detection?.productName.toLowerCase().includes(selectedProduct?.toLocaleLowerCase())) ? 'yellow' : 'blue',
                            }}
                            onMouseEnter={() => handleMouseEnter(detection.productName)}
                            onMouseLeave={handleMouseLeave}
                        ></div>
                    ))

                }
                {tooltipContent && (
                    <div className="absolute bg-gray-800 text-white p-2 rounded-md" style={{ left: 0, top: 0 }}>
                        {tooltipContent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShelfAnalyzer;
