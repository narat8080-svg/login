import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, Upload, Send, User, MessageCircle, ArrowRight, Lock, AlertCircle, Image as ImageIcon } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, clearCart, cartTotal } = useStore();
  // Steps: 1 = Info, 2 = Payment/QR, 3 = Success
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    photo: null as File | null
  });

  // Fixed Pricing Logic: No tax, exact total
  const totalAmount = parseFloat(cartTotal.toFixed(2));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.username) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.photo) {
      alert("Please upload the payment receipt to proceed.");
      return;
    }

    setIsLoading(true);

    const botToken = '8513297091:AAEPNfSiYdW55I_sEwrRo-K097Xo5T25dhk';
    const chatId = '7322712989';
    
    // Dynamic Transaction Reference with new brand prefix PS (Purat Site)
    const orderId = `PS-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    const timestamp = new Date().toLocaleString();

    // Construct the professional message caption for Telegram
    let caption = `🛒 *NEW ORDER NOTIFICATION (Purat Site)*\n`;
    caption += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    caption += `🏷️ *Store:* Purat Site\n\n`;

    caption += `👤 *Customer:* ${formData.name}\n`;
    caption += `📱 *Telegram:* ${formData.username}\n`;
    caption += `🆔 *Order ID:* ${orderId}\n\n`;

    caption += `📦 *Order Details*\n`;
    cart.forEach(item => {
      caption += `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    caption += `\n`;

    caption += `💰 *Total Amount:* $${totalAmount.toFixed(2)}\n`;
    caption += `💳 *Method:* Bakong KHQR (Manual)\n`;
    caption += `💎 *Status:* Pending Verification\n`;
    caption += `⏰ *Time:* ${timestamp}\n\n`;

    caption += `📸 *Payment Receipt Attached Below*`;

    try {
      const data = new FormData();
      data.append('chat_id', chatId);
      data.append('parse_mode', 'Markdown');
      data.append('caption', caption);
      data.append('photo', formData.photo);
      
      await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: data
      });
      
      clearCart();
      setStep(3);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      alert('Failed to send order. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        <h2 className="text-4xl font-bold dark:text-white mb-4">Payment Submitted!</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md">
          Your receipt has been sent for verification. We will process your order and contact you via Telegram shortly.
        </p>
        <Link to="/">
          <Button size="lg">Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      
      {/* Progress Indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
          <div className={`w-16 h-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Step 1: User Info */}
        <div className={step === 1 ? 'block' : 'hidden lg:block lg:opacity-50 lg:pointer-events-none'}>
          <h2 className="text-3xl font-bold dark:text-white mb-2">Contact Details</h2>
          <p className="text-slate-500 mb-8">Enter your information to proceed to payment.</p>
          
          <form onSubmit={handleInfoSubmit} className="space-y-6">
            <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-1">Full Name</label>
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                   <User size={20} />
                 </div>
                 <input 
                   required 
                   type="text" 
                   placeholder="Enter your name" 
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   readOnly={step !== 1}
                   className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none transition-all dark:text-white shadow-sm" 
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-1">Telegram Username</label>
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                   <MessageCircle size={20} />
                 </div>
                 <input 
                   required 
                   type="text" 
                   placeholder="@username" 
                   value={formData.username}
                   onChange={e => setFormData({...formData, username: e.target.value})}
                   readOnly={step !== 1}
                   className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none transition-all dark:text-white shadow-sm" 
                 />
               </div>
            </div>

            {step === 1 && (
              <Button type="submit" size="lg" className="w-full mt-4">
                <div className="flex items-center">
                   Generate Payment QR <ArrowRight size={20} className="ml-2" />
                </div>
              </Button>
            )}
          </form>
        </div>

        {/* Step 2: Payment & Upload */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
               <h2 className="text-3xl font-bold dark:text-white">Scan to Pay</h2>
               <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                 KHQR
               </div>
            </div>
            <p className="text-slate-500 mb-8">Scan using Bakong or any supported banking app.</p>

            {/* KHQR Card Recreated in CSS */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-full max-w-[320px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-white/10 transform transition-transform hover:scale-[1.02] duration-300">
                  
                  {/* Red Header */}
                  <div className="bg-[#E60000] h-20 flex items-center justify-center relative">
                      <h3 className="text-white text-3xl font-bold tracking-wider">KHQR</h3>
                  </div>

                  <div className="p-8 bg-white">
                      {/* Merchant Name */}
                      <div className="mb-2">
                          <p className="text-slate-900 font-bold text-lg uppercase">CHHEAK NARAT</p>
                      </div>

                      {/* Amount */}
                      <div className="flex items-baseline mb-6">
                          <span className="text-4xl font-bold text-black mr-2">{totalAmount.toFixed(2)}</span>
                          <span className="text-lg font-bold text-black">USD</span>
                      </div>

                      {/* Dashed Line */}
                      <div className="w-full h-px border-t-2 border-dashed border-slate-300 mb-8"></div>

                      {/* QR Code Area - Placeholder */}
                      <div className="aspect-square w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center p-6 group cursor-default">
                         <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center mb-3">
                           <ImageIcon className="text-slate-400" size={32} />
                         </div>
                         <p className="text-slate-500 font-bold text-sm mb-1">QR Code will be added manually</p>
                         <p className="text-slate-400 text-xs">(Developer Placeholder)</p>
                      </div>
                  </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-8 flex items-start space-x-3">
               <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
               <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-bold mb-1">Receipt Required</p>
                  You must upload the payment confirmation screenshot to complete the order.
               </div>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Receipt Upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-1">Upload Receipt</label>
                <div className="relative group">
                  <input 
                    required 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" 
                    id="receipt-upload"
                  />
                  <label 
                    htmlFor="receipt-upload" 
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${formData.photo ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-slate-300 dark:border-white/20 hover:border-primary hover:bg-slate-50 dark:hover:bg-white/5'}`}
                  >
                    {formData.photo ? (
                      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <CheckCircle size={24} />
                        <span className="font-semibold truncate max-w-[200px]">{formData.photo.name}</span>
                        <span className="text-xs text-slate-500">(Click to change)</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-slate-400 group-hover:text-primary transition-colors">
                        <Upload size={32} className="mb-2" />
                        <span className="font-medium">Click to Upload Receipt</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex space-x-3">
                 <Button 
                   type="button" 
                   variant="ghost" 
                   onClick={() => setStep(1)}
                   className="flex-1"
                 >
                   Back
                 </Button>
                 <Button 
                   type="submit" 
                   size="lg" 
                   className="flex-[2]" 
                   isLoading={isLoading}
                 >
                   <div className="flex items-center">
                      <Send size={20} className="mr-2" />
                      Verify & Submit
                   </div>
                 </Button>
              </div>
            </form>
          </div>
        )}

        {/* Order Summary (Visible in both steps) */}
        <div className="hidden lg:block h-fit">
           <div className="bg-white dark:bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-slate-100 dark:border-white/10 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold dark:text-white">Order Summary</h3>
                 <span className="text-sm text-slate-500">{cart.length} Items</span>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-sm dark:text-white line-clamp-1">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/10 space-y-3">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-sm">
                   <span>Shipping</span>
                   <span>Free</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold dark:text-white">Total</span>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};