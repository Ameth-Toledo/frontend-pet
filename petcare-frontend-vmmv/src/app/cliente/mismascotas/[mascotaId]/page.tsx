import { ClienteMascotaDetallePage } from "@/modules/mascota-cliente-detalle/view/ClienteMascotaDetallePage";

export default async function Page({
  params,
}: {
  params: Promise<{ mascotaId: string }>;
}) {
  const { mascotaId } = await params;

  return <ClienteMascotaDetallePage mascotaId={mascotaId} />;
}