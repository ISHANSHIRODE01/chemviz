'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'components/ui/form'
import { Input } from 'components/ui/input'
import { Button } from 'components/ui/button'
import { Pencil, Loader } from 'lucide-react'
import { useState } from 'react'

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required and should be at least 1 character long.',
    }),
})

export const TitleForm = ({ initialData, courseId }) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || { title: '' }, // Ensure a fallback value
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values) => {
        const previousTitle = initialData.title;
        try {
            form.setValue('title', values.title); 
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success('Title updated successfully!');
        } catch (error) {
            form.setValue('title', previousTitle); // Revert if API fails
            toast.error('Failed to update the title. Please try again.');
        } finally {
            setIsEditing(false);
        }
    };


    if (!initialData) {
        return (
            <div className="mt-6">
                <Loader className="animate-spin h-6 w-6 text-slate-500" />
            </div>
        )
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-bold flex items-center justify-between">
                Course title
                <Button variant="ghost" onClick={toggleEdit} disabled={isSubmitting}>
                    {isEditing ? (
                        <span>Cancel</span>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Title
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                <p className="text-sm mt-2">{initialData.title}</p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={initialData?.title || 'Enter course title'}
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end mt-4">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className="ml-auto"
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
