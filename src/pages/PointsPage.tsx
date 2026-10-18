import React, { useState } from 'react';
import { useUserStore } from '../store/useUserStore';

export const PointsPage: React.FC = () => {
  const { points, addPoints, transactions } = useUserStore();
  const [selectedPkg, setSelectedPkg] = useState<{ pts: number; price: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [historyTab, setHistoryTab] = useState<'all' | 'topup' | 'purchase'>('all');

  const topUpPackages = [
    { pts: 100, price: 35 },
    { pts: 300, price: 99 },
    { pts: 500, price: 150 },
    { pts: 1000, price: 280 },
  ];

  const handleConfirmPayment = () => {
    if (!selectedPkg) return;
    setIsProcessing(true);

    setTimeout(() => {
      addPoints(selectedPkg.pts, `เติมแพ็กเกจ ${selectedPkg.pts} แต้ม (${selectedPkg.price} บาท)`);
      setIsProcessing(false);
      setMessage(`สแกนชำระเงินสำเร็จ! ได้รับ ${selectedPkg.pts} แต้มเรียบร้อยแล้ว`);
      setSelectedPkg(null);

      setTimeout(() => setMessage(null), 3000);
    }, 2000);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (historyTab === 'topup') return tx.type === 'topup';
    if (historyTab === 'purchase') return tx.type === 'purchase';
    return true;
  });

  return (
    <div className="container mx-auto px-6 py-8 max-w-3xl space-y-6">
      {/* แจ้งเตือนสถานะการทำรายการ */}
      {message && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-sm font-medium shadow-sm transition-all">
          {message}
        </div>
      )}

      {/* แสดงแต้มสะสมปัจจุบัน */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm text-center">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">แต้มสะสมของคุณ</h2>
        <div className="text-4xl font-extrabold text-blue-900 mt-2">{points} แต้ม</div>
      </div>

      {/* รับโบนัสฟรีประจำวัน */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[11px] font-bold tracking-widest uppercase text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800">
            สิทธิพิเศษประจำวัน
          </span>
          <h3 className="font-bold text-lg text-white">รับโบนัสแต้มสะสมฟรี</h3>
          <p className="text-xs text-blue-200">เข้าใช้งานประจำวัน รับฟรี 40 แต้มทันทีวันละ 1 ครั้ง</p>
        </div>

        <button
          onClick={() => {
            addPoints(40, 'รับโบนัสฟรีประจำวัน');
            setMessage('ได้รับโบนัสฟรี 40 แต้มเรียบร้อยแล้ว');
            setTimeout(() => setMessage(null), 2500);
          }}
          className="bg-white hover:bg-blue-50 text-blue-900 text-xs font-bold px-6 py-3 rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          กดรับฟรี 40 แต้ม
        </button>
      </div>

      {/* แพ็กเกจเติมแต้ม */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-900">เลือกแพ็กเกจเติมแต้ม</h3>
          <p className="text-xs text-slate-500 mt-0.5">เลือกแพ็กเกจที่ต้องการแล้วสแกนชำระเงินผ่าน QR Code</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-1">
          {topUpPackages.map((pkg) => (
            <button
              key={pkg.pts}
              onClick={() => setSelectedPkg(pkg)}
              className="border border-slate-200 hover:border-blue-700 hover:bg-blue-50/50 p-5 rounded-xl text-center space-y-1 transition-all group shadow-2xs hover:shadow-sm"
            >
              <div className="text-2xl font-bold text-slate-900 group-hover:text-blue-900">{pkg.pts} แต้ม</div>
              <div className="text-xs font-semibold text-slate-500 bg-slate-100 group-hover:bg-blue-100/60 group-hover:text-blue-900 py-1 px-3 rounded-md inline-block">
                {pkg.price} บาท
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ประวัติการทำรายการ */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900">ประวัติการใช้งานแต้ม</h3>
            <p className="text-xs text-slate-500 mt-0.5">รายการรับแต้มและแลกซื้อหนังสือย้อนหลัง</p>
          </div>

          <div className="flex space-x-1 text-xs self-start sm:self-auto">
            <button
              onClick={() => setHistoryTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                historyTab === 'all' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setHistoryTab('topup')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                historyTab === 'topup' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              เติมแต้ม
            </button>
            <button
              onClick={() => setHistoryTab('purchase')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                historyTab === 'purchase' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ใช้แต้ม
            </button>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-center py-8 text-sm text-slate-400">ไม่มีรายการประวัติ</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-3.5 border border-slate-100 rounded-lg text-sm bg-slate-50/80 hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-800">{tx.title}</div>
                  <div className="text-xs text-slate-400">{tx.date}</div>
                </div>
                <div className={`font-bold text-sm ${tx.amount > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount} แต้ม
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal ป็อปอัปชำระเงิน */}
      {selectedPkg && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 max-w-sm w-full text-center space-y-4 shadow-xl">
            <div>
              <h3 className="font-bold text-lg text-slate-900">สแกนชำระเงิน</h3>
              <p className="text-xs text-slate-500 mt-1">
                แพ็กเกจ {selectedPkg.pts} แต้ม (ยอดชำระ {selectedPkg.price} บาท)
              </p>
            </div>

            <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=PROMPTPAY_${selectedPkg.price}_THB`}
                alt="PromptPay QR Code"
                className="w-40 h-40 mx-auto rounded-lg"
              />
              <p className="text-xs text-slate-500 mt-2 font-semibold">ระบบพร้อมเพย์จำลอง</p>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedPkg(null)}
                disabled={isProcessing}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors disabled:bg-slate-400"
              >
                {isProcessing ? 'กำลังตรวจสอบ...' : 'ยืนยันการชำระเงิน'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};