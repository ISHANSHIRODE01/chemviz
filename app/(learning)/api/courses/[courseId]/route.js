import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "lib/db";
import Mux from "@mux/mux-node";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID,
    process.env.MUX_TOKEN_SECRET
)

export async function DELETE(req, { params }) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        })
        if (!course) {
            return new NextResponse('Not Found', { status: 404 })
        }
        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await Video.Assets.del(chapter.muxData.assetId)
            }
        }
        const deleteCourse = await db.course.delete({
            where: {
                id: courseId
            }
        })
        return new NextResponse('Course deleted successfully')
    }
    catch (err) {
        console.log({ error: err.message });
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        const values = await req.json()
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values,
            }
        })
        return NextResponse.json(course)
    } catch (err) {
        console.log({ error: err.message });
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
