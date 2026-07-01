import { DepartmentFormPage } from "../_components/department-form-page"

type DepartmentDetailPageProps = {
  params: Promise<{
    departmentId: string
  }>
}

export default async function DepartmentDetailPage({
  params,
}: DepartmentDetailPageProps) {
  const { departmentId } = await params
  const mode = departmentId === "create" ? "create" : "update"

  return <DepartmentFormPage departmentId={departmentId} mode={mode} />
}
