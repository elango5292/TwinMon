import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

const sendData = async (res, lastEventId) => {
  const data = await prisma.printerData.findMany({
    take: 1,
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      createdAt: {
        gt: new Date(parseInt(lastEventId, 10) || Date.now()),
      },
    },
  });

  if (data.length > 0) {
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

    response.writeProcessingInstruction('event', 'update');
    response.writeProcessingInstruction('data', JSON.stringify(data[0]));
    response.writeProcessingInstruction('id', data[0].createdAt.getTime().toString());
    response.writeProcessingInstruction('retry', '1000');
    response.writeLine();

    return response;
  }
};

export async function GET(req) {
  const { socket } = req.webSocket;
  const lastEventId = req.nextUrl.searchParams.get('lastEventId');

  if (!socket) {
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

    response.writeProcessingInstruction('retry', '1000');
    response.writeLine();

    return response;
  }

  const sendEvent = async () => {
    const response = await sendData(socket, lastEventId);
    if (response) {
      socket.send(response);
    }
  };

  sendEvent();

  const intervalId = setInterval(sendEvent, 1000);

  socket.on('close', () => {
    clearInterval(intervalId);
  });

  return new Response(null, {
    status: 200,
    webSocket: true,
  });
}