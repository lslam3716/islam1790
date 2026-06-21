/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, Flame, Users, Landmark, MonitorPlay, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { User, LevelPackage } from '../types';
import { LEVEL_PACKAGES } from '../data/defaultData';

interface HomeSectionProps {
  user: User | null;
  onOpenAuth: () => void;
  onBuyPackage: (pkg: LevelPackage) => void;
  onNavigate: (section: string) => void;
  totalRegisteredUsers: number;
}

export default function HomeSection({ user, onOpenAuth, onBuyPackage, onNavigate, totalRegisteredUsers }: HomeSectionProps) {
  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden py-16 px-6 md:px-12 bg-emerald-950/20 border border-emerald-500/20 shadow-2xl">
        {/* Background Gradients & Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold"
          >
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>১২ ঘণ্টা পর পর আনলিমিটেড ইনকাম সুযোগ!</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            আমার সাইটে অনলাইনে <span className="text-emerald-400">ভিডিও দেখে</span> টাকা উপার্জন করুন!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-sm md:text-base leading-relaxed max-w-2xl"
          >
            অত্যন্ত বিশ্বস্ত এবং গ্যারান্টিড পেমেন্ট প্রোভাইডার। প্রতিটি ভিডিও দেখার জন্য পাবেন <span className="text-red-400 font-bold">০.৫০$ (৬০ টাকা)</span>। আপনাদের সুবিধার্থে রয়েছে বিকাশ এবং রকেট পার্সোনাল ডিপোজিট ও প্রত্যাহারের সুবর্ণ ব্যবস্থা!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {user ? (
              <button
                onClick={() => onNavigate('task')}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-red-900/30 transition-all flex items-center space-x-2 text-sm"
                id="hero-task-btn"
              >
                <MonitorPlay className="w-5 h-5" />
                <span>টাস্ক ভিডিও দেখা শুরু করুন</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-red-900/30 transition-all flex items-center space-x-2 text-sm"
                id="hero-auth-btn"
              >
                <span>নিবন্ধন করে কাজ শুরু করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onNavigate('about')}
              className="bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-bold px-6 py-3 rounded-xl transition-all text-sm"
              id="hero-about-btn"
            >
              আমাদের নিয়মাবলী জানুন
            </button>
          </motion.div>
        </div>
      </section>

      {/* Grid Platform Statistics Details Card Dashboard Style (সবুজ ড্যাসবোর্ড কালার) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-950/60 to-stone-900 border border-emerald-500/20 p-6 rounded-2xl flex items-center space-x-4 shadow-xl">
          <div className="p-4 bg-emerald-900/50 rounded-xl text-emerald-400">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs text-stone-400 font-medium">মোট কর্মজীবী মানুষ (People)</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">{totalRegisteredUsers + 1242} জন</h3>
            <p className="text-[10px] text-emerald-500/80 mt-0.5">● ২৪ ঘণ্টায় ১০০+ জন যুক্ত হয়েছে</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-950/60 to-stone-900 border border-emerald-500/20 p-6 rounded-2xl flex items-center space-x-4 shadow-xl">
          <div className="p-4 bg-blue-900/50 rounded-xl text-blue-400">
            <Landmark className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs text-stone-400 font-medium">মোট সফল প্রত্যাহারকৃত অর্থ</p>
            <h3 className="text-2xl font-black text-blue-400 mt-1">৮,৭৩,২০০ টাকা</h3>
            <p className="text-[10px] text-blue-500/80 mt-0.5">বিকাশ ও রকেট পেমেন্টে ১২ ঘণ্টার মধ্যে</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-950/60 to-stone-900 border border-emerald-500/20 p-6 rounded-2xl flex items-center space-x-4 shadow-xl">
          <div className="p-4 bg-orange-900/50 rounded-xl text-orange-400">
            <MonitorPlay className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs text-stone-400 font-medium">আজকের সম্পন্নযোগ্য ভিডিও</p>
            <h3 className="text-2xl font-black text-orange-400 mt-1">৩০টি প্রিমিয়াম ভিডিও</h3>
            <p className="text-[10px] text-orange-500/80 mt-0.5">প্রতি ১২ ঘণ্টা পর পুনরায় রিলোড</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-950/60 to-stone-900 border border-emerald-500/20 p-6 rounded-2xl flex items-center space-x-4 shadow-xl">
          <div className="p-4 bg-red-900/50 rounded-xl text-red-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs text-stone-400 font-medium">নিরাপত্তা ও এডমিন প্যানেল</p>
            <h3 className="text-2xl font-black text-red-400 mt-1">১০০% সিকিউরড</h3>
            <p className="text-[10px] text-red-500/80 mt-0.5">সুধুমাত্র এডমিনরা ডাটা দেখবে</p>
          </div>
        </div>
      </section>

      {/* Packages Area: সুন্দর প্যাকেজ আকারে যেমন ৩০০ টাকা, ৫০০টাকা, ১০০০টাকা, ১৫০০টাকা, ২০০০টাকা, ২৫০০টাকা, ৩০০০টাকা, ৩৫০০টাকা, ৪০০০টাকা, ৪৫০০টাকা, ৫০০০টাকা */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">উপর্জন বৃদ্ধির জন্য <span className="text-emerald-400">মেম্বারশিপ প্যাকেজসমূহ</span></h2>
          <p className="text-stone-400 text-sm">
            যেকোনো একটি প্যাকেজ অ্যাক্টিভেট করে দৈনিক সর্বোচ্চ ভিডিও দেখে টাকা ইনকাম করুন। সর্বনিম্ন ডিপোজিট ৫০০ টাকা এবং পেমেন্টে কোনো লুকানো ফি নেই।
          </p>
        </div>

        {/* Dashboard Area Green Panels and Red Buttons applied exactly per prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="packages-grid">
          {LEVEL_PACKAGES.map((pkg) => {
            const isUserActive = user?.activePackageId === pkg.id;
            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -5 }}
                className={`rounded-2xl border ${
                  isUserActive 
                    ? 'border-emerald-400 bg-gradient-to-b from-emerald-950/80 to-stone-950' 
                    : 'border-emerald-800/20 bg-gradient-to-b from-stone-900/90 to-stone-950'
                } overflow-hidden shadow-xl hover:shadow-2xl transition-all relative flex flex-col justify-between`}
              >
                {isUserActive && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-stone-950 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>চলতি প্যাকেজ</span>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  {/* Package title & Icon */}
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: pkg.color }} />
                    <h3 className="text-lg font-bold text-stone-100">{pkg.name}</h3>
                  </div>

                  {/* Price Big Display */}
                  <div>
                    <span className="text-3xl font-black text-emerald-400">{pkg.priceBDT}</span>
                    <span className="text-xs text-stone-400 ml-1">টাকা / {pkg.validityDays} দিন</span>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed min-h-[40px]">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-stone-800/60 text-xs text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-500">প্রতিদিনের কাজ:</span>
                      <span className="font-semibold text-emerald-400">{pkg.dailyTasksCount} টি ভিডিও</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ভিডিও প্রতি আয়:</span>
                      <span className="font-semibold text-red-400">৬০ টাকা (০.৫০$)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">মেয়াদকাল:</span>
                      <span className="font-semibold text-stone-300">{pkg.validityDays} দিন</span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold text-stone-200 border-t border-stone-800/40">
                      <span>আনলিমিটেড আর্নিং:</span>
                      <span className="text-emerald-400">{pkg.dailyTasksCount * 60} BDT / দৈনিক</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {/* Button style: RED */}
                  {isUserActive ? (
                    <button
                      disabled
                      className="w-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold py-2.5 rounded-xl cursor-default text-center flex items-center justify-center space-x-1"
                    >
                      <span>আপনার এই প্যাকেজটি সক্রিয় রয়েছে</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onBuyPackage(pkg)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md transition-all active:scale-[0.98] transform flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>প্যাকেজটি কিনুন</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works Section in Bengali */}
      <section className="bg-stone-900 border border-stone-800 rounded-3xl p-8 md:p-12 space-y-8">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-bold text-stone-200">আমার সাইটের ড্যাশবোর্ড থেকে কিভাবে উপার্জন করবেন?</h2>
          <p className="text-stone-400 text-sm">সহজ ৪টি ধাপে ভিডিও দেখে সরাসরি টাকা ইনকাম করুন এবং উত্তোলন করুন।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-500/20 text-white flex items-center justify-center font-bold">১</div>
            <h4 className="text-stone-200 font-bold text-sm">একউন্ট তৈরি করুন</h4>
            <p className="text-stone-400 text-xs leading-relaxed">আপনার ইউজারনেম, জন্ম তারিখ, জিমেইল আইডি ও মোবাইল নাম্বার দিয়ে ২ মিনিটে সাইন আপ করুন।</p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-500/20 text-white flex items-center justify-center font-bold">২</div>
            <h4 className="text-stone-200 font-bold text-sm">ডিপোজিট করুন</h4>
            <p className="text-stone-400 text-xs leading-relaxed">সর্বনিম্ন ৫০০ টাকা বিকাশ অথবা রকেট এর সাহায্যে আমাদের পার্সোনাল নাম্বারে সেন্ড করুন এবং সাবমিট করুন।</p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-500/20 text-white flex items-center justify-center font-bold">৩</div>
            <h4 className="text-stone-200 font-bold text-sm">টাস্ক কমপ্লিট করুন</h4>
            <p className="text-stone-400 text-xs leading-relaxed">"AS Task" সেকশনে ভিডিও দেখে প্রতি ভিডিওর জন্য ৬০ টাকা সরাসরি নিজের ওয়ালেট ব্যালেন্সে জমিয়ে ফেলুন।</p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-500/20 text-white flex items-center justify-center font-bold">৪</div>
            <h4 className="text-stone-200 font-bold text-sm">দ্রুত টাকা তুলুন</h4>
            <p className="text-stone-400 text-xs leading-relaxed">সর্বনিম্ন ১০০০ টাকা হলেই বিকাশ বা রকেট দিয়ে ইনস্ট্যান্ট উইথড্র আবেদন করুন এবং ১ ঘণ্টার মধ্যে টাকা বুঝে নিন!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
