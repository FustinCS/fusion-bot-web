'use client'
import { useSession } from "next-auth/react"

export default function ListPage(){
    const { data: session, status } = useSession()
    if (status === "loading") return <div>Loading...</div>
    if (!session) return <div>Access Denied</div>

    return (
        <div>
        <h1>Hi this is my discord bot home page :D</h1>
        <h3>Nothing to see here k thx bye</h3>
        </div>
    )
}