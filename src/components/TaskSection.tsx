/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle2, Flame, Lock, Clock, MonitorPlay, Sparkles, Youtube, Info } from 'lucide-react';
import { User, Task } from '../types';
import { DEFAULT_TASKS, LEVEL_PACKAGES } from '../data/defaultData';

interface TaskSectionProps {
  user: User | null;
  onOpenAuth: () => void;
  onNavigate: (section: string) => void;
  taskLogs: { [taskId: string]: string }; // ISO timestamps
  onCompleteTask: (taskId: string, bdtReward: number, usdReward: number) => void;
}

export default function TaskSection({
  user,
  onOpenAuth,
  onNavigate,
  taskLogs,
  onCompleteTask,
}: TaskSectionProps) {
  const [activePlayTask, setActivePlayTask] = useState<Task | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [hasCompletedActive, setHasCompletedActive] = useState(false);

  // Remaining time formatted helper
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Interval timer for core play countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activePlayTask && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setHasCompletedActive(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activePlayTask, countdown]);

  const handleStartTask = (task: Task) => {
    if (!user) {
      onOpenAuth();
      return;
    }

    if (!user.activePackageId) {
      alert('টাস্ক সম্পন্ন করার জন্য অনুগ্রহ করে হোম পেজ থেকে প্রথমে একটি মেম্বারশিপ প্যাকেজ কিনুন!');
      onNavigate('home');
      return;
    }

    // Check task count for the package
    const userPkg = LEVEL_PACKAGES.find((p) => p.id === user.activePackageId);
    const limit = userPkg ? userPkg.dailyTasksCount : 1;

    // Count tasks completed in last 12 hours
    const completedIn12h = Object.values(taskLogs).filter((isoStr) => {
      const ms = new Date(isoStr).getTime();
      return Date.now() - ms < 12 * 60 * 60 * 1000;
    }).length;

    if (completedIn12h >= limit) {
      alert(
        `আপনার সক্রিয় প্যাকেজ (${userPkg?.name})-এর ১২ ঘণ্টার কাজের সীমা (${limit} টি) শেষ হয়েছে! অনুগ্রহ করে আরো বড় প্যাকেজ আপডেট করুন অথবা ১২ ঘণ্টা শেষ হওয়ার জন্য অপেক্ষা করুন।`
      );
      return;
    }

    setActivePlayTask(task);
    setCountdown(task.durationSeconds);
    setHasCompletedActive(false);
  };

  const handleClaimReward = () => {
    if (activePlayTask) {
      onCompleteTask(
        activePlayTask.id,
        activePlayTask.rewardBDT,
        activePlayTask.rewardUSD
      );
      setActivePlayTask(null);
    }
  };

  // Helper function to get remainder 12 hours cooldown string
  const getCooldownTime = (taskId: string) => {
    const completedAtStr = taskLogs[taskId];
    if (!completedAtStr) return null;

    const completedTime = new Date(completedAtStr).getTime();
    const TwelveHoursMs = 12 * 60 * 60 * 1000;
    const diff = TwelveHoursMs - (currentTime - completedTime);

    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const activePackage = LEVEL_PACKAGES.find((p) => p.id === user?.activePackageId);
  const tasksLeftCount = activePackage
    ? activePackage.dailyTasksCount -
      Object.values(taskLogs).filter((isoStr) => {
        const ms = new Date(isoStr).getTime();
        return Date.now() - ms < 12 * 60 * 60 * 1000;
      }).length
    : 0;

  return (
    <div className="space-y-8">
      {/* Upper Status Section with Inside dashboard color (সবুজ ড্যাসবোর্ড কালার) */}
      <section className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-wider">ভিডিও দেখে উপার্জন ড্যাসবোর্ড</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">AS টাস্ক সেন্টার (Video Reward Center)</h2>
            <p className="text-stone-300 text-xs md:text-sm">
              প্রতিটি ভিডিও সফলভাবে দেখার জন্য পান <span className="text-red-400 font-bold">০.৫০$ (৬০ টাকা)</span>। একই ভিডিও পুনরায় ১২ ঘণ্টা পর পর দেখতে পারবেন।
            </p>
          </div>

          <div className="bg-stone-900/90 border border-emerald-500/20 p-4 rounded-xl flex items-center space-x-4">
            <div>
              <p className="text-xs text-stone-400">আপনার আজকের প্যাকেজ অবস্থা</p>
              <h4 className="text-md font-bold text-white mt-0.5">
                {user ? (
                  activePackage ? (
                    <span className="text-emerald-400">{activePackage.name}</span>
                  ) : (
                    <span className="text-stone-500">কোনো মেম্বারশিপ নেই</span>
                  )
                ) : (
                  <span className="text-blue-400">লগইন করা নেই</span>
                )}
              </h4>
              <p className="text-[10px] text-stone-400 mt-1">
                {user && activePackage && (
                  <span>টাস্ক অবশিষ্ট: <strong className="text-red-400">{tasksLeftCount}</strong> / {activePackage.dailyTasksCount} টি (১২ঘন্টায়)</span>
                )}
              </p>
            </div>
            {user && !activePackage && (
              <button
                onClick={() => onNavigate('home')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-3 rounded-lg shadow-md"
              >
                প্যাকেজ কিনুন
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Task Grid lists */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-stone-200 flex items-center space-x-2">
            <MonitorPlay className="text-blue-500 w-5 h-5" />
            <span>উপলব্ধ সকল ভিডিও টাস্কসমূহ</span>
          </h3>
          <span className="text-xs text-stone-400">১২ ঘণ্টা সময় গণনা পদ্ধতি সক্রিয়</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="tasks-grid">
          {DEFAULT_TASKS.map((task) => {
            const cooldown = getCooldownTime(task.id);
            const isLocked = cooldown !== null;

            return (
              <div
                key={task.id}
                className={`group rounded-2xl border ${
                  isLocked ? 'border-red-900/30 bg-stone-950/80' : 'border-emerald-800/10 bg-gradient-to-b from-stone-900 to-stone-950'
                } overflow-hidden shadow-lg hover:shadow-2xl transition-all relative flex flex-col justify-between`}
              >
                {/* Reward Floating Badge */}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full z-10 flex items-center space-x-1 shadow-md">
                  <span>+{task.rewardBDT} TK</span>
                  <span className="text-[8px] opacity-80">(0.50$)</span>
                </span>

                {/* Thumbnail Header Area */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={task.thumbnail}
                    alt={task.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-[0.75]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                  {/* Play circle / lock icon center overlay */}
                  {isLocked ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                      <div className="text-center space-y-2">
                        <Lock className="w-8 h-8 text-red-500 mx-auto animate-bounce" />
                        <span className="bg-red-950 border border-red-500/30 text-red-400 font-mono text-xs px-2.5 py-1 rounded-lg block">
                          cooldown: {cooldown}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartTask(task)}
                      className="absolute inset-0 m-auto w-12 h-12 bg-red-600 hover:bg-red-700 hover:scale-110 active:scale-95 text-white rounded-full flex items-center justify-center transition-all shadow-xl shadow-red-950/40"
                      type="button"
                    >
                      <Play className="w-5 h-5 fill-white" />
                    </button>
                  )}
                </div>

                <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-200 line-clamp-2 leading-snug group-hover:text-emerald-400 transition-colors">
                      {task.title}
                    </h4>
                    <p className="text-[10px] text-stone-500 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      <span>ভিডিওর সময়সীমা: {task.durationSeconds} সেকেন্ড</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                    <span className="text-xs text-stone-400">ইনস্ট্যান্ট পেমেন্ট</span>
                    {isLocked ? (
                      <button
                        disabled
                        className="bg-stone-850 text-stone-500 border border-stone-800 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 cursor-not-allowed"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>লকড রয়েছে</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartTask(task)}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-md transition-all flex items-center space-x-1"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>ভিডিও দেখুন</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Video reward interactive modal playback with 10s countdown constraint */}
      <AnimatePresence>
        {activePlayTask && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-stone-900 border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl space-y-4"
            >
              {/* Head stream bar */}
              <div className="bg-red-600 py-3 px-4 flex items-center justify-between text-white border-b border-stone-800">
                <div className="flex items-center space-x-2">
                  <Youtube className="w-5 h-5 text-stone-100 fill-white animate-pulse" />
                  <span className="text-xs font-bold font-mono tracking-wide">AS REWARD SYSTEM STREAMING</span>
                </div>
                <div className="bg-stone-950/80 px-2.5 py-1 rounded text-red-500 font-mono text-xs font-black animate-pulse flex items-center space-x-1">
                  <span>কাউন্টডাউন: {countdown} সে.</span>
                </div>
              </div>

              {/* Simulated Embedded Video Screen with actual youtube embed link to look dynamic */}
              <div className="p-4 space-y-4">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-stone-800 shadow-inner group">
                  <iframe
                    src={`${activePlayTask.videoUrl}?autoplay=1&mute=1&controls=0&modestbranding=1`}
                    title="Active Task Screen Player"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Lock overlying layer if countdown is active */}
                  {countdown > 0 && (
                    <div className="absolute top-3 left-3 bg-stone-950/80 text-stone-200 border border-stone-800 text-[10px] px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <Lock className="w-3.5 h-3.5 text-yellow-500" />
                      <span>ভিডিও চলাকালীন পেজ পরিবর্তন করবেন না</span>
                    </div>
                  )}
                </div>

                {/* Sub title info and claiming button */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-stone-200">{activePlayTask.title}</h4>
                    <p className="text-xs text-stone-400 mt-1">রেওয়ার্ড পেতে অন্তত ১০ সেকেন্ড ভিডিওটি চলতে দিন। সময় শেষ হওয়ার সাথে সাথে লাল ক্লেম বাটনটি চাপুন।</p>
                  </div>

                  <div className="bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-lg text-emerald-400 text-xs flex items-center space-x-2">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span>সাফলতার সাথে ভিডিওটি দেখছেন! ৬০ টাকা আপনার প্রোফাইলে অ্যাড হতে যাচ্ছে।</span>
                  </div>

                  <div className="flex justify-end space-x-3 pt-2">
                    {hasCompletedActive ? (
                      <button
                        onClick={handleClaimReward}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all animate-bounce flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>৬০ টাকা দাবি করুন (Claim Reward)</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-stone-800 border border-stone-700 text-stone-500 cursor-not-allowed font-medium text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2"
                      >
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>ভিডিও দেখুন ({countdown} সেকেন্ড বাকি)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
