interface Product {
  brandName: string;
  upc: string;
  numFacings?: number;
}

export const calculateBrandShare = (products: Product[]) => {
  const brandCounts: { [key: string]: number } = {};
  let totalFacings = 0;

  products.forEach((product) => {
    const brandName = product.brandName;
    const numFacings = product.numFacings || 0;
    totalFacings += numFacings;
    brandCounts[brandName] = (brandCounts[brandName] || 0) + numFacings;
  });

  const brandShare: { brandName: string; share: number; numFacings: number }[] =
    [];
  for (const brandName in brandCounts) {
    const share = brandCounts[brandName] / totalFacings;
    brandShare.push({ brandName, share, numFacings: brandCounts[brandName] });
  }

  const sortedBrands = brandShare.sort((a, b) => b.share - a.share);

  const top5Brands = sortedBrands.slice(0, 5);
  const otherBrands = sortedBrands.slice(5);

  const totalFacingCountOtherBrands = otherBrands.reduce(
    (acc, brand) => acc + brand.numFacings,
    0
  );

  // Add "Other Brands" to the top 5 brands
  const chartData = [
    ...top5Brands,
    {
      brandName: "Other Brands",
      share: totalFacingCountOtherBrands / totalFacings,
      numFacings: totalFacingCountOtherBrands,
    },
  ];

  return chartData;
};
