/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Mail, MapPin, Award, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { WorkerPerson, User } from '../types';

interface PeopleSectionProps {
  workers: WorkerPerson[];
  allRegisteredUsers: User[];
}

export default function PeopleSection({ workers, allRegisteredUsers }: PeopleSectionProps) {
  // Combine hardcoded mock workers from Bangladesh and real registered users in system for dynamic display
  const combinedPeopleList = [
    ...allRegisteredUsers.map(u => ({
      id: u.id,
      name: u.username,
      contactGmail: u.email,
      profilePic: u.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      address: u.address || 'ঢাকা, বাংলাদেশ',
      totalEarningsBDT: u.bdtBalance,
      joinedDate: new Date(u.registeredAt || Date.now()).toLocaleDateString('bn-BD'),
      role: u.isAdmin ? 'সিস্টেম এডমিন' : 'সক্রিয় মেম্বার'
    })),
    ...workers
  ];

  return (
    <div className="space-y-8">
      {/* Banner dashboard area (সবুজ ড্যাসবোর্ড কালার) */}
      <section className="bg-emerald-950/40 border border-emerald-500/20 p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>রিয়েল টাইম কর্মী পরিসংখ্যান</span>
            </span>
            <h2 className="text-2xl font-black text-white">সদস্যবৃন্দ এবং কর্মীবাহিনী (Our Workers & Community)</h2>
            <p className="text-stone-300 text-xs md:text-sm">
              আমাদের সাইটে বর্তমানে অসংখ্য বাংলাদেশী মানুষ দূর দূরান্ত থেকে প্রতিদিন ভিডিও দেখে ও মেম্বারশিপ প্যাকেজ নিয়ে আত্মনির্ভরশীল হচ্ছে!
            </p>
          </div>

          <div className="bg-stone-900 border border-emerald-500/20 px-5 py-4 rounded-xl flex items-center space-x-4">
            <Users className="w-10 h-10 text-emerald-400" />
            <div>
              <p className="text-xs text-stone-400">সর্বমোট সক্রিয় সদস্যসংখ্যা</p>
              <h3 className="text-xl font-extrabold text-white mt-0.5">{combinedPeopleList.length + 1520} জন</h3>
              <p className="text-[9px] text-emerald-400 mt-0.5">● কাজের লাইভ ডেটা ফিড সক্রিয়</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of highlight key workers and stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-1.5">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h4 className="text-stone-300 font-semibold text-xs">আজকের সেরা আয়কারী</h4>
          <p className="text-lg font-bold text-white">SI Raju</p>
          <span className="text-[10px] text-emerald-500 block">মোট রিওয়ার্ড: ২৪,৫০০ BDT</span>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-1.5">
          <Award className="w-5 h-5 text-blue-400" />
          <h4 className="text-stone-300 font-semibold text-xs">টপ উইথড্রয়াল এভারেজ</h4>
          <p className="text-lg font-bold text-white">৩,২০০ টাকা দৈনিক</p>
          <span className="text-[10px] text-blue-500 block">গড় উইথড্র ভেরিফিকেশন সময়মসীমা: ২ ঘণ্টা</span>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-1.5">
          <CheckCircle2 className="w-5 h-5 text-red-450 text-red-500" />
          <h4 className="text-stone-300 font-semibold text-xs">সফল পেমেন্ট রিলিজ হর</h4>
          <p className="text-lg font-bold text-white">১০০% গ্যারান্টিড পেমেন্ট</p>
          <span className="text-[10px] text-red-400 block">প্রতারণামূলক কাজ ব্যতিত সকল পেমেন্ট এপ্রুভড</span>
        </div>
      </div>

      {/* Worker database table layout with beautiful borders */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl" id="worker-people-list">
        <div className="p-5 border-b border-stone-800 bg-stone-950/40 flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-200">সক্রিয় সদস্য তালিকা</h3>
          <span className="text-[10px] text-stone-400">সর্বশেষ আপডেটকৃত তালিকা</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 font-medium bg-stone-950/20">
                <th className="p-4 text-stone-400">নাম ও ছবি</th>
                <th className="p-4 text-stone-400">জিমেইল আইডি</th>
                <th className="p-4 text-stone-400">ঠিকানা ও স্থান</th>
                <th className="p-4 text-stone-400">মোট অর্জিত আয় BDT (টাকা)</th>
                <th className="p-4 text-stone-400">লেভেল রোল</th>
                <th className="p-4 text-stone-400 text-right">যোগদানের তারিখ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {combinedPeopleList.map((person, index) => (
                <tr key={index} className="hover:bg-stone-850/40 transition-colors text-stone-300">
                  <td className="p-4 flex items-center space-x-3">
                    <img
                      src={person.profilePic}
                      alt={person.name}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-500/20 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-bold text-stone-100 block">{person.name}</span>
                      <span className="text-[10px] font-mono text-emerald-500/80">আইডি: #{person.id.slice(4, 9)}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-stone-400">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3 text-stone-500" />
                      <span>{person.contactGmail}</span>
                    </div>
                  </td>
                  <td className="p-4 text-stone-450 text-stone-300">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-stone-500" />
                      <span>{person.address}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-black text-emerald-400 text-sm">{person.totalEarningsBDT.toLocaleString('bn-BD')} BDT</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800/40 text-emerald-400 text-[10px] font-bold rounded-full">
                      {person.role}
                    </span>
                  </td>
                  <td className="p-4 text-right text-stone-500">
                    {person.joinedDate || '2026-06-20'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
