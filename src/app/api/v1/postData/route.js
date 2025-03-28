import { NextResponse } from "next/server"
/*
export async function GET(req) {
    const searchParams = new URLSearchParams(req.nextUrl.search)
    const first = searchParams.get('first_name')
    const last = searchParams.get('last_name')
    console.log ('Form Data:', first+" " +last)
    return NextResponse.json({message: 'Form submitted successfully', first, last})
}
*/


export async function POST(req) {
    try {
        const formData = await req.formData()
        const name = formData.get('name')
        const email = formData.get('email')

        // Validate input
        if (!name || !email) {
            return NextResponse.json({
                message: "Missing required fields",
                status: 400
            }, { status: 400 })
        }

        console.log('Received data: ', name, email)
        
        return NextResponse.json({
            message: "Data Submitted Successfully", 
            name, 
            email,
            status: 200
        }, { status: 200 })
    } catch (error) {
        console.error('Error processing form data:', error)
        return NextResponse.json({
            message: "Error processing form data",
            status: 500
        }, { status: 500 })
    }
}