import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    userId: string;
  };
}
export async function GET(req: Request, { params }: Params) {
  try {
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
