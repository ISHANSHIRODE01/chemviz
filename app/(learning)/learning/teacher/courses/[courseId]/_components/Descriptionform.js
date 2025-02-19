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
import { Button } from 'components/ui/button'
import { Pencil, Loader } from 'lucide-react'
import { useState } from 'react'
import { cn } from 'lib/utils'
import { Textarea } from 'components/ui/textarea'

const formSchema = z.object({
    description: z.string().min(1, {
        message: 'Description is required and should be at least 1 statement long.',
    }),
})

export const DescriptionForm = ({ initialData, courseId }) => {
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
            toast.success('Description updated successfully!');
            
        } catch (error) {
            form.setValue('title', previousTitle); // Revert if API fails
            toast.error('Failed to update the description. Please try again.');
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
                Course description
                <Button variant="ghost" onClick={toggleEdit} disabled={isSubmitting}>
                    {isEditing ? (
                        <span>Cancel</span>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Description
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                <p className={cn('text-sm mt-2', !initialData.description && 'italic text-slate-500')}>{initialData.description || 'No description'}</p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={initialData?.description || 'e.g this course is about ...'}
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
