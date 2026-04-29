import { notFound } from "next/navigation";
import { FranchiseDetailView } from "@/components/FranchiseDetailView";
import { FRANCHISE_LIST } from "@/lib/data";

export default async function FranchiseDetailPage({ params }: { params: Promise<{ rowId: string }> }) {
  const { rowId } = await params;
  const n = parseInt(rowId, 10);
  if (Number.isNaN(n) || n < 0 || n >= FRANCHISE_LIST.length) notFound();
  return <FranchiseDetailView key={n} listRowId={n} />;
}
