import { LeaveTypeFormPage } from "../_components/leave-type-form-page"

type LeaveTypeDetailPageProps = {
  params: Promise<{
    typeId: string
  }>
}

export default async function LeaveTypeDetailPage({
  params,
}: LeaveTypeDetailPageProps) {
  const { typeId } = await params
  const mode = typeId === "create" ? "create" : "update"

  return <LeaveTypeFormPage mode={mode} typeId={typeId} />
}
