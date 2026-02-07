import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import connectDB from "@/lib/db";
import Coupon from "@/lib/models/Coupon";
import Admin from "@/lib/models/Admin";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await currentUser();
        const email = user?.emailAddresses[0]?.emailAddress;

        await connectDB();

        const isSuperAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        let isRegularAdmin = false;

        if (!isSuperAdmin) {
            const admin = await Admin.findOne({ email });
            isRegularAdmin = !!admin;
        }

        if (!isSuperAdmin && !isRegularAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await Coupon.findByIdAndDelete(id);
        return NextResponse.json({ message: "Coupon deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await currentUser();
        const email = user?.emailAddresses[0]?.emailAddress;

        await connectDB();

        const isSuperAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        let isRegularAdmin = false;

        if (!isSuperAdmin) {
            const admin = await Admin.findOne({ email });
            isRegularAdmin = !!admin;
        }

        if (!isSuperAdmin && !isRegularAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        console.log(`[Coupon API] Updating ${id}:`, body);

        // Use updateOne to ensure strict persistence
        const result = await Coupon.updateOne({ _id: id }, { $set: body });

        if (result.matchedCount === 0) {
            console.error(`[Coupon API] Coupon not found: ${id}`);
            return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
        }

        const updatedCoupon = await Coupon.findById(id).lean();
        console.log(`[Coupon API] Update successful: ${id}`, updatedCoupon);

        return NextResponse.json(updatedCoupon, {
            headers: { 'Cache-Control': 'no-store' }
        });
    } catch (error) {
        console.error("[Coupon API] PATCH Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
