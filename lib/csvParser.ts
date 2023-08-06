import fs from "fs";
import csvParser from "csv-parser";

interface dataModel {
  imageUUID: String;
  upc: string;
  x: string;
  y: string;
  width: string;
  height: string;
  shelfLevel: string;
  productName: string;
  brandName: string;
}

export async function parseCSVFile(filePath: string): Promise<dataModel[]> {
  return new Promise((resolve, reject) => {
    const data: dataModel[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        const trimmedRow: dataModel = {
          imageUUID: row.imageUUID.trim(),
          upc: row.upc.trim(),
          x: row.x.trim(),
          y: row.y.trim(),
          width: row.width.trim(),
          height: row.height.trim(),
          shelfLevel: row.shelfLevel.trim(),
          productName: row.productName.trim(),
          brandName: row["brandName "]?.trim(),
        };
        data.push(trimmedRow);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
