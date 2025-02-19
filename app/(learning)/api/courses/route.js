import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "lib/db";

export async function POST(req) {
    try {
        const { userId } = await auth()
        const { title } = await req.json()
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const course = await db.course.create({
            data: {
                title,
                userId
            }
        })
        return NextResponse.json(course)
    }
    catch (err) {
        console.log({ error: err.message });
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}