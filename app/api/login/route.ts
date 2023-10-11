import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { signJwtAccessToken } from '@/lib/jwt';

type RequestBody = {
  username: string;
  password: string;
};
export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.username,
      },
    });

    if (!user) {
      return new NextResponse('User not found!', { status: 400 });
    }

    const comparePassword = await bcrypt.compare(body.password, user.password);

    if (!comparePassword) {
      return new NextResponse('Password is incorrect', { status: 401 });
    }

    const { password, ...userWithoutPassword } = user;
    const accessToken = signJwtAccessToken(userWithoutPassword);
    const result = { ...userWithoutPassword, accessToken };
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
