import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(request, { params }) {
  const { searchParams } = request.nextUrl;
    const id = searchParams.get('id') 
  console.log("form server",id)

  try {
    const device = await prisma.devices.findUnique({
      where: { id: id },
    })

    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }
    console.log(device)

    return NextResponse.json(device);
  } catch (error) {
    console.error('Error fetching device:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}