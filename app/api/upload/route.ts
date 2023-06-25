import { NextResponse } from "next/server";


export async function POST( request: Request ) {
    const { path } = await request.json();

    if( !path ) {
        return NextResponse.json(
            { message: 'Image path is required' },
            { status: 400 }
        )
    }

    try {
        
        // TODO: Create the logic for upload images

        const result = { 
            imageUrl: 'https://images8.alphacoders.com/131/thumbbig-1311910.webp',
        } 

        return NextResponse.json(
            result,
            { status: 200 } 
        )
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 } 
        )
    }

}