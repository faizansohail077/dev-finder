"use client"
import React, { useEffect } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

const formSchema = z.object({
    search: z.string(),
})

const SearchBar = () => {
    const router = useRouter()
    const query = useSearchParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: query?.get("search") ?? "",

        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.search) {

            router.push(`/?search=${values.search}`)
        } else {
            router.push(`/`)
        }
    }
    useEffect(() => {
        form.setValue("search", query?.get("search") ?? "")
    }, [query?.get("search"), form])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 mb-4">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className='w-[400px]' placeholder="Filter rooms by Keywords " {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    <SearchIcon className='mr-2' />
                    Submit</Button>

                {query?.get("search") && (
                    <Button variant={"link"} onClick={() => {
                        form.setValue("search", "")
                        router.push("/")
                    }} >Clear</Button>
                )}
            </form>
        </Form>
    )
}

export default SearchBar