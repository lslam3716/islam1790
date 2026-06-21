/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, Landmark, ThumbsUp, ThumbsDown, Check, X, RefreshCw, Plus, Minus, Search, Database } from 'lucide-react';
import { User, Transaction } from '../types';

interface AdminPanelProps {
  users: User[];
  transactions: Transaction[];
  onApproveTransaction: (txId: string) => void;
  onRejectTransaction: (txId: string) => void;
  onUpdateUserBalance: (userId: string, amountBDT: number, type: 'add' | 'subtract') => void;
}

export default function AdminPanel({
  users,
  transactions,
  onApproveTransaction,
  onRejectTransaction,
  onUpdateUserBalance,
}: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [balanceAmount, setBalanceAmount] = useState<number>(500);

  // Filter pending deposits/withdrawals
  const pendingTxList = transactions.filter((t) => t.status === 'pending');
  const pastTxList = transactions.filter((t) => t.status !== 'pending');

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Admin header with inside dashboard green theme color (সবুজ ড্যাসবোর্ড কালার) */}
      <section className="bg-emerald-950/60 border border-emerald-500/40 p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <span className="bg-red-950 border border-red-500/30 text-red-500 text-[10px] uppercase font-bold px-3 py-1 rounded-full inline-flex items-center space-x-1 animate-pulse">
              <span>● মেইন এডমিন মোড সক্রিয়</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">AS সিস্টেম এডমিন কন্ট্রোল সেন্টার</h2>
            <p className="text-stone-300 text-xs md:text-sm">
              এখান থেকে সকল সদস্যদের প্রোফাইল ব্যালেন্স পরিবর্তন, ডিপোজিট এবং টাকা উত্তোলনের পেন্ডিং রিকোয়েস্টসমূহ অনুমোদন বা বাতিল করতে পারবেন।
            </p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl flex items-center space-x-4">
            <Database className="w-10 h-10 text-emerald-400" />
            <div>
              <p className="text-xs text-stone-400">পেন্ডিং আর্থিক আবেদন</p>
              <h3 className="text-lg font-black text-white mt-0.5">{pendingTxList.length} টি বাকি আছে</h3>
              <p className="text-[9px] text-emerald-500">তাত্ক্ষণিক অ্যাকশন গেটওয়ে</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of basic admin actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left pane: approve transactions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-stone-200 border-b border-stone-800 pb-3 flex items-center space-x-2">
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>পেন্ডিং অনুমোদন আবেদন তালিকা ({pendingTxList.length})</span>
            </h3>

            {pendingTxList.length === 0 ? (
              <div className="text-center py-12 text-stone-500 space-y-2">
                <ShieldCheck className="w-8 h-8 text-stone-600 mx-auto" />
                <p className="text-xs">অনুমোদনের জন্য কোনো পেন্ডিং আবেদন নেই!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {pendingTxList.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-stone-950 p-4 border border-stone-800 rounded-xl space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tx.type === 'deposit' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                        }`}>
                          {tx.type === 'deposit' ? 'ডিপোজিট আবেদন' : 'উত্তোলন আবেদন'}
                        </span>
                        <h4 className="text-xs font-bold text-stone-200 pt-1">
                          ইউজার: {tx.username} <span className="text-[10px] font-mono text-stone-500">({tx.userEmail})</span>
                        </h4>
                        <p className="text-xs text-stone-400 font-mono">মোবাইল নাম্বারও: {tx.number}</p>
                        {tx.transactionId && (
                          <p className="text-xs text-stone-400 font-mono">TxID: <span className="text-blue-400 font-bold">{tx.transactionId}</span></p>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black text-emerald-400 block">{tx.amountBDT} BDT</span>
                        <p className="text-[9px] text-stone-500 font-mono">{new Date(tx.createdAt).toLocaleTimeString('bn-BD')}</p>
                      </div>
                    </div>

                    {/* Red buttons for decline and green buttons for approve applied exactly per prompt */}
                    <div className="pt-2 border-t border-stone-900 flex justify-end space-x-2">
                      <button
                        onClick={() => onRejectTransaction(tx.id)}
                        className="bg-red-650 hover:bg-red-700 active:bg-red-800 text-white font-bold text-[10px] py-1.5 px-3 rounded-lg flex items-center space-x-1 shadow"
                        id={`reject-${tx.id}`}
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>আবেদন বাতিল</span>
                      </button>
                      
                      <button
                        onClick={() => onApproveTransaction(tx.id)}
                        className="bg-stone-800 hover:bg-emerald-900 hover:border-emerald-500 border border-stone-700 text-white font-bold text-[10px] py-1.5 px-3 rounded-lg flex items-center space-x-1"
                        id={`approve-${tx.id}`}
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>আবেদন অনুমোদন</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-stone-900/90 border border-stone-800 p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-stone-200 border-b border-stone-800 pb-3">ইতিহাস (অতীতের সফল ট্রানজেকশন)</h3>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 text-xs">
              {pastTxList.length === 0 ? (
                <p className="text-stone-500 py-4 text-center">কোনো পূর্ববর্তী রেকর্ড নেই।</p>
              ) : (
                pastTxList.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-stone-950 p-2.5 rounded-lg flex justify-between items-center border border-stone-800/80"
                  >
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold">{tx.username}</span>
                      <span className="mx-1.5 text-stone-600">|</span>
                      <span className={`text-[10px] uppercase font-bold ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {tx.type === 'deposit' ? 'ডিপোজিট' : 'উত্তোলন'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-[10px]">
                      <span className="font-bold text-stone-300">{tx.amountBDT} BDT ({tx.method})</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                        tx.status === 'approved' ? 'bg-emerald-950 border border-emerald-500/20 text-emerald-400' : 'bg-red-950 border border-red-500/20 text-red-400'
                      }`}>
                        {tx.status === 'approved' ? 'অনুমোদিত' : 'বাতিলকৃত'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right pane: admin direct balance modification & overview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-stone-200 border-b border-stone-800 pb-3 flex items-center space-x-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>সহজ ইউজার ব্যালেন্স কন্ট্রোলার</span>
            </h3>

            {/* Custom live search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ইউজার বা ইমেইল সার্চ করুন..."
                className="w-full bg-stone-850 border border-stone-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white"
              />
            </div>

            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
              {filteredUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border flex items-center justify-between ${
                    selectedUser?.id === u.id
                      ? 'border-emerald-400 bg-emerald-950/20 text-white'
                      : 'border-stone-800 bg-stone-950 text-stone-300 hover:bg-stone-850'
                  }`}
                  type="button"
                >
                  <div>
                    <span className="font-bold block">{u.username}</span>
                    <span className="text-[10px] text-stone-500 font-mono">{u.email}</span>
                  </div>
                  <span className="font-bold text-emerald-400 font-mono">{u.bdtBalance} BDT</span>
                </button>
              ))}
            </div>

            {selectedUser && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-3 text-xs"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400">চলতি অ্যাকাউন্টের ব্যালেন্স:</span>
                  <span className="font-bold text-white">{selectedUser.bdtBalance} টাকা (BDT)</span>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] text-stone-400 font-semibold mb-1">টাকার পরিমাণ (BDT)</label>
                  <input
                    type="number"
                    value={balanceAmount}
                    onChange={(e) => setBalanceAmount(Number(e.target.value))}
                    className="w-full bg-stone-850 border border-stone-700 rounded-lg p-2 text-white font-mono h-[35px]"
                  />
                </div>

                {/* RED styles for balance adjustments */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => {
                      onUpdateUserBalance(selectedUser.id, balanceAmount, 'add');
                      // Update active state locally instantly to prevent latency look
                      setSelectedUser({
                        ...selectedUser,
                        bdtBalance: selectedUser.bdtBalance + balanceAmount
                      });
                    }}
                    className="bg-red-650 hover:bg-red-700 text-white font-black py-2 rounded-lg flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ব্যালেন্স যোগ করুন</span>
                  </button>

                  <button
                    onClick={() => {
                      onUpdateUserBalance(selectedUser.id, balanceAmount, 'subtract');
                      setSelectedUser({
                        ...selectedUser,
                        bdtBalance: Math.max(0, selectedUser.bdtBalance - balanceAmount)
                      });
                    }}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-black py-2 rounded-lg flex items-center justify-center space-x-1 border border-stone-700"
                  >
                    <Minus className="w-3.5 h-3.5" />
                    <span>ব্যালেন্স হ্রাস করুন</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
