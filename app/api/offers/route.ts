import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET() {
    try {
        await connectDB();
        const offers = await Product.find({ isOnOffer: true }).sort({ createdAt: -1 });
        return NextResponse.json(offers);
    } catch (error) {
        console.error("Error fetching offers:", error);
        return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
    }
}
