import { RoleFormPage } from "../_components/role-form-page"

type RoleDetailPageProps = {
  params: Promise<{
    roleId: string
  }>
}

export default async function RoleDetailPage({ params }: RoleDetailPageProps) {
  const { roleId } = await params
  const mode = roleId === "create" ? "create" : "update"

  return <RoleFormPage mode={mode} roleId={roleId} />
}
