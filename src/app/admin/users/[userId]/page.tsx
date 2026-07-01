import { UserFormPage } from "../_components/user-form-page"

type UserDetailPageProps = {
  params: Promise<{
    userId: string
  }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { userId } = await params
  const mode = userId === "create" ? "create" : "update"

  return <UserFormPage mode={mode} userId={userId} />
}
