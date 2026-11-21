/** Invoice numbers are derived from the order itself, so nothing extra is stored. */
export const invoiceNumber = (o: { id: string; paid_at: string | null; created_at: string }) =>
  `VIS ${(o.paid_at ?? o.created_at).slice(0, 10).replace(/-/g, '')} ${o.id.slice(0, 6).toUpperCase()}`;
