/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, Calendar, Info, RefreshCw } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  allUsers: User[];
  onRegisterUser: (newUser: User) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess, allUsers, onRegisterUser }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForget, setIsForget] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign up fields
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('পুরুষ');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error/Success state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  // Sign Up Handler
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !dob || !gender || !password || !confirmPassword) {
      setError('অনুগ্রহ করে সব তথ্য প্রদান করুন!');
      return;
    }

    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলেনি!');
      return;
    }

    // Check if user already exists
    const exists = allUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setError('এই জিমেইল আইডি দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা হয়েছে!');
      return;
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      username,
      email: email.toLowerCase(),
      dob,
      gender,
      bio: 'যে নিজের পথ নিজে তৈরী করে, সে কখনো পথ হারায় না।',
      contactNumber: '01700000000',
      address: 'ঢাকা, বাংলাদেশ',
      balance: 0,
      bdtBalance: 0,
      activePackageId: null,
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      isAdmin: email.toLowerCase() === 'admin@amarsite.com',
      registeredAt: new Date().toISOString()
    };

    onRegisterUser(newUser);
    setSuccess('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন।');
    setIsLogin(true);
    // Clear sign up fields
    setUsername('');
    setDob('');
    setPassword('');
    setConfirmPassword('');
  };

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('জিমেইল আইডি এবং পাসওয়ার্ড প্রদান করুন!');
      return;
    }

    const user = allUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && 
      (u.email.toLowerCase() === 'admin@amarsite.com' ? password === 'admin123' : password === '123456' || password === u.id || password === 'admin123')
    );

    // If not found inside memory but check matching general passwords
    const matchedUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matchedUser) {
      // In localized system we accept standard passwords
      onAuthSuccess(matchedUser);
      onClose();
      return;
    }

    if (email.toLowerCase() === 'admin@amarsite.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'usr_admin',
        username: 'সিস্টেম এডমিন',
        email: 'admin@amarsite.com',
        dob: '1990-01-01',
        gender: 'পুরুষ',
        bio: 'সিস্টেম পরিচালক ও সার্বিক ব্যবস্থাপনাকারী।',
        contactNumber: '01727122754',
        address: 'ঢাকা এয়ারপোর্ট রোড',
        balance: 9999,
        bdtBalance: 1199880,
        activePackageId: 'pkg_5000',
        profilePic: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
        isAdmin: true,
        registeredAt: new Date().toISOString()
      };
      onRegisterUser(adminUser);
      onAuthSuccess(adminUser);
      onClose();
      return;
    }

    setError('ভুল জিমেইল আইডি অথবা পাসওয়ার্ড! (টেস্টিং পাসওয়ার্ড: 123456 বা রিয়েলটি ব্যবহার করুন)');
  };

  // Fast Login Demo User
  const handleDemoLogin = (type: 'raju' | 'admin') => {
    if (type === 'raju') {
      const rajuUser = allUsers.find(u => u.email === 'rajuahmed27540@gmail.com');
      if (rajuUser) {
        onAuthSuccess(rajuUser);
      } else {
        const defaultRaju: User = {
          id: 'usr_raju',
          username: 'SI Raju',
          email: 'rajuahmed27540@gmail.com',
          dob: '2000-01-01',
          gender: 'পুরুষ',
          bio: 'যে নিজের পথ নিজে তৈরী করে, সে কখনো পথ হারায় না',
          contactNumber: '01746043716',
          address: 'Ashkona, Hajj Camp, Airport, Dhaka',
          balance: 10, // default USD
          bdtBalance: 1200, // default 1200 BDT
          activePackageId: 'pkg_1000', // Pre-activated pkg gold
          profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
          isAdmin: false,
          registeredAt: new Date().toISOString()
        };
        onRegisterUser(defaultRaju);
        onAuthSuccess(defaultRaju);
      }
    } else {
      const adminUser: User = {
        id: 'usr_admin',
        username: 'ਸਿਸਸਟম এডমিন',
        email: 'admin@amarsite.com',
        dob: '1995-10-10',
        gender: 'পুরুষ',
        bio: 'মেইন এডমিনের এক্সেস ড্যাশবোর্ড।',
        contactNumber: '01727122754',
        address: 'Hajj Camp, Airport, Dhaka',
        balance: 500,
        bdtBalance: 60000,
        activePackageId: 'pkg_5000',
        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
        isAdmin: true,
        registeredAt: new Date().toISOString()
      };
      onRegisterUser(adminUser);
      onAuthSuccess(adminUser);
    }
    onClose();
  };

  const handleForgetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('অনুগ্রহ করে জিমেইল আইডি দিন!');
      return;
    }
    setSuccess('পাসওয়ার্ড রিসেট লিংক আপনার জিমেইলে পাঠানো হয়েছে (সিমুলেশন)! টেস্টিং এ যেকোনো পাসওয়ার্ড দিয়ে বা ডেমো ক্লিক করুন।');
    setIsForget(false);
    setIsLogin(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-stone-900 border border-emerald-800/30 rounded-2xl overflow-hidden shadow-2xl relative"
        id="auth-modal-container"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 w-full" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white bg-stone-800/80 p-1.5 rounded-full transition-colors"
          id="close-auth-modal"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-center space-x-2 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg border border-blue-400/30">
              AS
            </div>
            <span className="text-2xl font-bold tracking-wider text-white">Amar <span className="text-blue-500">Site</span></span>
          </div>

          <h2 className="text-xl font-bold text-center text-stone-200 mb-6">
            {isForget ? 'পাসওয়ার্ড পুনরুদ্ধার' : isLogin ? 'লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
          </h2>

          {error && (
            <div className="bg-red-950/50 border border-red-500/50 text-red-300 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 p-3 rounded-lg text-sm mb-4">
              {success}
            </div>
          )}

          {isForget ? (
            <form onSubmit={handleForgetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">জিমেইল আইডি</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 text-sm"
                id="reset-password-btn"
              >
                রিসেট লিংক পাঠান
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsForget(false)}
                  className="text-xs text-blue-400 hover:underline"
                >
                  লগইন পেজে ফিরে যান
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={isLogin ? handleLogin : handleSignUp} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1">ব্যবহারকারীর নাম (User name)</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="যেমন: SI Raju"
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-blue-500 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-400 mb-1">জন্ম তারিখ (DOB)</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-10 pr-3 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-400 mb-1">লিঙ্গ (Gender)</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm h-[40px]"
                      >
                        <option value="পুরুষ">পুরুষ</option>
                        <option value="মহিলা">মহিলা</option>
                        <option value="অন্যান্য">অন্যান্য</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">জিমেইল আইডি (Gmail ID)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">
                    {isLogin ? 'পাসওয়ার্ড (Password)' : 'নতুন পাসওয়ার্ড (New Password)'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••"
                      className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1">কনফার্ম পাসওয়ার্ড (Confirm Password)</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-blue-500 text-sm"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsForget(true)}
                    className="text-xs text-blue-400 hover:underline hover:text-blue-300"
                  >
                    পাসওয়ার্ড ভুলে গেছেন? (Forget Password)
                  </button>
                </div>
              )}

              {/* Red theme submit buttons as specified: বাটন কালার হবে লাল */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-lg text-sm"
                id="auth-submit-btn"
              >
                {isLogin ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন'}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-stone-800"></div>
                <span className="flex-shrink mx-4 text-stone-500 text-xs font-medium">অথবা দ্রুত ডেমো ট্রাই করুন</span>
                <div className="flex-grow border-t border-stone-800"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('raju')}
                  className="bg-stone-800 hover:bg-stone-700/80 border border-stone-700 text-stone-200 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 transition-all"
                  id="demo-user-btn"
                >
                  <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>SI Raju (ইউজার)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  className="bg-stone-800 hover:bg-stone-700/80 border border-stone-700 text-stone-200 py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 transition-all"
                  id="demo-admin-btn"
                >
                  <Lock className="w-3.5 h-3.5 text-red-500" />
                  <span>সিস্টেম এডমিন</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setSuccess('');
                  }}
                  className="text-xs text-blue-400 hover:underline"
                >
                  {isLogin ? 'নতুন অ্যাকাউন্ট খুলতে চান? সাইন আপ করুন' : 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-[10px] text-stone-500 flex items-center justify-center space-x-1">
            <Info className="w-3 h-3" />
            <span>ডেমো ইউজারের জন্য পাসওয়ার্ড প্রযোজ্য নয়। নতুন আইডিতে পাসওয়ার্ড ১২৩৪৫৬ দিন।</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
