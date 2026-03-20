import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLang } from '../../App';
import { translations } from '../../content/translations';

export const CartDrawer: React.FC = () => {
  const { lang } = useLang();
  const t = translations[lang] || {};
  const ct = t.cart || {};
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, cartCount } = useStore();

  const delivery = cartTotal >= 500 ? 0 : 150;
  const total = cartTotal + delivery;

  const isRtl = lang === 'ar';

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#1C1C1A]/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          cartOpen
            ? 'translate-x-0'
            : isRtl
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#1C1C1A]/5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#8A7A6B]" />
            <h2 className="font-serif font-light text-[#282828] text-xl">
              {ct.title}
            </h2>
            {cartCount > 0 && (
              <span className="bg-[#8A7A6B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full bg-[#1C1C1A]/5 hover:bg-[#1C1C1A]/10 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-[#282828]" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto px-6 py-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#F5F2EE] flex items-center justify-center mb-6">
                <ShoppingBag size={32} className="text-[#8A7A6B]/30" />
              </div>
              <h3 className="text-[#282828] font-serif text-xl mb-3">
                {ct.empty}
              </h3>
              <p className="text-[#737373] text-sm font-sans max-w-xs leading-relaxed">
                {ct.emptyDesc}
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-8 bg-[#282828] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-colors font-sans"
              >
                {ct.browse}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 group"
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5F2EE] border border-[#1C1C1A]/5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name[lang]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0 flex flex-col justify-between py-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-serif font-light text-[#282828] text-base leading-tight truncate">
                          {item.product.name[lang]}
                        </p>
                        <p className="text-[#8A7A6B] font-sans text-xs mt-1 uppercase tracking-widest">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#737373]/40 hover:text-red-900 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                       {/* Qty Controls */}
                      <div className="flex items-center gap-3 bg-[#FDFCFB] border border-[#1C1C1A]/10 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#1C1C1A]/5 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-[#282828] font-sans text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#1C1C1A]/5 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <p className="text-[#282828] font-sans font-bold text-sm">
                        {(item.product.price * item.quantity).toLocaleString()} SAR
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#1C1C1A]/5 px-6 py-8 bg-white space-y-6">
            {/* Delivery Notice */}
            {cartTotal < 500 && (
              <div className="bg-[#F5F2EE] px-4 py-3 text-[10px] text-[#8A7A6B] uppercase tracking-widest font-sans rounded-lg">
                {ct.freeNotice?.replace('{amount}', (500 - cartTotal).toLocaleString())}
              </div>
            )}
            {cartTotal >= 500 && (
              <div className="bg-[#8A7A6B]/10 px-4 py-3 text-[10px] text-[#8A7A6B] uppercase tracking-widest font-bold font-sans rounded-lg">
                {ct.freeIncluded}
              </div>
            )}

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between text-[#737373] text-[11px] font-sans uppercase tracking-widest">
                <span>{ct.subtotal}</span>
                <span>{cartTotal.toLocaleString()} SAR</span>
              </div>
              <div className="flex justify-between text-[#737373] text-[11px] font-sans uppercase tracking-widest">
                <span>{ct.delivery}</span>
                <span className={delivery === 0 ? 'text-[#8A7A6B] font-bold' : ''}>
                  {delivery === 0 ? ct.free : `${delivery} SAR`}
                </span>
              </div>
              <div className="flex justify-between font-serif text-[#282828] text-xl pt-4 border-t border-[#1C1C1A]/5">
                <span>{ct.total}</span>
                <span className="font-bold">{(cartTotal + delivery).toLocaleString()} SAR</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full bg-[#282828] text-white py-5 rounded-full font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2 hover:bg-[#8A7A6B] transition-all duration-300 shadow-xl"
            >
              {ct.checkout}
              <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
            </Link>

            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-[#737373]/60 text-[10px] uppercase tracking-widest py-2 hover:text-[#282828] transition-colors font-sans"
            >
              {ct.continue}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
