-- Visualter: link orders to Razorpay. Run once in the Supabase SQL editor after 0001.
alter table public.orders add column if not exists razorpay_order_id text;
create unique index if not exists orders_razorpay_order_idx on public.orders (razorpay_order_id) where razorpay_order_id is not null;
