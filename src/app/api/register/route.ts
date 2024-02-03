// npm install @prisma/client @auth/prisma-adapter zod bcrypt
// npm install prisma @types/bcryptjs --save-dev
// npx prisma init
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod"; // or joi, used for validation
import prisma from "@/lib/prisma";

const registerUserSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Invalid email"
    ),
  username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, "Invalid username"),
  password: z.string().min(6, "Password should be minimum 6 characters"),
});

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    // validate the payload with defined schema
    const { email, username, password } = registerUserSchema.parse(payload);
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          {
            username: {
              equals: username,
            },
          },
        ],
      },
    });

    // user exists
    if (user && user.length) {
      return NextResponse.json(
        {
          meta: {
            code: 400,
            message: "User already exists",
          },
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    if (newUser) {
      return NextResponse.json(
        { meta: { code: "OK" } },
        {
          status: 201,
        }
      );
    } else {
      return NextResponse.json({
        meta: { code: 500, message: "Failed to create user in database" },
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        meta: {
          code: err.response.status || "Bad Request",
          message:
            err?.message || "Failed to create account, please contact support",
        },
      },
      {
        status: err.response.status || 400,
      }
    );
  }
};

// signIn is managed by next-auth.js
