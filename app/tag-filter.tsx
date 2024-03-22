"use client"
import { Badge } from '@/components/ui/badge'
import { IRoom } from '@/db/schema'
import { useRouter } from 'next/navigation'
import React from 'react'

const Tagfilter = ({ room }: { room: IRoom }) => {
    const languages = room?.language.split(",").map((tag) => tag.trim())
    const router = useRouter()
    return (
        <div className="flex items-center gap-2 flex-wrap">
            {
                languages?.map((language) => {
                    return (
                        <Badge  onClick={() => router.push(`/?search=${language}`)} variant="outline" className="w-fit  cursor-pointer"  key={language} >{language}</Badge>
                    )
                })
            }
        </div>
    )
}

export default Tagfilter