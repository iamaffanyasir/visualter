'use client';

import { useEffect } from 'react';

/** Waits for fonts and images so the PDF always includes the full design. */
async function ready() {
  await document.fonts?.ready;
  await Promise.all(
    [...document.images].map((img) => (img.complete ? null : new Promise((r) => img.addEventListener('load', r, { once: true })))),
  );
}

async function printInvoice() {
  await ready();
  window.print();
}

/** Download button for the invoice. With ?download=1 in the address it starts the download right away. */
export function InvoiceActions() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('download') === '1') {
      window.history.replaceState(null, '', window.location.pathname);
      printInvoice();
    }
  }, []);

  return (
    <div className="invoice-toolbar__actions">
      <button className="btn btn--primary" onClick={printInvoice}>
        Download PDF
      </button>
    </div>
  );
}
