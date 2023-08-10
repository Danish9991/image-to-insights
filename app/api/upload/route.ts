import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { parseCSVFile } from "@/lib/csvParser";
import prismadb from "@/lib/prismadb";

/**
 * Post request to store the image path and parsed data in db
 * @param request
 * @returns
 */

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files: FileList | null = data.getAll("files") as unknown as FileList;
  let imagePath: string = "";
  let filePath: string = "";

  if (!files) {
    return NextResponse.json({ success: false });
  }

  for (const singleFile of files) {
    const bytes = await singleFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (
      singleFile.name.includes("jpg") ||
      singleFile.name.includes("png") ||
      singleFile.name.includes("jpeg")
    ) {
      imagePath = `/uploads/${singleFile.name}`;
    } else if (singleFile.name.includes("txt")) {
      filePath = `public/uploads/${singleFile.name}`;
    }
    const path = `public/uploads/${singleFile.name}`;
    await writeFile(path, buffer);
  }

  const parsedData = await parseCSVFile(filePath);

  try {
    const img = await prismadb.image.create({
      data: {
        imagePath,
        detections: {
          create: parsedData as [],
        },
      },
      include: {
        detections: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ success: true });
}

/**
 * Get request to fetch all data from db
 * @param request
 * @param param1
 * @returns
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { sortBy: string } }
) {
  try {
    console.log(request.nextUrl.searchParams.get("sortBy"));
    const filter =
      request.nextUrl.searchParams.get("sortBy") === "asc" ? "asc" : "desc";

    const data = await prismadb.image.findMany({
      orderBy: {
        createdAt: filter,
      },
      where: {},
      include: {
        detections: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("error =>", error);
  }
}
