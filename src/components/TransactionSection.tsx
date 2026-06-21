/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, ArrowRight, Wallet, History, AlertCircle, Copy, CheckCircle2, RefreshCw } from 'lucide-react';
import { User, Transaction } from '../types';

interface TransactionSectionProps {
  user: User | null;
  onOpenAuth: () => void;
  transactions: Transaction[];
  onAddTransaction: (tx: Omit<Transaction, 'id' | 'createdAt' | 'status'>) => void;
}

export default function TransactionSection({ user, onOpenAuth, transactions, onAddTransaction }: TransactionSectionProps) {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  
  // Deposit fields
  const [depositAmount, setDepositAmount] = useState<number>(500);
  const [depositMethod, setDepositMethod] = useState<'bkash' | 'rocket'>('bkash');
  const [depositSender, setDepositSender] = useState('');
  const [depositTxId, setDepositTxId] = useState('');

  // Withdraw fields
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [withdrawMethod, setWithdrawMethod] = useState<'bkash' | 'rocket'>('bkash');
  const [withdrawReceiver, setWithdrawReceiver] = useState('');

  // Alert box
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);

  if (!user) {
    return (
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 md:p-12 text-center max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-950/40 text-red-400 flex items-center justify-center mx-auto">
          <Wallet className="w-8 h-8 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">ডিপোজিট ও উত্তোলন করতে লগইন করুন</h3>
          <p className="text-stone-400 text-xs">
            আপনাকে অবশ্যই আপনার অ্যাকাউন্টে লগইন থাকতে হবে। আমাদের গেটওয়েতে ডিপোজিট করে মেম্বারশিপ প্যাকেজ সক্রিয় করুন।
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="bg-red-650 hover:bg-red-700 active:bg-red-800 text-white font-black text-sm px-6 py-2.5 rounded-lg shadow-lg"
          id="tx-request-login"
        >
          লগইন / সাইন আপ করুন
        </button>
      </div>
    );
  }

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (depositAmount < 500) {
      setError('ভুল এমাউন্ট! সর্বনিম্ন ডিপোজিট ৫০০ টাকা হতে হবে।');
      return;
    }

    if (!depositSender || !depositTxId) {
      setError('অনুগ্রহ করে আপনার বিকাশ/রকেট প্রেরক নম্বর এবং ট্রানজেকশন আইডি দিন!');
      return;
    }

    onAddTransaction({
      userId: user.id,
      userEmail: user.email,
      username: user.username,
      type: 'deposit',
      amountBDT: depositAmount,
      method: depositMethod,
      number: depositSender,
      transactionId: depositTxId
    });

    setSuccess('আপনার ডিপোজিটের আবেদনটি পাওয়া গেছে! মডারেটর এবং এডমিন প্যানেল আপনার পেমেন্ট ভেরিফাই করে ১-৩ ঘণ্টার মধ্যে ব্যালেন্স যোগ করে দিবে। অনুগ্রহ করে অপেক্ষা করুন।');
    setDepositSender('');
    setDepositTxId('');
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (withdrawAmount < 1000) {
      setError('ভুল উইথড্র এমাউন্ট! সর্বনিম্ন উত্তোলন ১০০০ টাকা হতে হবে।');
      return;
    }

    if (user.bdtBalance < withdrawAmount) {
      setError(`আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই! বর্তমান ব্যালেন্স: ${user.bdtBalance} টাকা।`);
      return;
    }

    if (!withdrawReceiver) {
      setError('অনুগ্রহ করে প্রাপ্ত মোবাইল নাম্বার প্রদান করুন!');
      return;
    }

    onAddTransaction({
      userId: user.id,
      userEmail: user.email,
      username: user.username,
      type: 'withdraw',
      amountBDT: withdrawAmount,
      method: withdrawMethod,
      number: withdrawReceiver
    });

    setSuccess('আপনার উইথড্র আবেদনটি পেন্ডিং তালিকায় রয়েছে। দ্রুতই মেইন এডমিন এটি রিভিউ করে আপনার বিকাশ বা রকেটে পেমেন্ট রিলিজ করবে!');
    setWithdrawReceiver('');
  };

  // Filter transaction records specifically for logged user
  const userTxList = transactions.filter(t => t.userId === user.id);

  return (
    <div className="space-y-8">
      {/* Upper toggle tabs and summary */}
      <section className="bg-emerald-950/40 border border-emerald-500/20 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-stone-100 flex items-center space-x-2">
            <Landmark className="text-emerald-400 w-6 h-6" />
            <span>আর্থিক লেনদেন কেন্দ্র (Deposit & Withdrawal Hub)</span>
          </h2>
          <p className="text-stone-300 text-xs mt-1">
            বিকাশ পার্সোনাল এবং রকেট পার্সোনাল মোবাইল ব্যাংকিংয়ের মাধ্যমে সম্পূর্ণ রিয়েল টাইম পেমেন্ট রিকোয়েস্ট করুন।
          </p>
        </div>

        {/* Header tabs controls in red and green colors */}
        <div className="flex bg-stone-900 border border-stone-800 p-1.5 rounded-xl self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 md:flex-none py-2 px-6 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'deposit'
                ? 'bg-red-650 text-white shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            টাকা ডিপোজিট করতে
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 md:flex-none py-2 px-6 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'withdraw'
                ? 'bg-red-650 text-white shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            টাকা উত্তোলন করতে
          </button>
        </div>
      </section>

      {/* Main interaction panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left pane: input forms */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 p-6 md:p-8 rounded-2xl shadow-xl">
            {error && (
              <div className="bg-red-950/50 border border-red-500/40 text-red-300 p-3 rounded-xl text-xs flex items-start space-x-2 mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs flex items-start space-x-2 mb-4">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                <span>{success}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {activeTab === 'deposit' ? (
                <motion.form
                  key="deposit-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleDepositSubmit}
                  className="space-y-4"
                >
                  <h3 className="text-md font-bold text-stone-200">১. পেমেন্ট করুন এবং ফর্মটি পূরণ করুন</h3>
                  
                  {/* Copy static agent transaction numbers wrapper */}
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-3">
                    <p className="text-xs text-stone-300">আমাদের নিচের বিকাশ অথবা রকেট পার্সোনাল নাম্বারে সেন্ড মানি করুন:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-stone-950 p-2.5 rounded-lg flex items-center justify-between border border-stone-800">
                        <div>
                          <span className="font-bold text-emerald-400 block">বিকাশ পার্সোনাল</span>
                          <span className="text-stone-300 font-mono">01727122754</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyNumber('01727122754')}
                          className="p-1 px-2 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded font-bold text-[10px] text-blue-400 flex items-center space-x-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copied ? 'কপি!' : 'কপি'}</span>
                        </button>
                      </div>

                      <div className="bg-stone-950 p-2.5 rounded-lg flex items-center justify-between border border-stone-800">
                        <div>
                          <span className="font-bold text-emerald-400 block">রকেট পার্সোনাল</span>
                          <span className="text-stone-300 font-mono">01727122754</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyNumber('01727122754')}
                          className="p-1 px-2 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded font-bold text-[10px] text-blue-400 flex items-center space-x-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copied ? 'কপি!' : 'কপি'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form input fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1">ডিপোজিট মাধ্যম</label>
                      <select
                        value={depositMethod}
                        onChange={(e) => setDepositMethod(e.target.value as 'bkash' | 'rocket')}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-white text-xs h-[40px]"
                      >
                        <option value="bkash">বিকাশ (Bkash)</option>
                        <option value="rocket">রকেট (Rocket)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1">টাকার পরিমাণ (সর্বনিম্ন ৫০০)</label>
                      <input
                        type="number"
                        min="500"
                        step="1"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-white text-xs h-[40px]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1">প্রেরক মোবাইল নাম্বার</label>
                      <input
                        type="text"
                        placeholder="017 XXXXXXX"
                        value={depositSender}
                        onChange={(e) => setDepositSender(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-white text-xs h-[40px] font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1">ট্রানজেকশন আইডি (TxID)</label>
                      <input
                        type="text"
                        placeholder="7H92F9SKJ"
                        value={depositTxId}
                        onChange={(e) => setDepositTxId(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-white text-xs h-[40px] font-mono"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl shadow-lg hover:shadow-red-900/10 cursor-pointer text-xs"
                    id="submit-deposit"
                  >
                    ডিপোজিট রিকোয়েস্ট করুন
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="withdraw-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleWithdrawSubmit}
                  className="space-y-4"
                >
                  <h3 className="text-md font-bold text-stone-200">১. টাকা উত্তোলনের জন্য আবেদন পূরণ করুন</h3>

                  <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl space-y-1">
                    <p className="text-xs text-stone-300 font-bold leading-normal">উত্তোলন সীমাবদ্ধতা:</p>
                    <ul className="text-[10px] text-stone-400 space-y-0.5 list-disc pl-4">
                      <li>উত্তোলন করতে অবশ্যই ন্যুনতম ১০০০ টাকা ওয়ালেট ব্যালেন্সে থাকতে হবে।</li>
                      <li>শুধুমাত্র বিকাশ পার্সোনাল অথবা রকেট পার্সোনাল ব্যবহার করা যাবে।</li>
                      <li>এডমিন রিভিউ সাধারণত ১২ ঘণ্টার কম সময়ের মধ্যে প্রদান করা হয়।</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1">উত্তোলন মাধ্যম (বিকাশ/রকেট)</label>
                      <select
                        value={withdrawMethod}
                        onChange={(e) => setWithdrawMethod(e.target.value as 'bkash' | 'rocket')}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-white text-xs h-[40px]"
                      >
                        <option value="bkash">বিকাশ পার্সোনাল</option>
                        <option value="rocket">রকেট পার্সোনাল</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1">উত্তোলনের পরিমাণ (নূন্যতম ১০০০ BDT)</label>
                      <input
                        type="number"
                        min="1000"
                        step="1"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-white text-xs h-[40px]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-400 mb-1">আপনার পার্সোনাল মোবাইল নাম্বার</label>
                    <input
                      type="text"
                      placeholder="017 XXXXXXX"
                      value={withdrawReceiver}
                      onChange={(e) => setWithdrawReceiver(e.target.value)}
                      className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-white text-xs h-[40px] font-mono"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl shadow-lg hover:shadow-red-900/10 cursor-pointer text-xs"
                    id="submit-withdraw"
                  >
                    টাকা উত্তোলন রিকোয়েস্ট করুন
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right pane: recent personal logs layout */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full min-h-[350px]">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-200 flex items-center space-x-2">
                <History className="w-4 h-4 text-emerald-400" />
                <span>আপনার সাম্প্রতিক লেনদেন রেকর্ড ({userTxList.length})</span>
              </h3>

              {userTxList.length === 0 ? (
                <div className="text-center py-12 text-stone-500 space-y-2">
                  <Wallet className="w-8 h-8 text-stone-600 mx-auto opacity-40" />
                  <p className="text-xs">কোনো পূর্ববর্তী লেনদেন ডাটা খুঁজে পাওয়া যায়নি।</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                  {userTxList.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-stone-950 p-3 rounded-xl border border-stone-800/80 text-xs flex justify-between items-center"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold capitalize ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {tx.type === 'deposit' ? 'ডিপোজিট' : 'উত্তোলন'}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">({tx.method})</span>
                        </div>
                        <p className="text-[10px] text-stone-400 font-mono">মোবাইল: {tx.number}</p>
                        {tx.transactionId && (
                          <p className="text-[9px] text-stone-500 font-mono">TxID: {tx.transactionId}</p>
                        )}
                      </div>

                      <div className="text-right space-y-1">
                        <span className="font-bold text-stone-200 block">{tx.amountBDT} BDT</span>
                        {tx.status === 'pending' ? (
                          <span className="bg-yellow-950 border border-yellow-800/40 text-yellow-500 px-2 py-0.5 rounded-full text-[9px]">
                            পেন্ডিং রয়েছে
                          </span>
                        ) : tx.status === 'rejected' ? (
                          <span className="bg-red-950 border border-red-800/40 text-red-500 px-2 py-0.5 rounded-full text-[9px]">
                            বাতিল কৃত
                          </span>
                        ) : (
                          <span className="bg-emerald-950 border border-emerald-800/40 text-emerald-400 px-2 py-0.5 rounded-full text-[9px]">
                            অনুমোদিত
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-[10px] text-stone-500 leading-normal border-t border-stone-800/60 pt-4 mt-4">
              🔐 আপনার প্রতিটি পেমেন্ট ট্রানজেকশন কাস্টম ব্যাকএন্ডে সংরক্ষিত থাকে, যা এডমিন ছাড়া কোনো সাধারণ ইউজার দেখতে পারবেন না।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
