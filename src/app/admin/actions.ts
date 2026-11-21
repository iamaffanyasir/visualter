'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin';
import { supabaseAdmin } from '@/lib/supabase/server';

/** Admin only: mark a pending order paid (for example after a WhatsApp payment) or cancel it. */
export async function setOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !['paid', 'cancelled', 'pending'].includes(status)) return;

  await supabaseAdmin()
    .from('orders')
    .update({
      status,
      paid_at: status === 'paid' ? new Date().toISOString() : null,
      ...(status === 'paid' ? { payment_provider: 'manual' } : {}),
    })
    .eq('id', id);
  revalidatePath('/admin');
}

/** Admin only: mark an enquiry handled, or back to new. */
export async function setEnquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !['new', 'handled'].includes(status)) return;
  await supabaseAdmin().from('enquiries').update({ status }).eq('id', id);
  revalidatePath('/admin');
}
