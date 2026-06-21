/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldAlert, BookOpen, Clock, HeartHandshake, CheckCircle2, UserCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Intro */}
      <section className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-white"
        >
          আমাদের সম্পর্কে (About Us) — <span className="text-emerald-400">অমর সাইট</span>
        </motion.h1>
        <p className="text-stone-300 text-sm max-w-2xl mx-auto leading-relaxed">
          "Amar Site" হলো বাংলাদেশীদের জন্য তৈরি একটি সর্বাধুনিক ভিডিও রিওয়ার্ড ভিত্তিক আর্নিং প্ল্যাটফর্ম। আমরা অতি সুনামের সাথে বিগত কয়েক বছর ধরে সঠিক নিয়মে সকল পেমেন্ট পরিশোধ করে আসছি। আমাদের প্রধান লক্ষ্য ডিজিটাল এডভার্টাইজিংকে সবার কাছে সহজ করে তোলা।
        </p>
      </section>

      {/* Decorative Banner */}
      <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl border border-stone-800">
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
          alt="Our Team Workspace" 
          className="w-full h-full object-cover brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex items-end p-6">
          <div className="space-y-1">
            <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">নিরাপদ ও বিশ্বস্ত</span>
            <h3 className="text-xl font-bold text-white">আপনার কর্মসংস্থান তৈরিতে আমরা বদ্ধপরিকর</h3>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-stone-900 border border-stone-800/60 p-6 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-900/40 text-blue-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-200">১০০% বিশ্বস্ততা ও স্বচ্ছতা</h3>
          <p className="text-stone-400 text-xs leading-relaxed">
            আমরা কাজের বিপরীতে সম্পূর্ণ রিয়েল টাইম ব্যালেন্স প্রদান করি। ফায়ারবেস ব্যাকএন্ড ডেটাবেজ সুরক্ষার কারণে আপনার কাস্টম উইথড্রয়াল রিকোয়েস্ট সুধুমাত্র আমাদের ডেডিকেটেড এডমিন দেখতে পায় এবং পেমেন্ট রিলিজ করে।
          </p>
        </div>

        <div className="bg-stone-900 border border-stone-800/60 p-6 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-orange-900/40 text-orange-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-200">১২ ঘণ্টা সময়সীমা কঠোর নিয়ম</h3>
          <p className="text-stone-400 text-xs leading-relaxed">
            বিজ্ঞাপনদাতাদের পলিসি মেনে প্রতিটি ভিডিও টাস্ক একবার দেখার পর পরবর্তী ১২ ঘণ্টার জন্য নিষ্ক্রিয় হয়ে যাবে। সময় অতিক্রান্ত হওয়ার পর টাস্কটি পুনরায় চালু হবে যাতে কেউ স্প্যামিং করতে না পারে।
          </p>
        </div>
      </section>

      {/* Platform Rules Bullet Cards */}
      <section className="bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center space-x-2 text-emerald-400">
          <BookOpen className="w-5 h-5" />
          <h3 className="text-xl font-bold">আমার সাইট (Amar Site) কাজের প্রধান নিয়মাবলি</h3>
        </div>

        <ul className="grid grid-cols-1 gap-4 text-xs text-stone-300">
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span><strong>ন্যূনতম ডিপোজিট ৫০০ টাকা:</strong> যেকোনো মেম্বারশিপ লেভেল পেমেন্ট অর্ডারের ক্ষেত্রে ডিপোজিট রিচার্জ অবশ্যই ৫০০ টাকা বা তার সমান হতে হবে।</span>
          </li>
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span><strong>ন্যূনতম উত্তোলন ১০০০ টাকা:</strong> ওয়ালেটে অন্তত ১০০০ টাকা জমা হলে বিকাশ বা রকেটের মাধ্যমে টাকা উত্তোলনের জন্য আবেদন করতে পারবেন।</span>
          </li>
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span><strong>বিকাশ ও রকেট পার্সোনাল ব্যবহার:</strong> উইথড্র করার সময় অবশ্যই সচল বিকাশ বা রকেট পার্সোনাল মোবাইল নাম্বার প্রদান করবেন। অন্য কোনো এজেন্টের নাম্বারে সেন্ডমানি বা ক্যাশআউট গ্রহণযোগ্য নয়।</span>
          </li>
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span><strong>নিরাপদ এডমিন প্রুভ গেটওয়ে:</strong> সমস্ত ডিপোজিট এবং টাকা উত্তোলনের ট্রানজেকশন কড়া নজরদারির মধ্যে এডমিনরা ১-৩ ঘণ্টার ভেতর ভেরিফাই করে অনুমোদন করে থাকে।</span>
          </li>
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span><strong>একই ডিভাইসে একাধিক আইডি নিষিদ্ধ:</strong> স্প্যাম অথবা ডুপ্লিকেট অ্যাকাউন্ট প্রমাণের পর এডমিন কোনো নোটিশ ছাড়াই আইডি ব্লক করার চরম ক্ষমতা রাখে।</span>
          </li>
        </ul>
      </section>

      {/* Security alert info banner */}
      <div className="bg-red-950/30 border border-red-800/30 p-5 rounded-2xl text-xs text-stone-300 flex items-start space-x-3">
        <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-stone-200">সতর্ক বার্তা ও দায়বদ্ধতা</h4>
          <p className="leading-relaxed">
            কোনো মেম্বার বা এজেন্ট ভুল ট্রানজেকশন আইডি সাবমিট করলে কিংবা প্রতারণার আশ্রয় নিলে এডমিন অ্যাকাউন্টটি নিষ্ক্রিয় করবে। যেকোনো সাহায্য সহযোগিতার জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>
      </div>
    </div>
  );
}
