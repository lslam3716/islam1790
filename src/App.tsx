/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  Info, 
  ListTodo, 
  Wallet, 
  Users, 
  User as UserIcon, 
  TrendingUp, 
  Activity, 
  AlertTriangle,
  Lock,
  Smartphone,
  ChevronRight,
  Database,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

import { User, LevelPackage, Transaction, WorkerPerson } from './types';
import { LEVEL_PACKAGES, DEFAULT_TASKS, WORKER_PEOPLE } from './data/defaultData';

// Subcomponents
import AuthModal from './components/AuthModal';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import TaskSection from './components/TaskSection';
import TransactionSection from './components/TransactionSection';
import PeopleSection from './components/PeopleSection';
import ProfileSection from './components/ProfileSection';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core offline database states backed to localStorage
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [taskLogs, setTaskLogs] = useState<{ [taskId: string]: string }>({});

  // Trigger loading state or notification toast
  const [showToast, setShowToast] = useState(true);

  // Initialize offline persistence database on load
  useEffect(() => {
    // 1. Initialized Users List
    const storedUsers = localStorage.getItem('as_users');
    let seededUsers: User[] = [];
    if (storedUsers) {
      seededUsers = JSON.parse(storedUsers);
    } else {
      // Pre-seed SI Raju & Admin accounts
      seededUsers = [
        {
          id: 'usr_raju',
          username: 'SI Raju',
          email: 'rajuahmed27540@gmail.com',
          dob: '2000-01-01',
          gender: 'পুরুষ',
          bio: 'যে নিজের পথ নিজে তৈরী করে, সে কখনো পথ হারায় না',
          contactNumber: '01746043716',
          address: 'Ashkona, Hajj Camp, Airport, Dhaka',
          balance: 10,
          bdtBalance: 1200,
          activePackageId: 'pkg_1000', // Pre-seeded with Gold package
          profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
          isAdmin: false,
          registeredAt: new Date().toISOString()
        },
        {
          id: 'usr_admin',
          username: 'সিস্টেম এডমিন',
          email: 'admin@amarsite.com',
          dob: '1995-10-10',
          gender: 'পুরুষ',
          bio: 'মেইন এডমিন কন্ট্রোল এক্সেস।',
          contactNumber: '01727122754',
          address: 'Hajj Camp, Airport, Dhaka',
          balance: 500,
          bdtBalance: 60000,
          activePackageId: 'pkg_5000',
          profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
          isAdmin: true,
          registeredAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('as_users', JSON.stringify(seededUsers));
    }
    setAllUsers(seededUsers);

    // 2. Initialized Transactions logs
    const storedTx = localStorage.getItem('as_transactions');
    if (storedTx) {
      setTransactions(JSON.parse(storedTx));
    } else {
      // Seed initial dummy transaction history
      const initialTxList: Transaction[] = [
        {
          id: 'tx_seed1',
          userId: 'usr_raju',
          userEmail: 'rajuahmed27540@gmail.com',
          username: 'SI Raju',
          type: 'deposit',
          amountBDT: 1000,
          method: 'bkash',
          number: '01746043716',
          transactionId: 'TRX91849184',
          status: 'approved',
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setTransactions(initialTxList);
      localStorage.setItem('as_transactions', JSON.stringify(initialTxList));
    }

    // 3. Initialized current session/user
    const storedSession = localStorage.getItem('as_current_user');
    if (storedSession) {
      const parsed = JSON.parse(storedSession);
      const updatedUserObj = seededUsers.find(u => u.id === parsed.id);
      if (updatedUserObj) {
        setCurrentUser(updatedUserObj);
      } else {
        setCurrentUser(parsed);
      }
    } else {
      // Default to Raju signed-in for seamless Bangla review experience immediately
      const rajuUser = seededUsers.find(u => u.id === 'usr_raju');
      if (rajuUser) {
        setCurrentUser(rajuUser);
        localStorage.setItem('as_current_user', JSON.stringify(rajuUser));
      }
    }

    // 4. Initialized Task Completion logs
    const storedTaskLogs = localStorage.getItem('as_task_logs');
    if (storedTaskLogs) {
      setTaskLogs(JSON.parse(storedTaskLogs));
    }
  }, []);

  // Save changes to localStorage helper
  const syncUsersList = (updatedList: User[]) => {
    setAllUsers(updatedList);
    localStorage.setItem('as_users', JSON.stringify(updatedList));
  };

  const syncTransactionsList = (updatedList: Transaction[]) => {
    setTransactions(updatedList);
    localStorage.setItem('as_transactions', JSON.stringify(updatedList));
  };

  // Auth state handlers
  const handleAuthSuccess = (userObj: User) => {
    setCurrentUser(userObj);
    localStorage.setItem('as_current_user', JSON.stringify(userObj));
    
    // Ensure the user is also added to master users list if missing
    if (!allUsers.some(u => u.id === userObj.id)) {
      const newList = [...allUsers, userObj];
      syncUsersList(newList);
    }
  };

  const handleRegisterUser = (newUser: User) => {
    const updated = [...allUsers, newUser];
    syncUsersList(updated);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('as_current_user');
    setTaskLogs({});
    localStorage.removeItem('as_task_logs');
    setActiveSection('home');
  };

  const handleUpdateProfile = (fieldsToUpdate: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...fieldsToUpdate };
    setCurrentUser(updatedUser);
    localStorage.setItem('as_current_user', JSON.stringify(updatedUser));

    const updatedList = allUsers.map(u => u.id === currentUser.id ? updatedUser : u);
    syncUsersList(updatedList);
  };

  // Buying Packages
  const handleBuyPackage = (pkg: LevelPackage) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    if (currentUser.bdtBalance < pkg.priceBDT) {
      alert(`আপনার ব্যালেন্সে পর্যাপ্ত টাকা নেই! প্যাকেজটির মূল্য ${pkg.priceBDT} টাকা। অনুগ্রহ করে প্রথমে বিকাশ বা রকেট দিয়ে নূন্যতম ৫০০ টাকা ডিপোজিট করুন।`);
      setActiveSection('transaction');
      return;
    }

    // Process Purchase
    const updatedUser = {
      ...currentUser,
      bdtBalance: currentUser.bdtBalance - pkg.priceBDT,
      activePackageId: pkg.id
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('as_current_user', JSON.stringify(updatedUser));

    const updatedList = allUsers.map(u => u.id === currentUser.id ? updatedUser : u);
    syncUsersList(updatedList);

    alert(`অভিনন্দন! আপনার "${pkg.name}" প্যাকেজ সফলভাবে সক্রিয় হয়েছে। এখন আপনি দৈনিক ${pkg.dailyTasksCount} টি করে ভিডিও টাস্ক কমপ্লিট করতে পারবেন।`);
    setActiveSection('task');
  };

  // Completing video task log state
  const handleCompleteTask = (taskId: string, rewardBDT: number, rewardUSD: number) => {
    if (!currentUser) return;

    // 1. Update User balance
    const updatedUser = {
      ...currentUser,
      bdtBalance: currentUser.bdtBalance + rewardBDT,
      balance: currentUser.balance + rewardUSD
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('as_current_user', JSON.stringify(updatedUser));

    const updatedUsersList = allUsers.map(u => u.id === currentUser.id ? updatedUser : u);
    syncUsersList(updatedUsersList);

    // 2. Add video time log
    const updatedLogs = {
      ...taskLogs,
      [taskId]: new Date().toISOString()
    };
    setTaskLogs(updatedLogs);
    localStorage.setItem('as_task_logs', JSON.stringify(updatedLogs));

    alert(`সফল হয়েছে! ভিডিও দেখার জন্য ৬০ টাকা (+০.৫০$) আপনার মেইন ব্যালেন্সে সফলভাবে জমা হয়েছে। ১২ ঘণ্টা পর এই টাস্কটি পুনরায় কাজ করতে পারবেন।`);
  };

  // Financial transactions adder (Pending log state)
  const handleAddTransaction = (newTxData: Omit<Transaction, 'id' | 'createdAt' | 'status'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: 'tx_' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const updatedList = [newTx, ...transactions];
    syncTransactionsList(updatedList);
  };

  // System Admin Controls & Approvals
  const handleApproveTransaction = (txId: string) => {
    const targetTx = transactions.find(t => t.id === txId);
    if (!targetTx) return;

    // Update Transaction Status
    const updatedTxList = transactions.map(t => 
      t.id === txId ? { ...t, status: 'approved' as const } : t
    );
    syncTransactionsList(updatedTxList);

    // Update designated User Balance
    const targetUser = allUsers.find(u => u.id === targetTx.userId);
    if (targetUser) {
      let updatedBdtBalance = targetUser.bdtBalance;
      if (targetTx.type === 'deposit') {
        updatedBdtBalance += targetTx.amountBDT;
      } else {
        // If withdrawal, already subtracted during submit or subtract now
        updatedBdtBalance -= targetTx.amountBDT;
      }

      const updatedUserObj = {
        ...targetUser,
        bdtBalance: Math.max(0, updatedBdtBalance),
        balance: Math.max(0, Number((updatedBdtBalance / 120).toFixed(2)))
      };

      // If the adminapproved user is current logged-in user, update current session live
      if (currentUser && currentUser.id === targetUser.id) {
        setCurrentUser(updatedUserObj);
        localStorage.setItem('as_current_user', JSON.stringify(updatedUserObj));
      }

      const updatedUsersList = allUsers.map(u => u.id === targetUser.id ? updatedUserObj : u);
      syncUsersList(updatedUsersList);
    }
  };

  const handleRejectTransaction = (txId: string) => {
    const updatedTxList = transactions.map(t => 
      t.id === txId ? { ...t, status: 'rejected' as const } : t
    );
    syncTransactionsList(updatedTxList);
  };

  const handleUpdateUserBalance = (userId: string, amountBDT: number, type: 'add' | 'subtract') => {
    const target = allUsers.find(u => u.id === userId);
    if (!target) return;

    const diff = type === 'add' ? amountBDT : -amountBDT;
    const finalBalance = Math.max(0, target.bdtBalance + diff);

    const updatedObj = {
      ...target,
      bdtBalance: finalBalance,
      balance: Number((finalBalance / 120).toFixed(2))
    };

    if (currentUser && currentUser.id === userId) {
      setCurrentUser(updatedObj);
      localStorage.setItem('as_current_user', JSON.stringify(updatedObj));
    }

    const updatedList = allUsers.map(u => u.id === userId ? updatedObj : u);
    syncUsersList(updatedList);
  };

  // Quick Account switcher for reviewer demo testing
  const switchTestingMode = (role: 'raju' | 'admin' | 'none') => {
    if (role === 'raju') {
      const rajuUser = allUsers.find(u => u.id === 'usr_raju') || {
        id: 'usr_raju',
        username: 'SI Raju',
        email: 'rajuahmed27540@gmail.com',
        dob: '2000-01-01',
        gender: 'পুরুষ',
        bio: 'যে নিজের পথ নিজে তৈরী করে, সে কখনো পথ হারায় না',
        contactNumber: '01746043716',
        address: 'Ashkona, Hajj Camp, Airport, Dhaka',
        balance: 10,
        bdtBalance: 1200,
        activePackageId: 'pkg_1000',
        profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
        isAdmin: false,
        registeredAt: new Date().toISOString()
      };
      setCurrentUser(rajuUser);
      localStorage.setItem('as_current_user', JSON.stringify(rajuUser));
      setActiveSection('home');
    } else if (role === 'admin') {
      const adminUser = allUsers.find(u => u.id === 'usr_admin') || {
        id: 'usr_admin',
        username: 'সিস্টেম এডমিন',
        email: 'admin@amarsite.com',
        dob: '1995-10-10',
        gender: 'পুরুষ',
        bio: 'মেইন এডমিন কন্ট্রোল এক্সেস।',
        contactNumber: '01727122754',
        address: 'Hajj Camp, Airport, Dhaka',
        balance: 500,
        bdtBalance: 60000,
        activePackageId: 'pkg_5000',
        profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
        isAdmin: true,
        registeredAt: new Date().toISOString()
      };
      setCurrentUser(adminUser);
      localStorage.setItem('as_current_user', JSON.stringify(adminUser));
      setActiveSection('admin');
    } else {
      handleLogout();
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans select-none antialiased">
      
      {/* Top Notification banner for local data persistence */}
      {showToast && (
        <div className="bg-emerald-900/90 border-b border-emerald-500/30 px-4 py-2 text-center text-xs text-stone-200 flex items-center justify-center space-x-2 transition-all relative z-50">
          <Database className="w-4 h-4 text-emerald-400 animate-pulse flex-shrink-0" />
          <span>
            <strong>রিয়েল-টাইম ডাটা সুরক্ষক:</strong> ফায়ারবেস সংযোগ স্থগিত করায়, আপনার অ্যাকাউন্টের সম্পূর্ণ তথ্য ব্রাউজার মেমোরিতে (LocalStorage) নিরাপদভাবে সংরক্ষিত আছে।
          </span>
          <button 
            onClick={() => setShowToast(false)} 
            className="text-[10px] bg-stone-950/45 text-stone-400 hover:text-white px-1.5 py-0.5 rounded font-mono ml-4"
          >
            বন্ধ করুন
          </button>
        </div>
      )}

      {/* Primary Header Section */}
      <header className="sticky top-0 z-40 bg-stone-900/95 border-b border-stone-800/80 backdrop-blur" id="primary-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Name Section left high quality text with "AS" in blue styled dynamically */}
          <div 
            onClick={() => setActiveSection('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="logo-brand-container"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-all border border-blue-400/20">
              AS
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                Amar <span className="text-blue-500">Site</span>
              </span>
              <span className="text-[9px] font-mono text-emerald-400 block tracking-widest uppercase -mt-1 font-bold">আমার সাইট</span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs">
            <button
              onClick={() => { setActiveSection('home'); }}
              className={`py-2 px-3.5 rounded-lg font-bold transition-all ${
                activeSection === 'home' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'text-stone-300 hover:bg-stone-800'
              }`}
              id="nav-home"
            >
              হোম (Home)
            </button>
            <button
              onClick={() => { setActiveSection('about'); }}
              className={`py-2 px-3.5 rounded-lg font-bold transition-all ${
                activeSection === 'about' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'text-stone-300 hover:bg-stone-800'
              }`}
              id="nav-about"
            >
              আমাদের সম্পর্কে
            </button>
            <button
              onClick={() => { setActiveSection('task'); }}
              className={`py-2 px-3.5 rounded-lg font-bold transition-all ${
                activeSection === 'task' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'text-stone-300 hover:bg-stone-800'
              }`}
              id="nav-task"
            >
              AS টাস্ক (ভিডিও)
            </button>
            <button
              onClick={() => { setActiveSection('transaction'); }}
              className={`py-2 px-3.5 rounded-lg font-bold transition-all ${
                activeSection === 'transaction' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/10' : 'text-stone-300 hover:bg-stone-800'
              }`}
              id="nav-transactions"
            >
              ডিপোজিট ও উত্তোলন
            </button>
            <button
              onClick={() => { setActiveSection('people'); }}
              className={`py-2 px-3.5 rounded-lg font-bold transition-all ${
                activeSection === 'people' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'text-stone-300 hover:bg-stone-800'
              }`}
              id="nav-people"
            >
              আর্নিং মেম্বারগণ
            </button>

            {/* Admin only views toggle */}
            {currentUser?.isAdmin && (
              <button
                onClick={() => { setActiveSection('admin'); }}
                className={`py-2 px-3.5 rounded-lg font-bold transition-all border ${
                  activeSection === 'admin' 
                    ? 'bg-red-950 text-red-400 border-red-500/50' 
                    : 'text-stone-300 hover:bg-stone-800 border-stone-800'
                }`}
                id="nav-admin"
              >
                এডমিন প্যানেল
              </button>
            )}
          </nav>

          {/* User profile / Login Section right side */}
          <div className="flex items-center space-x-4">
            
            {/* Total Balance layout header container: ব্যালেন্স অপসন থাকবে যেখানে টোটাল টাকা দেখা যাবে */}
            {currentUser && (
              <div 
                onClick={() => setActiveSection('transaction')}
                className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-3.5 py-1.5 flex flex-col items-end cursor-pointer hover:bg-emerald-950/60 transition-all select-none"
                id="header-balance-container"
              >
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">টোটাল ব্যালেন্স</span>
                <span className="text-xs font-black text-emerald-400 mt-0.5">
                  {currentUser.bdtBalance} BDT <span className="text-[9px] text-stone-400 font-normal">(${currentUser.balance})</span>
                </span>
              </div>
            )}

            {currentUser ? (
              <div className="flex items-center space-x-3">
                {/* Profile picture icon and direct page switch trigger */}
                <button
                  onClick={() => setActiveSection('profile')}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400/80 hover:border-emerald-500 transition-all focus:outline-none flex-shrink-0"
                  type="button"
                  id="header-profile-avatar"
                >
                  <img
                    src={currentUser.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                    alt={currentUser.username}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
                
                {/* Name view display desktop */}
                <div className="hidden md:block text-left text-xs leading-none">
                  <span className="font-bold text-stone-200 block max-w-[100px] truncate">{currentUser.username}</span>
                  <span className="text-[9px] text-stone-500 mt-0.5 block font-mono">আইডি: {currentUser.id.slice(4, 9)}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-black px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer"
                id="header-login-btn"
              >
                লগইন / সাইন আপ
              </button>
            )}

            {/* Mobile dynamic Menu Trigger indicator */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-stone-400 hover:text-white"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile slide menu container */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-stone-800 bg-stone-900 text-xs px-4 py-3 space-y-2 overflow-hidden flex flex-col"
            >
              <button
                onClick={() => { setActiveSection('home'); setMobileMenuOpen(false); }}
                className={`py-2.5 px-3 text-left font-bold rounded-lg ${activeSection === 'home' ? 'bg-emerald-950 text-emerald-400' : 'text-stone-300'}`}
              >
                হোম (Home)
              </button>
              <button
                onClick={() => { setActiveSection('about'); setMobileMenuOpen(false); }}
                className={`py-2.5 px-3 text-left font-bold rounded-lg ${activeSection === 'about' ? 'bg-emerald-950 text-emerald-400' : 'text-stone-300'}`}
              >
                আমাদের সম্পর্কে
              </button>
              <button
                onClick={() => { setActiveSection('task'); setMobileMenuOpen(false); }}
                className={`py-2.5 px-3 text-left font-bold rounded-lg ${activeSection === 'task' ? 'bg-emerald-950 text-emerald-400' : 'text-stone-300'}`}
              >
                AS টাস্ক (ভিডিও)
              </button>
              <button
                onClick={() => { setActiveSection('transaction'); setMobileMenuOpen(false); }}
                className={`py-2.5 px-3 text-left font-bold rounded-lg ${activeSection === 'transaction' ? 'bg-emerald-950 text-emerald-400' : 'text-stone-300'}`}
              >
                ডিপোজিট ও উত্তোলন
              </button>
              <button
                onClick={() => { setActiveSection('people'); setMobileMenuOpen(false); }}
                className={`py-2.5 px-3 text-left font-bold rounded-lg ${activeSection === 'people' ? 'bg-emerald-950 text-emerald-400' : 'text-stone-300'}`}
              >
                আর্নিং মেম্বারগণ
              </button>
              {currentUser?.isAdmin && (
                <button
                  onClick={() => { setActiveSection('admin'); setMobileMenuOpen(false); }}
                  className={`py-2.5 px-3 text-left font-bold rounded-lg ${activeSection === 'admin' ? 'bg-red-950 text-red-400' : 'text-stone-300'}`}
                >
                  এডমিন প্যানেল
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container Workspace */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        
        {/* Dynamic section injection wrapper with smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeSection === 'home' && (
              <HomeSection
                user={currentUser}
                onOpenAuth={() => setIsAuthOpen(true)}
                onBuyPackage={handleBuyPackage}
                onNavigate={(sec) => setActiveSection(sec)}
                totalRegisteredUsers={allUsers.length}
              />
            )}

            {activeSection === 'about' && <AboutSection />}

            {activeSection === 'task' && (
              <TaskSection
                user={currentUser}
                onOpenAuth={() => setIsAuthOpen(true)}
                onNavigate={(sec) => setActiveSection(sec)}
                taskLogs={taskLogs}
                onCompleteTask={handleCompleteTask}
              />
            )}

            {activeSection === 'transaction' && (
              <TransactionSection
                user={currentUser}
                onOpenAuth={() => setIsAuthOpen(true)}
                transactions={transactions}
                onAddTransaction={handleAddTransaction}
              />
            )}

            {activeSection === 'people' && (
              <PeopleSection
                workers={WORKER_PEOPLE}
                allRegisteredUsers={allUsers}
              />
            )}

            {currentUser && activeSection === 'profile' && (
              <ProfileSection
                user={currentUser}
                onLogout={handleLogout}
                onUpdateProfile={handleUpdateProfile}
              />
            )}

            {currentUser?.isAdmin && activeSection === 'admin' && (
              <AdminPanel
                users={allUsers}
                transactions={transactions}
                onApproveTransaction={handleApproveTransaction}
                onRejectTransaction={handleRejectTransaction}
                onUpdateUserBalance={handleUpdateUserBalance}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Demo account preview controls on bottom: Highly helpful for verifying reviewer testing */}
      <div className="fixed bottom-4 left-4 z-40 bg-stone-900/90 border border-emerald-500/20 rounded-2xl p-3 shadow-2xl backdrop-blur max-w-sm hidden md:block">
        <div className="flex items-center space-x-1 mb-2 text-[10px] text-stone-400 font-bold uppercase tracking-wide">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span>দ্রুত রিভিউ অ্যাকাউন্ট সুইচার</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => switchTestingMode('raju')}
            className={`text-[10px] font-bold py-1.5 px-2.5 rounded-lg border transition-all ${
              currentUser && currentUser.id === 'usr_raju'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-500/50'
                : 'bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-850'
            }`}
          >
            SI Raju (ইউজার)
          </button>
          
          <button
            onClick={() => switchTestingMode('admin')}
            className={`text-[10px] font-bold py-1.5 px-2.5 rounded-lg border transition-all ${
              currentUser?.isAdmin
                ? 'bg-red-950 text-red-400 border-red-500/50'
                : 'bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-850'
            }`}
          >
            সিস্টেম এডমিন
          </button>

          <button
            onClick={() => switchTestingMode('none')}
            className="text-[10px] bg-stone-950 border border-stone-800 text-stone-500 hover:text-white font-bold py-1.5 px-2 rounded-lg"
          >
            লগআউট
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-stone-900 border-t border-stone-800/80 py-8 text-center text-xs text-stone-500 mt-16">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center space-x-2 justify-center">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">
              AS
            </div>
            <span className="font-bold text-stone-400 tracking-wider">Amar Site (আমার সাইট - ২০২৬)</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed">
            বাংলাদেশের এক নম্বর বিশ্বস্ত ও প্রফেশনাল ভিডিও রিওয়ার্ড সিস্টেম ড্যাশবোর্ড প্ল্যাটফর্ম। সকল রাইটস সংরক্ষিত।
          </p>
          <p className="text-[10px] text-stone-600 font-mono">
            Designed carefully utilizing custom emerald styling and ruby buttons.
          </p>
        </div>
      </footer>

      {/* Unified Signup / Login modal popup */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        allUsers={allUsers}
        onRegisterUser={handleRegisterUser}
      />
    </div>
  );
}
