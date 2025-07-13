import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Heart,
  Trophy,
  Flame,
  Target,
  Users,
  Calendar,
  TrendingUp,
  Gift,
  Star,
  Medal,
  Zap,
  Award,
  ChevronRight,
  Info,
  X,
  Share2,
  Download,
  Eye,
  EyeOff,
  Activity,
  Wallet,
  Shield,
  Sparkles,
  Rocket,
  Crown,
  ChevronDown,
  Plus,
  Minus,
  BarChart3,
  Globe,
  Lock,
  Unlock
} from 'lucide-react';

const levelTitles = [
  "Newcomer", "Helper", "Supporter", "Contributor", "Advocate", 
  "Champion", "Hero", "Legend", "Guardian", "Savior"
];

const achievements = [
  {
    id: 1,
    title: "First Donation",
    description: "Made your first donation to a campaign",
    icon: Heart,
    rarity: "common" as const,
    unlocked: true,
    xp: 100,
    unlockedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Streak Master",
    description: "Maintained a 7-day donation streak",
    icon: Flame,
    rarity: "rare" as const,
    unlocked: true,
    xp: 500,
    unlockedAt: "2024-02-01"
  },
  {
    id: 3,
    title: "Campaign Sharer",
    description: "Shared 3 campaigns with friends",
    icon: Share2,
    rarity: "epic" as const,
    unlocked: false,
    xp: 1000,
    progress: 33
  },
  {
    id: 4,
    title: "Top Contributor",
    description: "Ranked in top 10 donors this month",
    icon: Crown,
    rarity: "legendary" as const,
    unlocked: false,
    xp: 2000,
    progress: 0
  }
];

const rarityColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-yellow-600"
};

const leaderboardData = [
  { rank: 1, name: "Alex Chen", donations: 45, totalAmount: 12450, xp: 8900, level: 8, streak: 15 },
  { rank: 2, name: "Sarah Johnson", donations: 38, totalAmount: 9800, xp: 7200, level: 7, streak: 12 },
  { rank: 3, name: "Michael Rodriguez", donations: 32, totalAmount: 8200, xp: 6100, level: 6, streak: 8 },
  { rank: 4, name: "Emma Wilson", donations: 28, totalAmount: 7100, xp: 5400, level: 6, streak: 5 },
  { rank: 5, name: "David Kim", donations: 25, totalAmount: 6500, xp: 4800, level: 5, streak: 10 },
  { rank: 6, name: "You", donations: 22, totalAmount: 5800, xp: 4200, level: 5, streak: 7 },
  { rank: 7, name: "Lisa Anderson", donations: 20, totalAmount: 5200, xp: 3900, level: 4, streak: 3 },
  { rank: 8, name: "James Thompson", donations: 18, totalAmount: 4700, xp: 3500, level: 4, streak: 6 },
  { rank: 9, name: "Maria Garcia", donations: 15, totalAmount: 4100, xp: 3000, level: 4, streak: 4 },
  { rank: 10, name: "Ryan Lee", donations: 12, totalAmount: 3600, xp: 2700, level: 3, streak: 2 }
];

const activityData = [
  { type: "donation", campaign: "Help Build School", amount: 250, date: "2024-07-10", xp: 25 },
  { type: "achievement", title: "Streak Master", date: "2024-07-09", xp: 500 },
  { type: "donation", campaign: "Medical Fund", amount: 100, date: "2024-07-08", xp: 10 },
  { type: "share", campaign: "Community Garden", date: "2024-07-07", xp: 50 },
  { type: "donation", campaign: "Animal Rescue", amount: 75, date: "2024-07-06", xp: 8 },
  { type: "donation", campaign: "Disaster Relief", amount: 500, date: "2024-07-05", xp: 50 }
];

