interface Product {
  brandName: string;
  upc: string;
  shelfLevel: string;
  productName: string;
  numFacings?: number;
}

export const setFilteredData = (products: Product[]): Product[] => {
  const distinctBrands: Product[] = products.reduce(
    (acc: Product[], product: Product) => {
      const existingBrandIndex = acc.findIndex(
        (item: Product) =>
          item.brandName === product.brandName && item.upc === product.upc
      );

      if (existingBrandIndex === -1) {
        acc.push({
          brandName: product.brandName,
          upc: product.upc,
          numFacings: 1,
          shelfLevel: product.shelfLevel,
          productName: product.productName,
        });
      } else {
        acc[existingBrandIndex].numFacings =
          (acc[existingBrandIndex].numFacings ?? 0) + 1;
      }

      return acc;
    },
    []
  );
  return distinctBrands;
};
