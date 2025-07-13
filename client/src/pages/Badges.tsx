import {
  Award,
  CheckCircle2,
  Lock,
  Search,
  Star,
  Trophy
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

const BadgesPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All', 'Milestone', 'Challenge', 'Special Events', 'UN SDG Impact'
  ];

  // User's current progress (sample data)
  const userProgress = {
    totalDonated: 2850,
    campaignsSupported: 12,
    campaignsCreated: 3,
    successfulCampaigns: 2,
    totalBackers: 156,
    communityMembers: 89,
    referrals: 7,
    streak: 15,
    specialEvents: 2
  };

  const badges = [
    // Milestone Badges
    {
      id: 1,
      name: "First Steps",
      description: "Create your first campaign",
      category: "Milestone",
      rarity: "common",
      icon: "👶",
      progress: userProgress.campaignsCreated,
      required: 1,
      earned: userProgress.campaignsCreated >= 1,
      reward: "+10 XP",
      type: "milestone"
    },
    {
      id: 2,
      name: "Generous Heart",
      description: "Donate to 10 different campaigns",
      category: "Milestone",
      rarity: "uncommon",
      icon: "💝",
      progress: userProgress.campaignsSupported,
      required: 10,
      earned: userProgress.campaignsSupported >= 10,
      reward: "+25 XP",
      type: "milestone"
    },
    {
      id: 3,
      name: "Campaign Master",
      description: "Successfully fund 5 campaigns",
      category: "Milestone",
      rarity: "rare",
      icon: "🏆",
      progress: userProgress.successfulCampaigns,
      required: 5,
      earned: false,
      reward: "+50 XP",
      type: "milestone"
    },
    {
      id: 4,
      name: "Philanthropist",
      description: "Donate over $5,000 total",
      category: "Milestone",
      rarity: "epic",
      icon: "💎",
      progress: userProgress.totalDonated,
      required: 5000,
      earned: false,
      reward: "+100 XP",
      type: "milestone"
    },
    {
      id: 5,
      name: "Community Builder",
      description: "Attract 100+ backers to your campaigns",
      category: "Milestone",
      rarity: "legendary",
      icon: "👑",
      progress: userProgress.totalBackers,
      required: 100,
      earned: userProgress.totalBackers >= 100,
      reward: "+200 XP",
      type: "milestone"
    },

    // Challenge Badges
    {
      id: 6,
      name: "Lightning Strike",
      description: "Fund a campaign within 24 hours of launch",
      category: "Challenge",
      rarity: "epic",
      icon: "⚡",
      progress: 0,
      required: 1,
      earned: false,
      reward: "+75 XP",
      type: "challenge",
      difficulty: "Epic"
    },
    {
      id: 7,
      name: "Phoenix Rising",
      description: "Successfully fund a campaign that was initially failing",
      category: "Challenge",
      rarity: "mythic",
      icon: "🔥",
      progress: 0,
      required: 1,
      earned: false,
      reward: "+150 XP",
      type: "challenge",
      difficulty: "Mythic"
    },
    {
      id: 8,
      name: "Blockchain Pioneer",
      description: "Be among the first 100 users to complete a smart contract milestone",
      category: "Challenge",
      rarity: "legendary",
      icon: "🌟",
      progress: 0,
      required: 1,
      earned: false,
      reward: "+300 XP",
      type: "challenge",
      difficulty: "Legendary"
    },
    {
      id: 9,
      name: "Viral Catalyst",
      description: "Create a campaign that reaches 1000+ social media shares",
      category: "Challenge",
      rarity: "mythic",
      icon: "🚀",
      progress: 0,
      required: 1000,
      earned: false,
      reward: "+200 XP",
      type: "challenge",
      difficulty: "Mythic"
    },

    // Special Events
    {
      id: 10,
      name: "Earth Day Champion",
      description: "Participate in Earth Day 2024 funding event",
      category: "Special Events",
      rarity: "limited",
      icon: "🌍",
      progress: userProgress.specialEvents,
      required: 1,
      earned: userProgress.specialEvents >= 1,
      reward: "+50 XP",
      type: "event",
      eventDate: "April 22, 2024"
    },
    {
      id: 11,
      name: "Holiday Giving",
      description: "Donate during the Winter Giving campaign",
      category: "Special Events",
      rarity: "limited",
      icon: "🎄",
      progress: 0,
      required: 1,
      earned: false,
      reward: "+50 XP",
      type: "event",
      eventDate: "December 2024"
    },
    {
      id: 12,
      name: "Anniversary Founder",
      description: "Celebrate CrowdChain's 1st Anniversary",
      category: "Special Events",
      rarity: "legendary",
      icon: "🎉",
      progress: 0,
      required: 1,
      earned: false,
      reward: "+100 XP",
      type: "event",
      eventDate: "Coming Soon"
    },

    // UN SDG Impact Badges
    {
      id: 13,
      name: "No Poverty Advocate",
      description: "Support campaigns addressing poverty (SDG 1)",
      category: "UN SDG Impact",
      rarity: "impact",
      icon: "🏠",
      progress: 2,
      required: 3,
      earned: false,
      reward: "+40 XP",
      type: "sdg",
      sdgNumber: 1
    },
    {
      id: 14,
      name: "Zero Hunger Hero",
      description: "Fund food security campaigns (SDG 2)",
      category: "UN SDG Impact",
      rarity: "impact",
      icon: "🍽️",
      progress: 1,
      required: 3,
      earned: false,
      reward: "+40 XP",
      type: "sdg",
      sdgNumber: 2
    },
    {
      id: 15,
      name: "Health Champion",
      description: "Support healthcare access campaigns (SDG 3)",
      category: "UN SDG Impact",
      rarity: "impact",
      icon: "🏥",
      progress: 3,
      required: 3,
      earned: true,
      reward: "+40 XP",
      type: "sdg",
      sdgNumber: 3
    },
    {
      id: 16,
      name: "Education Pioneer",
      description: "Fund quality education campaigns (SDG 4)",
      category: "UN SDG Impact",
      rarity: "impact",
      icon: "📚",
      progress: 4,
      required: 3,
      earned: true,
      reward: "+40 XP",
      type: "sdg",
      sdgNumber: 4
    },
    {
      id: 17,
      name: "Clean Water Guardian",
      description: "Support clean water access campaigns (SDG 6)",
      category: "UN SDG Impact",
      rarity: "impact",
      icon: "💧",
      progress: 1,
      required: 3,
      earned: false,
      reward: "+40 XP",
      type: "sdg",
      sdgNumber: 6
    },
    {
      id: 18,
      name: "Climate Action Leader",
      description: "Fund climate change mitigation campaigns (SDG 13)",
      category: "UN SDG Impact",
      rarity: "impact",
      icon: "🌱",
      progress: 2,
      required: 3,
      earned: false,
      reward: "+40 XP",
      type: "sdg",
      sdgNumber: 13
    },
    {
      id: 19,
      name: "Life Below Water Protector",
      description: "Support marine conservation campaigns (SDG 14)",
      category: "UN SDG Impact",
      rarity: "impact",
      icon: "🐠",
      progress: 0,
      required: 3,
      earned: false,
      reward: "+40 XP",
      type: "sdg",
      sdgNumber: 14
    },
    {
      id: 20,
      name: "Life on Land Defender",
      description: "Fund terrestrial ecosystem campaigns (SDG 15)",
      category: "UN SDG Impact",
      rarity: "impact",
      icon: "🌳",
      progress: 1,
      required: 3,
      earned: false,
      reward: "+40 XP",
      type: "sdg",
      sdgNumber: 15
    }
  ];

  const filteredBadges = badges.filter(badge => {
    const matchesCategory = activeCategory === 'All' || badge.category === activeCategory;
    const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         badge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getRarityColor = (
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'mythic' | 'legendary' | 'impact' | 'limited' | string,
    type: 'milestone' | 'challenge' | 'event' | 'sdg' | string
  ): string => {
    if (type === 'sdg') return 'from-blue-500 to-green-500';
    if (type === 'event') return 'from-purple-500 to-pink-500';
    
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'uncommon': return 'from-green-400 to-green-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'mythic': return 'from-red-400 to-red-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getDifficultyBadge = (difficulty: 'Epic' | 'Mythic' | 'Legendary' | string) => {
    const colors: Record<'Epic' | 'Mythic' | 'Legendary', string> = {
      Epic: 'bg-purple-500',
      Mythic: 'bg-red-500',
      Legendary: 'bg-yellow-500'
    };
    return colors[difficulty as 'Epic' | 'Mythic' | 'Legendary'] || 'bg-gray-500';
  };

  const getProgressPercentage = (progress: number, required: number): number => {
    return Math.min((progress / required) * 100, 100);
  };

  const totalEarned = badges.filter(badge => badge.earned).length;
  const totalBadges = badges.length;
  const completionPercentage = (totalEarned / totalBadges) * 100;

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="w-16 h-16 text-yellow-500 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Badges & <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Achievements</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Earn recognition for your contributions to the blockchain crowdfunding ecosystem and global impact initiatives.
          </p>
          
          {/* Overall Progress */}
          <div className={`max-w-2xl mx-auto p-6 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Overall Progress</h3>
              <span className="text-2xl font-bold text-blue-500">{totalEarned}/{totalBadges}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {completionPercentage.toFixed(1)}% Complete • Keep earning badges to unlock exclusive rewards!
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : darkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>
        </div>
      </section>

      {/* Badges Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              className={`relative rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } hover:shadow-2xl group ${
                badge.earned ? 'ring-2 ring-green-500' : ''
              } ${
                !badge.earned && badge.progress === 0 ? 'opacity-75' : ''
              }`}
            >
              {/* Badge Icon with Gradient Border */}
              <div className={`relative w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${
                getRarityColor(badge.rarity, badge.type)
              } p-1`}>
                <div className={`w-full h-full rounded-full ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } flex items-center justify-center text-3xl relative`}>
                  {badge.earned ? (
                    <span className="relative">
                      {badge.icon}
                      <CheckCircle2 className="absolute -top-1 -right-1 w-6 h-6 text-green-500 bg-white rounded-full" />
                    </span>
                  ) : (
                    <span className={badge.progress === 0 ? 'grayscale' : ''}>{badge.icon}</span>
                  )}
                </div>
              </div>

              {/* Badge Details */}
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {badge.description}
                </p>

                {/* Difficulty Badge for Challenges */}
                {badge.difficulty && (
                  <div className="flex justify-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      getDifficultyBadge(badge.difficulty)
                    }`}>
                      {badge.difficulty}
                    </span>
                  </div>
                )}

                {/* SDG Number */}
                {badge.type === 'sdg' && (
                  <div className="flex justify-center mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      SDG {badge.sdgNumber}
                    </span>
                  </div>
                )}

                {/* Event Date */}
                {badge.eventDate && (
                  <div className="flex justify-center mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                      {badge.eventDate}
                    </span>
                  </div>
                )}

                {/* Progress Bar */}
                {!badge.earned && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{badge.progress}/{badge.required}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${getRarityColor(badge.rarity, badge.type)} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${getProgressPercentage(badge.progress, badge.required)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Reward */}
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-300">{badge.reward}</span>
                </div>

                {/* Earned Badge */}
                {badge.earned && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-semibold">Earned!</span>
                    </div>
                  </div>
                )}

                {/* Locked Badge */}
                {!badge.earned && badge.progress === 0 && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <Lock className="w-5 h-5" />
                      <span className="font-semibold">Locked</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {filteredBadges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Award className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No badges found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>

      {/* UN SDG Info Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">UN Sustainable Development Goals</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Earn special impact badges by supporting campaigns aligned with the United Nations' 17 Sustainable Development Goals.
              Make a difference while earning recognition for your global impact.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { num: 1, icon: "🏠", name: "No Poverty" },
              { num: 2, icon: "🍽️", name: "Zero Hunger" },
              { num: 3, icon: "🏥", name: "Good Health" },
              { num: 4, icon: "📚", name: "Quality Education" },
              { num: 6, icon: "💧", name: "Clean Water" },
              { num: 13, icon: "🌱", name: "Climate Action" },
              { num: 14, icon: "🐠", name: "Life Below Water" },
              { num: 15, icon: "🌳", name: "Life on Land" }
            ].map((sdg) => (
              <div key={sdg.num} className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm hover:shadow-md transition-all duration-200 text-center`}>
                <div className="text-3xl mb-2">{sdg.icon}</div>
                <div className="text-xs font-semibold text-blue-600 mb-1">SDG {sdg.num}</div>
                <div className="text-sm font-medium">{sdg.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Earning Badges Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Create campaigns, support causes, and make a global impact while earning exclusive badges and rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-campaign">
  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
    Create Campaign
  </button>
</Link>

<Link to="/campaigns">
  <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
    Browse Campaigns
  </button>
</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BadgesPage;