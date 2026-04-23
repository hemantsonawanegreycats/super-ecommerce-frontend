import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface InvoiceData {
  orderId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  billingAddress?: string;
  items: {
    title: string;
    quantity: number;
    price: number;
    gstRate: number; // e.g. 18
  }[];
  subtotal: number;
  totalGst: number;
  total: number;
}

export const generateInvoicePDF = (data: InvoiceData) => {
  const doc = new jsPDF();
  
  // Brand Header
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("SUPER-E", 20, 20);
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("LUXURY COMMERCE ENGINE", 20, 26);
  
  doc.setFontSize(16);
  doc.setFont("helvetica", "bolditalic");
  doc.text("TAX INVOICE", 150, 25);

  // Invoice Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO:", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.text(data.customerName, 20, 60);
  doc.text(data.customerEmail, 20, 65);
  doc.text(data.shippingAddress, 20, 70, { maxWidth: 60 });

  doc.setFont("helvetica", "bold");
  doc.text("ORDER INFO:", 130, 55);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice ID: ${data.orderId}`, 130, 60);
  doc.text(`Date: ${data.date}`, 130, 65);
  doc.text(`Payment: Visa •••• 4242`, 130, 70);

  // Table
  const tableData = data.items.map((item) => [
    item.title,
    item.quantity.toString(),
    `$${item.price.toFixed(2)}`,
    `${item.gstRate}%`,
    `$${((item.price * item.quantity * item.gstRate) / 100).toFixed(2)}`,
    `$${(item.price * item.quantity).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 85,
    head: [["Product Description", "Qty", "Price", "GST %", "GST Amt", "Total"]],
    body: tableData,
    theme: "striped",
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: "bold" },
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "center" },
      4: { halign: "right" },
      5: { halign: "right" },
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Summary
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", 140, finalY);
  doc.setFont("helvetica", "normal");
  doc.text(`$${data.subtotal.toFixed(2)}`, 180, finalY, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.text("Integrated GST:", 140, finalY + 5);
  doc.setFont("helvetica", "normal");
  doc.text(`$${data.totalGst.toFixed(2)}`, 180, finalY + 5, { align: "right" });

  doc.setFillColor(0, 0, 0);
  doc.rect(130, finalY + 10, 65, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("GRAND TOTAL:", 135, finalY + 18);
  doc.text(`$${data.total.toFixed(2)}`, 190, finalY + 18, { align: "right" });

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("This is a computer-generated document. No signature required.", 105, 280, { align: "center" });
  doc.text("Thank you for choosing Super-E Luxury Commerce.", 105, 285, { align: "center" });

  doc.save(`Invoice_${data.orderId}.pdf`);
};
