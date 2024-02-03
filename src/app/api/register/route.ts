// npm install @prisma/client @auth/prisma-adapter zod bcrypt
// npm install prisma @types/bcryptjs --save-dev
// npx prisma init
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod"; // or joi, used for validation

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
