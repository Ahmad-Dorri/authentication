import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

type RequestBody = {
  name: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    const sameEmail = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (sameEmail) {
      return new NextResponse('Email already exists.', {
        status: 400,
      });
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    if (!user) {
      return new NextResponse('user not created', { status: 401 });
    }

    const { password, ...result } = user;

    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
