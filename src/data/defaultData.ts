/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelPackage, Task, WorkerPerson } from '../types';

export const LEVEL_PACKAGES: LevelPackage[] = [
  {
    id: 'pkg_300',
    name: 'ব্রোঞ্জ ৩০০',
    priceBDT: 300,
    dailyTasksCount: 2,
    validityDays: 30,
    description: 'দৈনিক ২টি ভিডিও টাস্ক কমপ্লিট করার সুযোগ। প্রতিটি ভিডিও টাস্ক ৬০ টাকা!',
    color: '#CD7F32'
  },
  {
    id: 'pkg_500',
    name: 'সিলভার ৫০০',
    priceBDT: 500,
    dailyTasksCount: 4,
    validityDays: 35,
    description: 'দৈনিক ৪টি ভিডিও টাস্ক কমপ্লিট করার সুযোগ। প্রতিটি ভিডিও টাস্ক ৬০ টাকা!',
    color: '#C0C0C0'
  },
  {
    id: 'pkg_1000',
    name: 'গোল্ড ১০০০',
    priceBDT: 1000,
    dailyTasksCount: 6,
    validityDays: 40,
    description: 'দৈনিক ৬টি ভিডিও টাস্ক কমপ্লিট করার সুযোগ। প্রতিটি ভিডিও টাস্ক ৬০ টাকা!',
    color: '#FFD700'
  },
  {
    id: 'pkg_1500',
    name: 'প্লাটিনাম ১৫০০',
    priceBDT: 1500,
    dailyTasksCount: 8,
    validityDays: 45,
    description: 'দৈনিক ৮টি ভিডিও টাস্ক কমপ্লিট করার সুযোগ। প্রতিটি ভিডিও টাস্ক ৬০ টাকা!',
    color: '#E5E4E2'
  },
  {
    id: 'pkg_2000',
    name: 'ডায়মন্ড ২০০০',
    priceBDT: 2000,
    dailyTasksCount: 10,
    validityDays: 50,
    description: 'দৈনিক ১০টি ভিডিও টাস্ক কমপ্লিট করার সুযোগ। প্রতিটি ভিডিও টাস্ক ৬০ টাকা!',
    color: '#B9F2FF'
  },
  {
    id: 'pkg_2500',
    name: 'এলিট ২৫০০',
    priceBDT: 2500,
    dailyTasksCount: 12,
    validityDays: 60,
    description: 'দৈনিক ১২টি ভিডিও টাস্ক কমপ্লিট করার সুযোগ। প্রতিটি ভিডিও টাস্ক ৬০ টাকা!',
    color: '#4B0082'
  },
  {
    id: 'pkg_3000',
    name: 'মাস্টার ৩০০০',
    priceBDT: 3000,
    dailyTasksCount: 15,
    validityDays: 60,
    description: 'দৈনিক ১৫টি পর্যন্ত হাই-পেইড কাজ। আকর্ষণীয় আর্নিং রেট ও দ্রুত প্রত্যাহার!',
    color: '#800020'
  },
  {
    id: 'pkg_3500',
    name: 'ভিপ ৩২০০',
    priceBDT: 3500,
    dailyTasksCount: 18,
    validityDays: 75,
    description: 'দৈনিক ১৮টি ভিডিও টাস্ক। আনলিমিটেড সাপোর্ট এবং ফাস্ট উইথড্রয়াল!',
    color: '#FF007F'
  },
  {
    id: 'pkg_4000',
    name: 'লিজেন্ড ৪০০০',
    priceBDT: 4000,
    dailyTasksCount: 22,
    validityDays: 80,
    description: 'দৈনিক ২২টি ভিডিও টাস্ক কমপ্লিট করার সুযোগ। ফ্রি প্রিমিয়াম সাপোর্ট!',
    color: '#FF4500'
  },
  {
    id: 'pkg_4500',
    name: 'রয়্যাল ৪৫০০',
    priceBDT: 4500,
    dailyTasksCount: 26,
    validityDays: 90,
    description: 'দৈনিক ২৬টি ভিডিও টাস্ক। সর্বোচ্চ বোনাস অফার এবং ডেডিকেটেড ম্যানেজার!',
    color: '#9370DB'
  },
  {
    id: 'pkg_5000',
    name: 'আল্টিমেট ৫০০০',
    priceBDT: 5000,
    dailyTasksCount: 30,
    validityDays: 100,
    description: 'দৈনিক ৩০টি ভিডিও টাস্ক এবং লাইফটাইম রেফারেল কমিশন বোনাস!',
    color: '#FF8C00'
  }
];

