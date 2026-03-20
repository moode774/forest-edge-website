import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Printer, ArrowLeft, CheckCircle2, Clock, Truck, MapPin, AlertCircle } from 'lucide-react';

const statusConfig = {
  confirmed: { icon: CheckCircle2, color: '#3B82F6', bg: '#EFF6FF', en: 'Order Confirmed', ar: 'تم تأكيد الطلب' },
  processing: { icon: Clock, color: '#D97706', bg: '#FFFBEB', en: 'Processing', ar: 'قيد التجهيز' },
  shipped: { icon: Truck, color: '#7C3AED', bg: '#F5F3FF', en: 'Shipped', ar: 'تم الشحن' },
  delivered: { icon: MapPin, color: '#059669', bg: '#ECFDF5', en: 'Delivered', ar: 'تم التوصيل' },
};

export const Invoice: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    const unsub = onSnapshot(doc(db, 'orders', orderId), snap => {
      if (snap.exists()) {
        setOrder({ id: snap.id, ...snap.data() });
      } else {
        setError(true);
      }
      setLoading(false);
    }, () => {
      setError(true);
      setLoading(false);
    });
    return () => unsub();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F2EE] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F5F2EE] flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h2 className="font-serif text-[#282828] text-2xl">Invoice not found</h2>
        <p className="text-[#737373] text-sm f-sans">Order #{orderId} could not be found.</p>
        <Link to="/orders" className="flex items-center gap-2 text-[#8A7A6B] text-sm font-bold f-sans hover:text-[#282828] transition-colors">
          <ArrowLeft size={15} /> Back to Orders
        </Link>
      </div>
    );
  }

  const statusKey = (order.status || 'confirmed') as keyof typeof statusConfig;
  const status = statusConfig[statusKey] || statusConfig.confirmed;
  const StatusIcon = status.icon;

  const date = new Date(order.date);
  const dateEnStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const dateArStr = date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });

  const vat = Math.round(order.total * 15 / 115);
  const subtotalExVat = order.total - vat;

  const paymentEn = order.paymentMethod === 'cash' ? 'Cash on Delivery'
    : order.paymentMethod === 'card' ? 'Credit Card'
    : 'Bank Transfer';
  const paymentAr = order.paymentMethod === 'cash' ? 'الدفع عند الاستلام'
    : order.paymentMethod === 'card' ? 'بطاقة ائتمان'
    : 'تحويل بنكي';

  const paymentStatusEn = order.paymentMethod === 'cash'
    ? (order.status === 'delivered' ? 'PAID — Collected on Delivery' : 'PENDING — Collected on Delivery')
    : 'PAID — Pre-paid';
  const paymentStatusAr = order.paymentMethod === 'cash'
    ? (order.status === 'delivered' ? 'مدفوع — تم التحصيل عند التسليم' : 'معلق — يُحصَّل عند التسليم')
    : 'مدفوع — تم الدفع مسبقاً';

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; }
          .invoice-doc { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; }
        }
        @page { margin: 0; size: A4; }
      `}</style>

      {/* Action Bar — hidden on print */}
      <div className="no-print sticky top-0 z-50 bg-[#1C1C1A] py-4 px-6 flex items-center justify-between">
        <Link to="/orders" className="flex items-center gap-2 text-white/60 hover:text-white text-sm f-sans transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Orders</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs f-sans hidden md:block">Invoice #{order.id}</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-[#8A7A6B] text-white px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B]/80 transition-all f-sans"
          >
            <Printer size={14} />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Page wrapper */}
      <div className="bg-[#F5F2EE] min-h-screen py-10 px-4 no-print-wrapper">
        <div className="invoice-doc max-w-[794px] mx-auto bg-white shadow-2xl">

          {/* ─── Header ─── */}
          <div style={{ backgroundColor: '#282828' }} className="px-10 py-8 flex items-center justify-between">
            <div>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] f-sans mb-1">Forest Edge</p>
              <h1 className="text-white font-serif text-3xl tracking-widest">
                FOREST<span className="italic font-light" style={{ color: '#DCC7A1' }}>Edge</span>
              </h1>
              <p className="text-white/40 text-xs f-sans mt-1">شركة فورست إيدج للأثاث الفاخر</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold f-sans text-2xl tracking-wider mb-1">INVOICE</p>
              <p className="text-white/50 text-sm f-sans font-bold">فاتورة ضريبية</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: status.bg }}>
                <StatusIcon size={12} style={{ color: status.color }} />
                <span className="text-xs font-bold f-sans" style={{ color: status.color }}>
                  {status.en} · {status.ar}
                </span>
              </div>
            </div>
          </div>

          {/* ─── Invoice meta ─── */}
          <div className="px-10 py-6 grid grid-cols-3 gap-6 border-b border-[#282828]/8" style={{ backgroundColor: '#FDFCFB' }}>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-1 f-sans">Invoice No.</p>
              <p className="font-bold text-[#282828] f-sans text-base">{order.id}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-1 f-sans">Date · التاريخ</p>
              <p className="text-[#282828] f-sans text-sm font-medium">{dateEnStr}</p>
              <p className="text-[#737373] f-sans text-xs mt-0.5">{dateArStr}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-1 f-sans">Payment · الدفع</p>
              <p className="text-[#282828] f-sans text-sm font-bold">{paymentEn}</p>
              <p className="text-[#737373] f-sans text-xs">{paymentAr}</p>
            </div>
          </div>

          {/* ─── Bill To ─── */}
          <div className="px-10 py-6 grid grid-cols-2 gap-8 border-b border-[#282828]/8">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-3 f-sans">Bill To · فاتورة إلى</p>
              <p className="font-bold text-[#282828] f-sans text-base">{order.customer?.name}</p>
              <p className="text-[#737373] f-sans text-sm mt-1">{order.customer?.phone}</p>
              {order.customer?.email && (
                <p className="text-[#737373] f-sans text-sm">{order.customer.email}</p>
              )}
              <p className="text-[#737373] f-sans text-sm mt-1">
                {order.customer?.address}, {order.customer?.city}
              </p>
              <p className="text-[#737373] f-sans text-sm">المملكة العربية السعودية · Saudi Arabia</p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-3 f-sans">Issued By · صادر من</p>
              <p className="font-bold text-[#282828] f-sans text-base">Forest Edge Co.</p>
              <p className="text-[#737373] f-sans text-sm mt-1">شركة فورست إيدج للأثاث الفاخر</p>
              <p className="text-[#737373] f-sans text-sm mt-1">الرياض، المملكة العربية السعودية</p>
              <p className="text-[#737373] f-sans text-sm">Riyadh, Saudi Arabia</p>
            </div>
          </div>

          {/* ─── Items Table ─── */}
          <div className="px-10 py-6">
            <table className="w-full text-sm f-sans">
              <thead>
                <tr style={{ backgroundColor: '#282828', color: 'white' }}>
                  <th className="text-left text-[10px] font-bold uppercase tracking-[0.15em] py-3 px-4 rounded-tl-lg">
                    Item · المنتج
                  </th>
                  <th className="text-center text-[10px] font-bold uppercase tracking-[0.15em] py-3 px-3">
                    Qty
                  </th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-[0.15em] py-3 px-3">
                    Unit Price
                  </th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-[0.15em] py-3 px-4 rounded-tr-lg">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((item: any, i: number) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FDFCFB]'}>
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#282828] f-sans">
                        {item.product?.name?.en || item.product?.name}
                      </p>
                      {item.product?.name?.ar && (
                        <p className="text-[#737373] text-xs mt-0.5" dir="rtl">
                          {item.product.name.ar}
                        </p>
                      )}
                      <p className="text-[10px] text-[#8A7A6B] uppercase tracking-widest mt-0.5">
                        {item.product?.category}
                      </p>
                    </td>
                    <td className="py-4 px-3 text-center text-[#282828] font-bold">{item.quantity}</td>
                    <td className="py-4 px-3 text-right text-[#282828]">
                      {(item.product?.price || 0).toLocaleString()} SAR
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-[#282828]">
                      {((item.product?.price || 0) * item.quantity).toLocaleString()} SAR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ─── Totals ─── */}
          <div className="px-10 pb-8 flex justify-end">
            <div className="w-72">
              <div className="flex justify-between py-2 text-sm f-sans text-[#737373]">
                <span>Subtotal (excl. VAT)</span>
                <span>{subtotalExVat.toLocaleString()} SAR</span>
              </div>
              <div className="flex justify-between py-2 text-sm f-sans text-[#737373]">
                <span>Delivery · التوصيل</span>
                <span className={order.delivery === 0 ? 'text-[#8A7A6B] font-bold' : ''}>
                  {order.delivery === 0 ? 'Free · مجاني' : `${order.delivery} SAR`}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm f-sans text-[#737373]">
                <span>VAT 15% · ض.ق.م</span>
                <span>{vat.toLocaleString()} SAR</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-[#282828] mt-2 text-base font-bold f-sans text-[#282828]">
                <span>TOTAL · الإجمالي</span>
                <span className="font-serif text-xl">{(order.total || 0).toLocaleString()} SAR</span>
              </div>
              <p className="text-[9px] text-[#737373] f-sans mt-1 text-right">
                الأسعار تشمل ضريبة القيمة المضافة · Prices include VAT
              </p>
            </div>
          </div>

          {/* ─── Payment Status Banner ─── */}
          <div className="mx-10 mb-8 rounded-2xl overflow-hidden border-2" style={{ borderColor: status.color }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: status.bg }}>
              <div className="flex items-center gap-3">
                <StatusIcon size={20} style={{ color: status.color }} />
                <div>
                  <p className="font-bold f-sans text-sm" style={{ color: status.color }}>
                    {paymentStatusEn}
                  </p>
                  <p className="text-xs f-sans mt-0.5 text-[#737373]">{paymentStatusAr}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest f-sans text-[#737373]">Method · الطريقة</p>
                <p className="font-bold f-sans text-sm text-[#282828]">{paymentEn} · {paymentAr}</p>
              </div>
            </div>
          </div>

          {/* ─── Footer ─── */}
          <div className="px-10 py-8 border-t border-[#282828]/8 text-center" style={{ backgroundColor: '#FDFCFB' }}>
            <p className="font-serif text-[#282828] text-lg mb-1">شكراً لاختياركم فورست إيدج</p>
            <p className="text-[#8A7A6B] f-sans text-sm">Thank you for choosing Forest Edge</p>
            <div className="flex items-center justify-center gap-6 mt-4">
              <p className="text-[#737373] text-xs f-sans">www.forestedge.sa</p>
              <p className="text-[#737373] text-xs f-sans">·</p>
              <p className="text-[#737373] text-xs f-sans">الرياض · المملكة العربية السعودية</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Invoice;
