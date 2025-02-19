import React from 'react'
import { db } from 'lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { IconBadge } from 'components/icon-badge'
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from 'lucide-react'
import { TitleForm } from './_components/Titleform'
import { DescriptionForm } from './_components/Descriptionform'
import { ImageForm } from './_components/image-form'
import { CategoryForm } from './_components/Categoryform'
import { PriceForm } from './_components/Priceform'
import { AttachmentForm } from './_components/Attachmentform'
import { ChaptersForm } from './_components/Chaptersform'
import { Banner } from 'components/banner'
import { Actions } from './_components/actions'

const CourseIdPage = async ({ params }) => {
    const { courseId } = await params;
    const { userId } = await auth()
    if (!userId) { return redirect('/learning') }
    const course = await db.course.findUnique({
        where: {
            id: courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    if (!course) { return redirect('/learning') }
    const categories = await db.category.findMany({ orderBy: { name: "asc" } });

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!course.isPublished && (
                <Banner
                    label="This course is unpublished. It will not be visible to the students."
                />
            )}
            <div className='p-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-2'>
                        <h1 className='text-3xl font-bold'>Course setup</h1>
                        <span className='text-sm text-slate-600'>Complete all fields {completionText}</span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={courseId}
                        isPublished={course.isPublished}
                    />
                </div>
                <div className='grid grid-cols-1 gap-6 mt-16 md:grid-cols-2'>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={LayoutDashboard} size='default' />
                            <h2 className='text-xl'>
                                Customize your course
                            </h2>
                        </div>
                        <TitleForm initialData={course} courseId={course.id} />
                        <DescriptionForm initialData={course} courseId={course.id} />
                        <ImageForm initialData={course} courseId={course.id} />
                        <CategoryForm initialData={course} courseId={course.id} options={categories.map((category) => ({ label: category.name, value: category.id }))} />
                    </div>
                    <div className='space-y-6'>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={ListCheck} size='default' />
                                <h2 className='text-xl'>
                                    Course chapters
                                </h2>
                            </div>
                            <div>
                                <ChaptersForm initialData={course} courseId={course.id} />
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={CircleDollarSign} size='default' />
                                <h2 className='text-xl'>Sell your course</h2>
                            </div>
                            <PriceForm initialData={course} courseId={course.id} />
                        </div>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={File} size='default' />
                                <h2 className='text-xl'>Resources and Attachments</h2>
                            </div>
                            <AttachmentForm initialData={course} courseId={course.id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseIdPage