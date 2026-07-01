import { PositionFormPage } from "../_components/position-form-page"

type PositionDetailPageProps = {
  params: Promise<{
    positionId: string
  }>
}

export default async function PositionDetailPage({
  params,
}: PositionDetailPageProps) {
  const { positionId } = await params
  const mode = positionId === "create" ? "create" : "update"

  return <PositionFormPage mode={mode} positionId={positionId} />
}
