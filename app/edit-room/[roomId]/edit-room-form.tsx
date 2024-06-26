"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { editRoomAction } from './actions'
import { useParams } from 'next/navigation'
import { IRoom } from '@/db/schema'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    githubRepo: z.string().min(2).max(50),
    language: z.string().min(2).max(50),
})

const EditRoomForm = ({ room }: { room: IRoom }) => {
    const { toast } = useToast()

    const params = useParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: room?.name,
            description: room?.description,
            githubRepo: room?.githubRepo ?? "",
            language: room?.language,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await editRoomAction({
            id: params.roomId! as string,
            ...values
        })
        toast({
            description: "Room Updated",
        })
       
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please Describe what you are coding on
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="githubRepo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Github Repo</FormLabel>
                            <FormControl>
                                <Input placeholder="https://github.com/faizansohail077/dev-finder" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please Enter GithubRepo link
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input placeholder="typescript, nextjs, shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Language your programming languages, framework, libraries so people can find you
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default EditRoomForm