const DonorProfile = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showXpModal, setShowXpModal] = useState(false);
  const [userXp, setUserXp] = useState(4200);
  const [userLevel, setUserLevel] = useState(5);
  const [userStreak, setUserStreak] = useState(7);
  const [totalDonations, setTotalDonations] = useState(22);
  const [totalAmount, setTotalAmount] = useState(5800);
  const [showPrivateProfile, setShowPrivateProfile] = useState(false);

  const currentLevelXp = useMemo(() => userLevel * 1000, [userLevel]);
  const nextLevelXp = useMemo(() => (userLevel + 1) * 1000, [userLevel]);
  const progressPercentage = useMemo(() => {
    const currentProgress = userXp - currentLevelXp;
    const levelRange = nextLevelXp - currentLevelXp;
    return Math.min((currentProgress / levelRange) * 100, 100);
  }, [userXp, currentLevelXp, nextLevelXp]);

  const unlockedAchievements = useMemo(() => achievements.filter(a => a.unlocked), []);
  const lockedAchievements = useMemo(() => achievements.filter(a => !a.unlocked), []);

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-300">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
              <p className="text-gray-300">Level {userLevel} {levelTitles[userLevel - 1]}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPrivateProfile(!showPrivateProfile)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-300 hover:bg-white/20 transition-all"
            >
              {showPrivateProfile ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPrivateProfile ? 'Private' : 'Public'}
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              Connect Wallet
            </button>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Progress to Level {userLevel + 1}</h3>
            <button
              onClick={() => setShowXpModal(true)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <span>{userXp} XP</span>
            <span>{nextLevelXp} XP</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mt-8 overflow-x-auto pb-2">
          <TabButton
            id="overview"
            label="Overview"
            icon={BarChart3}
            isActive={selectedTab === 'overview'}
            onClick={setSelectedTab}
          />
          <TabButton
            id="achievements"
            label="Achievements"
            icon={Trophy}
            isActive={selectedTab === 'achievements'}
            onClick={setSelectedTab}
          />
          <TabButton
            id="activity"
            label="Activity"
            icon={Activity}
            isActive={selectedTab === 'activity'}
            onClick={setSelectedTab}
          />
          <TabButton
            id="leaderboard"
            label="Leaderboard"
            icon={Medal}
            isActive={selectedTab === 'leaderboard'}
            onClick={setSelectedTab}
          />
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Donations"
                  value={totalDonations}
                  icon={Heart}
                  color="from-red-500 to-pink-600"
                />
                <StatCard
                  title="Total Amount"
                  value={`$${totalAmount.toLocaleString()}`}
                  icon={Wallet}
                  color="from-green-500 to-emerald-600"
                />
                <StatCard
                  title="Current Streak"
                  value={`${userStreak} days`}
                  icon={Flame}
                  color="from-orange-500 to-red-600"
                />
                <StatCard
                  title="XP Earned"
                  value={userXp}
                  icon={Star}
                  color="from-yellow-500 to-orange-600"
                />
              </div>

              {/* Current Challenges */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Current Challenges</h3>
                <div className="space-y-4">
                  <ChallengeCard
                    title="Donate to 2 campaigns"
                    description="Help support multiple causes"
                    progress={50}
                    reward="200 XP"
                    icon={Target}
                  />
                  <ChallengeCard
                    title="Maintain 7-day streak"
                    description="Keep your donation momentum going"
                    progress={71}
                    reward="500 XP"
                    icon={Flame}
                  />
                  <ChallengeCard
                    title="Share 3 campaigns"
                    description="Spread awareness to your network"
                    progress={33}
                    reward="150 XP"
                    icon={Share2}
                  />
                </div>
           
</div>
              {/* Recent Achievements */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {unlockedAchievements.slice(0, 4).map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'achievements' && (
            <div className="space-y-8">
              {/* Unlocked Achievements */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Unlocked Achievements ({unlockedAchievements.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unlockedAchievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>

              {/* Locked Achievements */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Locked Achievements ({lockedAchievements.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lockedAchievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'activity' && (
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {activityData.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'leaderboard' && (
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Top Donors This Month</h3>
                <div className="space-y-3">
                  {leaderboardData.map((donor, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                        donor.name === 'You' 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          {getRankIcon(donor.rank)}
                          <span className="text-sm font-medium text-gray-300">
                            {donor.rank}{getRankSuffix(donor.rank)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {donor.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className={`font-medium ${donor.name === 'You' ? 'text-blue-400' : 'text-white'}`}>
                              {donor.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              Level {donor.level} • {donor.streak} day streak
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{donor.xp.toLocaleString()} XP</p>
                        <p className="text-sm text-gray-400">
                          {donor.donations} donations • ${donor.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* XP Modal */}
      {showXpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">XP System</h3>
              <button
                onClick={() => setShowXpModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-gray-300">
              <div className="flex justify-between">
                <span>Small donation ($1-50)</span>
                <span className="text-green-400">+10 XP</span>
              </div>
              <div className="flex justify-between">
                <span>Medium donation ($51-200)</span>
                <span className="text-green-400">+25 XP</span>
              </div>
              <div className="flex justify-between">
                <span>Large donation ($201+)</span>
                <span className="text-green-400">+50 XP</span>
              </div>
              <div className="flex justify-between">
                <span>Share campaign</span>
                <span className="text-blue-400">+50 XP</span>
              </div>
              <div className="flex justify-between">
                <span>Achievement unlock</span>
                <span className="text-purple-400">+100-2000 XP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TabButtonProps {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  isActive: boolean;
  onClick: (id: string) => void;
}

const TabButton = ({ id, label, icon: Icon, isActive, onClick }: TabButtonProps) => (
  <button
    onClick={() => onClick(id)}
    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform flex items-center gap-2 ${
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20 hover:scale-105'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-gray-300">{title}</p>
  </div>
);

interface ChallengeCardProps {
  title: string;
  description: string;
  progress: number;
  reward: string;
  icon: React.ComponentType<any>;
}

const ChallengeCard = ({ title, description, progress, reward, icon: Icon }: ChallengeCardProps) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-300">{progress}% complete</span>
      <span className="text-green-400">{reward}</span>
    </div>
  </div>
);

interface AchievementCardProps {
  achievement: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    rarity: keyof typeof rarityColors;
    unlocked: boolean;
    xp: number;
    unlockedAt?: string;
    progress?: number;
  };
}

const AchievementCard = ({ achievement }: AchievementCardProps) => (
  <div className={`p-4 rounded-xl border transition-all ${
    achievement.unlocked 
      ? 'bg-white/10 border-white/20' 
      : 'bg-white/5 border-white/10 opacity-60'
  }`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 rounded-lg bg-gradient-to-r ${rarityColors[achievement.rarity]}`}>
        <achievement.icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="text-white font-medium">{achievement.title}</h4>
        <p className="text-sm text-gray-400">{achievement.description}</p>
      </div>
    </div>
    {achievement.unlocked ? (
      <div className="flex items-center justify-between">
        <span className="text-green-400 text-sm">Unlocked</span>
        <span className="text-yellow-400 text-sm">+{achievement.xp} XP</span>
      </div>
    ) : (
      <div className="space-y-2">
        {achievement.progress !== undefined && (
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">
            {achievement.progress !== undefined ? `${achievement.progress}% complete` : 'Locked'}
          </span>
          <span className="text-yellow-400">+{achievement.xp} XP</span>
        </div>
      </div>
    )}
  </div>
);

interface ActivityCardProps {
  activity: {
    type: string;
    campaign?: string;
    amount?: number;
    date: string;
    xp: number;
    title?: string;
  };
}

const ActivityCard = ({ activity }: ActivityCardProps) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
    <div className={`p-2 rounded-lg ${
      activity.type === 'donation' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
      activity.type === 'achievement' ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
      'bg-gradient-to-r from-blue-500 to-purple-600'
    }`}>
      {activity.type === 'donation' && <Heart className="w-5 h-5 text-white" />}
      {activity.type === 'achievement' && <Trophy className="w-5 h-5 text-white" />}
      {activity.type === 'share' && <Share2 className="w-5 h-5 text-white" />}
    </div>
    <div className="flex-1">
      <h4 className="text-white font-medium">
        {activity.type === 'donation' && `Donated $${activity.amount} to ${activity.campaign}`}
        {activity.type === 'achievement' && `Unlocked "${activity.title}"`}
        {activity.type === 'share' && `Shared ${activity.campaign}`}
      </h4>
      <p className="text-sm text-gray-400">{activity.date}</p>
    </div>
    <div className="text-right">
      <span className="text-green-400 text-sm">+{activity.xp} XP</span>
    </div>
  </div>
);

export default DonorProfile;