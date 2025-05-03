import FormEntry from "@/models/FormEntry";
import IFormEntry from "@/models/FormEntry";  
export async function createFormEntry(data: Partial<IFormEntry>) {
  if (!data.name || !data.email || !data.message) {
    throw new Error("Name, Email, and Message are required.");
  }
  return await FormEntry.create(data);
}

export async function getAllFormEntries() {
  return await FormEntry.find().sort({ createdAt: -1 });
}

export async function updateFormEntry(id: string, updates: Partial<IFormEntry>) {
  return await FormEntry.findByIdAndUpdate(id, updates, { new: true });
}

export async function deleteFormEntry(id: string) {
  return await FormEntry.findByIdAndDelete(id);
}
