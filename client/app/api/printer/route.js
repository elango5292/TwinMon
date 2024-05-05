import { NextResponse } from 'next/server';
import prisma from "@/prisma/client";
import * as constants from '@/app/api/constants.js';
import axios from 'axios';


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

  let sensorData = await prisma.printerData.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (limit === 1) {
    console.log("entered 1");
    let predata = JSON.stringify({"data":[[sensorData[0].nozzleTemp,sensorData[0].bedTemp,sensorData[0].fanSpeed,sensorData[0].printerSpeed]]});
    console.log(predata);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: constants.server_url+"/predict",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : predata
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data.prediction));
      sensorData[0].prediction = response.data.prediction[0];
      console.log(sensorData);
      return NextResponse.json(sensorData);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(sensorData);
  return NextResponse.json(sensorData);
}



