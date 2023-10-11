import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';

interface Params {
  params: {
    userId: string;
  };
}
export async function GET(req: Request, { params }: Params) {
  try {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: +params.userId,
      },
    });

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userPosts = await prisma.post.findMany({
      where: {
        authorId: +params.userId,
      },
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(userPosts);
  } catch (error) {
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
