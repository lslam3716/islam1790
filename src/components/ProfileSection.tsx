/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Phone, Mail, MapPin, Sparkles, Smile, ShieldAlert, CheckCircle2, LogOut, Lock } from 'lucide-react';
import { User } from '../types';

interface ProfileSectionProps {
  user: User;
  onLogout: () => void;
  onUpdateProfile: (updated: Partial<User>) => void;
}

export default function ProfileSection({ user, onLogout, onUpdateProfile }: ProfileSectionProps) {
  // Config edit state
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [phone, setPhone] = useState(user.contactNumber);
  const [address, setAddress] = useState(user.address);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const [message, setMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      username,
      bio,
      contactNumber: phone,
      address,
      profilePic
    });
    setIsEditing(false);
    setMessage('প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
    setTimeout(() => setMessage(''), 3000);
  };

  // If we can reset to SI Raju explicitly for testing
  const handleResetToRajuDefault = () => {
    setUsername('SI Raju');
    setBio('যে নিজের পথ নিজে তৈরী করে, সে কখনো পথ হারায় না');
    setPhone('01746043716');
    setAddress('Ashkona, Hajj Camp, Airport, Dhaka');
    setProfilePic('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200');
    
    onUpdateProfile({
      username: 'SI Raju',
      bio: 'যে নিজের পথ নিজে তৈরী করে, সে কখনো পথ হারায় না',
      contactNumber: '01746043716',
      address: 'Ashkona, Hajj Camp, Airport, Dhaka',
      profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
    });
    setIsEditing(false);
    setMessage('ডিফল্ট SI Raju প্রোফাইল সফলভাবে সেট করা হয়েছে!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Upper Bio card layout */}
      <section className="bg-emerald-950/20 border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="bg-gradient-to-r from-blue-700/80 to-emerald-700/80 h-32 w-full" />
        
        {/* Avatar profile frame position */}
        <div className="px-6 md:px-8 pb-6 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-12 mb-4 md:space-x-6">
            <img
              src={profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
              alt={user.username}
              className="w-28 h-28 rounded-full border-4 border-stone-900 shadow-2xl object-cover bg-stone-850"
              referrerPolicy="no-referrer"
            />
            
            <div className="text-center md:text-left mt-3 md:mt-0 space-y-1">
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <h2 className="text-2xl font-black text-white">{user.username}</h2>
                <span className="bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {user.isAdmin ? 'মেইন এডমিন' : 'সদস্য'}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">{user.email}</p>
            </div>
          </div>

          {/* Slogan details and quote */}
          <div className="mt-6 pt-6 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Smile className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  <strong className="text-stone-400 block mb-0.5 font-medium">ব্যক্তিগত উক্তি (Bio):</strong>
                  "{user.bio || 'যে নিজের পথ নিজে তৈরী করে, সে কখনো পথ হারায় না'}"
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <p>
                  <span className="text-stone-400 font-medium mr-1">মোবাইল নম্বর:</span>
                  <span className="font-mono">{user.contactNumber || '01746043716'}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p>
                  <strong className="text-stone-400 block mb-0.5 font-medium">ঠিকানা (Address):</strong>
                  {user.address || 'Ashkona, Hajj Camp, Airport, Dhaka'}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <p>
                  <span className="text-stone-400 font-medium mr-1">যোগাযোগ জিমেইল:</span>
                  <span className="font-mono">{user.email || 'rajuahmed27540@gmail.com'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editing component panels */}
      <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
        {message && (
          <div className="bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 p-3 rounded-lg text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <h3 className="text-md font-bold text-stone-200">প্রোফাইল কাস্টমাইজেশন ও সেটিংস</h3>
          {!isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-650 hover:bg-red-700 text-white font-bold text-xs py-1.5 px-3 rounded-md shadow-md"
              >
                তথ্য পরিবর্তন করুন
              </button>
              <button
                onClick={handleResetToRajuDefault}
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-xs py-1.5 px-3 rounded-md"
              >
                SI Raju ডিফল্ট করুন
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs text-stone-400 hover:text-white"
            >
              বাতিল করুন
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 mb-1 font-semibold">আপনার নাম</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-semibold">মোবাইল নম্বর</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-semibold">ব্যক্তিগত উক্তি (Bio)</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 mb-1 font-semibold">ঠিকানা (Address)</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-semibold">প্রোফাইল ছবির লিংক (Image URL)</label>
                <input
                  type="text"
                  value={profilePic}
                  onChange={(e) => setProfilePic(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white font-mono"
                  required
                />
              </div>
            </div>

            {/* Red theme action buttons applied per prompt */}
            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-md"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-stone-400 leading-relaxed text-xs">
              <p>
                🔒 নিরাপত্তা তথ্য: আপনার ব্যক্তিগত ব্যাংকগেটওয়ে ডিটেইলস এবং পাসওয়ার্ড সুরক্ষিত অবস্থায় রয়েছে। যেহেতু ফায়ারবেস ব্যাকএন্ড ডেটাবেস সংযোগ স্থগিত রয়েছে, আপনার সর্বশেষ তথ্যসমূহ রিয়েল-টাইমে ব্রাউজারের বিশেষ সুরক্ষিত মেমোরিতে (Local Session) সচল সংরক্ষিত আছে।
              </p>
            </div>

            {/* Red button for logout */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-stone-500">নিবন্ধিত তারিখ: {new Date(user.registeredAt).toLocaleDateString('bn-BD')}</span>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-2 px-5 rounded-lg shadow-md flex items-center space-x-1"
                id="profile-logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>লগআউট করুন</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
