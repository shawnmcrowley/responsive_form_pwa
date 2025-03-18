import { NextResponse } from "next/server"

export async function GET(req, res) {
    const searchParams = new URLSearchParams(req.nextUrl.search)
    const first = searchParams.get('first_name')
    const last = searchParams.get('last_name')
    console.log ('Form Data:', first)
    return NextResponse.json({message: 'Form submitted successfully', last})
}