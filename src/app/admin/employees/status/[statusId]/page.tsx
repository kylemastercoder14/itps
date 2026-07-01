import { EmploymentStatusFormPage } from "../_components/employment-status-form-page"

type EmploymentStatusDetailPageProps = {
  params: Promise<{
    statusId: string
  }>
}

export default async function EmploymentStatusDetailPage({
  params,
}: EmploymentStatusDetailPageProps) {
  const { statusId } = await params
  const mode = statusId === "create" ? "create" : "update"

  return <EmploymentStatusFormPage mode={mode} statusId={statusId} />
}
