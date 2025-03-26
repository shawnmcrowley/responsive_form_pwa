import { NextRequest, NextResponse } from "next/server"
/*
export async function GET(req) {
    const searchParams = new URLSearchParams(req.nextUrl.search)
    const first = searchParams.get('first_name')
    const last = searchParams.get('last_name')
    console.log ('Form Data:', first+" " +last)
    return NextResponse.json({message: 'Form submitted successfully', first, last})
}
*/

export async function POST(req, res){
    //const data = req.body
    const formData = await req.formData()
    const firstname = formData.get('first_name')
    const lastname = formData.get('last_name')
    console.log('Received data: ', firstname, lastname)
    return NextResponse.json({message: "Data Submitted Successfully", firstname, lastname,
        status: 200
    })

}