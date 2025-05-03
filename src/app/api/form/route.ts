import { connectDB } from "../../../lib/db";
import {
  createFormEntry,
  getAllFormEntries,
  updateFormEntry,
  deleteFormEntry,
} from "@/controllers/formController";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newEntry = await createFormEntry(body);
    return Response.json({ success: true, data: newEntry }, { status: 201 });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const entries = await getAllFormEntries();
    return Response.json({ success: true, data: entries }, { status: 200 });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, updates } = await req.json();
    const updated = await updateFormEntry(id, updates);
    return Response.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    await deleteFormEntry(id);
    return Response.json({ success: true, message: "Deleted" }, { status: 200 });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 400 });
  }
}
