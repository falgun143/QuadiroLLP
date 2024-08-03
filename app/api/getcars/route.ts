import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


export async function GET(request: NextRequest) {
    try{
        const cars= await prisma.cars.findMany();
       return NextResponse.json({cars,message:"Fetched Cars Successfully"},{status:200},)

    }
    catch(error){
        return NextResponse.json({ message: 'Error while getting cars' }, { status: 500 });
    }
 
}