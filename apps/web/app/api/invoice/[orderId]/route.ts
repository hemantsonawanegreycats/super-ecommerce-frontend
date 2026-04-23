import { NextRequest, NextResponse } from "next/server";

// Mock invoice API - in production this would use @react-pdf/renderer or similar
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  // In production: generate real PDF using order data from DB
  const invoiceHtml = `
    <html>
      <body style="font-family: sans-serif; padding: 40px; color: #111;">
        <h1>INVOICE</h1>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <hr/>
        <h3>Super-E Platform</h3>
        <p>This is a simulated invoice. Connect a PDF generation library for production.</p>
      </body>
    </html>
  `;

  return new NextResponse(invoiceHtml, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Content-Disposition": `attachment; filename="invoice-${orderId}.html"`,
    },
  });
}
