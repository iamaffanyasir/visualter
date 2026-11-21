import type { Metadata } from 'next';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Cancellation, Refund and Delivery Policy',
  description: 'How purchases, delivery, cancellations and refunds work at Visualter.',
};

export default function RefundsPage() {
  const d = site.developer;
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="headline">Cancellation, Refund and Delivery Policy</h1>
          <p className="lede">Last updated 21 November 2026</p>
        </div>
      </section>
      <article className="prose">
        <h2>What we sell</h2>
        <p>
          Visualter sells digital products: Android apps and Windows software, delivered as downloads. Hardware such as AirSense
          and ZYNK Deck, and LabOS Offline, are supplied on request with a separate written quote.
        </p>

        <h2>Delivery</h2>
        <p>
          Digital products are delivered instantly. As soon as your payment is confirmed, the product appears in your account at
          visualter.com/account, ready to download. You can download it again at any time from any device by signing in. Nothing
          is shipped physically for digital products.
        </p>
        <p>
          If your download does not appear within 30 minutes of payment, write to {d.email} with your order number and we will
          deliver it the same working day.
        </p>

        <h2>Cancellations</h2>
        <p>
          An order can be cancelled any time before payment. Because digital products are delivered immediately after payment,
          a paid order cannot be cancelled, but the refund terms below still apply.
        </p>

        <h2>Refunds</h2>
        <p>
          If a product does not install or does not work as described on its page, contact us within 7 days of purchase. We will
          first try to fix the problem with you. If we cannot, we will refund the full amount.
        </p>
        <p>
          Approved refunds are made to the original payment method within 5 to 7 working days. Payments made through Razorpay are
          refunded through Razorpay. Duplicate payments for the same product are refunded in full.
        </p>
        <p>Refunds are not offered for a change of mind after the product has been downloaded and works as described.</p>

        <h2>Contact</h2>
        <p>
          {d.name}, Visualter, New Delhi, India
          <br />
          <a href={`mailto:${d.email}`}>{d.email}</a> · <a href={d.phoneHref}>{d.phone}</a>
        </p>
      </article>
    </>
  );
}