export const DEFAULT_TASKS: Task[] = [
  {
    id: 'task_1',
    title: 'অনলাইন আর্নিং বাংলা টিউটোরিয়াল ২০২৬ (পর্ব ০১)',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Dummy embedded URL (safe & reliable play link)
    rewardUSD: 0.50,
    rewardBDT: 60,
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400',
    durationSeconds: 10 // Quick and ultra responsive 10s wait for demonstration
  },
  {
    id: 'task_2',
    title: 'ইউটিউব মার্কেটিং এবং ভিডিও মেকিং টিপস',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rewardUSD: 0.50,
    rewardBDT: 60,
    thumbnail: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&q=80&w=400',
    durationSeconds: 10
  },
  {
    id: 'task_3',
    title: 'এসইও এবং কিওয়ার্ড রিসার্চ গাইডলাইন ২০২৬',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rewardUSD: 0.50,
    rewardBDT: 60,
    thumbnail: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=400',
    durationSeconds: 10
  },
  {
    id: 'task_4',
    title: 'বিকাশ ও রকেট পেমেন্ট গেটওয়ে ইন্টিগ্রেশন টিউটোরিয়াল',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rewardUSD: 0.50,
    rewardBDT: 60,
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=400',
    durationSeconds: 10
  },
  {
    id: 'task_5',
    title: 'ফ্রিল্যান্সিং ক্যারিয়ার কিভাবে শুরু করবেন?',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rewardUSD: 0.50,
    rewardBDT: 60,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
    durationSeconds: 10
  },
  {
    id: 'task_6',
    title: 'ডিজিটাল প্রোডাক্ট সেলিং এবং ড্রপশিপিং আইডিয়া',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rewardUSD: 0.50,
    rewardBDT: 60,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    durationSeconds: 10
  }
];

export const WORKER_PEOPLE: WorkerPerson[] = [
  {
    id: 'worker_1',
    name: 'SI Raju',
    contactGmail: 'rajuahmed27540@gmail.com',
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=450',
    address: 'Ashkona, Hajj Camp, Airport, Dhaka',
    totalEarningsBDT: 24500,
    joinedDate: '2026-03-12',
    role: 'প্রিমিয়াম মেম্বার'
  },
  {
    id: 'worker_2',
    name: 'এইচ মাসুদ',
    contactGmail: 'masud88@gmail.com',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    address: 'মিরপুর ১০, ঢাকা',
    totalEarningsBDT: 18400,
    joinedDate: '2026-04-01',
    role: 'সিলভার মেম্বার'
  },
  {
    id: 'worker_3',
    name: 'তামান্না ইসলাম',
    contactGmail: 'tamanna.islam3@gmail.com',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    address: 'মতিঝিল, ঢাকা',
    totalEarningsBDT: 31200,
    joinedDate: '2026-01-20',
    role: 'গোল্ড মেম্বার'
  },
  {
    id: 'worker_4',
    name: 'আরিফুল রহমান',
    contactGmail: 'arif_dhaka@gmail.com',
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    address: 'উত্তরা সেক্টর ৭, ঢাকা',
    totalEarningsBDT: 12500,
    joinedDate: '2026-05-15',
    role: 'ব্রোঞ্জ মেম্বার'
  },
  {
    id: 'worker_5',
    name: 'সানজিদা খাতুন',
    contactGmail: 'sanjida99@gmail.com',
    profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    address: 'ধানমন্ডি ৩২, ঢাকা',
    totalEarningsBDT: 42000,
    joinedDate: '2026-01-05',
    role: 'রয়্যাল লেভেল এলিট'
  },
  {
    id: 'worker_6',
    name: 'এমডি শাহিন',
    contactGmail: 'shahinmiah@gmail.com',
    profilePic: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    address: 'বনানী, ঢাকা',
    totalEarningsBDT: 9500,
    joinedDate: '2026-06-02',
    role: 'বেসিক মেম্বার'
  }
];
