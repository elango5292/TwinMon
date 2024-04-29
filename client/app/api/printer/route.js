import { NextResponse } from 'next/server';
import prisma from "@/prisma/client";

// import server_url from '@/api/constants.js';

export async function POST(request) {
  const { nozzleTemp, bedTemp, xPos, yPos, zPos,fanSpeed,printerSpeed } = await request.json();
  const newprinterData = await prisma.printerData.create({
    data: {
      nozzleTemp,
      bedTemp,
      xPos,
      yPos,
      zPos,
      fanSpeed,
      printerSpeed
    },
  });
  return NextResponse.json(newprinterData, { status: 201 });
}

export async function PUT(request) {
  const { id } = request.nextUrl.searchParams;
  const { nozzleTemp: updatedNozzleTemp, bedTemp: updatedBedTemp, xPos: updatedXPos, yPos: updatedYPos, zPos: updatedZPos } = await request.json();
  const updatedprinterData = await prisma.printerData.update({
    where: { id: Number(id) },
    data: {
      nozzleTemp: updatedNozzleTemp,
      bedTemp: updatedBedTemp,
      xPos: updatedXPos,
      yPos: updatedYPos,
      zPos: updatedZPos,
      
    },
  });
  return NextResponse.json(updatedprinterData);
}

export async function DELETE(request) {
  const { id } = request.nextUrl.searchParams;
  const deletedprinterData = await prisma.printerData.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json(deletedprinterData);
}

export async function HEAD() {
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        Allow: 'GET, POST, PUT, DELETE',
      },
    }
  );
}

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const limit = searchParams.get('t') ? parseInt(searchParams.get('t'), 10) : 10;

  const sensorData = await prisma.printerData.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log()
console.log(sensorData)
  return NextResponse.json(sensorData);
}
