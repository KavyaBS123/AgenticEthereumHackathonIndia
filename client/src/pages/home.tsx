import CampaignCard from '@/components/CampaignCard';
import ConnectWalletModal from '@/components/ConnectWalletModal';
import Loader from '@/components/Loader';
import { categories, howItWorksData, web3BenefitsData } from '@/constants';
import { useThirdweb } from '@/context/ThirdwebContext';
import { useToast } from '@/hooks/use-toast';
import { getCampaigns } from '@/lib/contract';
import { CampaignMetadata } from '@shared/types';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<CampaignMetadata[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<CampaignMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [countUpValues, setCountUpValues] = useState({ campaigns: 0, raised: 0, backers: 0 });
  
  const { address, connect } = useThirdweb();
  const { toast } = useToast();

  // Animation counter for statistics
  useEffect(() => {
    const targets = { campaigns: 1247, raised: 2.8, backers: 15600 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCountUpValues(prev => {
        const newValues = { ...prev };
        Object.keys(targets).forEach(key => {
          const target = targets[key as keyof typeof targets];
          const current = prev[key as keyof typeof prev];
          const increment = target / steps;
          if (current < target) {
            newValues[key as keyof typeof newValues] = Math.min(current + increment, target);
          }
        });
        return newValues;
      });
    }, interval);

    setTimeout(() => clearInterval(timer), duration);
    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const testimonials = [
      {
        name: "Sarah Chen",
        role: "Blockchain Developer",
        content: "This platform revolutionized how I fund my projects. The transparency is unmatched.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b25d2213?w=100&h=100&fit=crop&crop=face"
      },
      {
        name: "Marcus Rodriguez",
        role: "Startup Founder",
        content: "Zero fees and instant transactions. This is the future of crowdfunding.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      {
        name: "Elena Petrov",
        role: "Creative Director",
        content: "The community here is amazing. I've funded projects from around the world.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      }
    ];

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const allCampaigns = await getCampaigns();
        setCampaigns(allCampaigns);
        setFilteredCampaigns(allCampaigns);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      fetchCampaigns();
    } else {
      setIsLoading(false);
      setCampaigns([]);
      setFilteredCampaigns([]);
    }
  }, [address]);

  useEffect(() => {
    const filtered = campaigns.filter((campaign) => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All Categories' || campaign.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredCampaigns(filtered);
  }, [searchTerm, activeCategory, campaigns]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleConnectWallet = async () => {
    setIsWalletModalOpen(true);
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Blockchain Developer",
      content: "This platform revolutionized how I fund my projects. The transparency is unmatched.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b25d2213?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      content: "Zero fees and instant transactions. This is the future of crowdfunding.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Elena Petrov",
      role: "Creative Director",
      content: "The community here is amazing. I've funded projects from around the world.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

 const trendingCategories = [
  {
    name: "AI & ML",
    growth: "+145%",
    growthValue: 145,
    icon: "ri-brain-line",
    color: "from-purple-500 to-pink-500",
    tooltip: "Explore tools and trends in Artificial Intelligence & Machine Learning",
    description: "Massive surge in LLMs, AI agents, and GenAI tools in 2025.",
    isTrending: true
  },
  {
    name: "Gaming",
    growth: "+89%",
    growthValue: 89,
    icon: "ri-gamepad-line",
    color: "from-blue-500 to-cyan-500",
    tooltip: "Dive into the next-gen cloud and AR/VR gaming",
    description: "Cloud gaming and immersive experiences are reshaping the industry.",
    isTrending: false
  },
  {
    name: "DeFi",
    growth: "+67%",
    growthValue: 67,
    icon: "ri-coins-line",
    color: "from-green-500 to-emerald-500",
    tooltip: "Discover decentralized finance innovations",
    description: "Smart contracts and DEXs are transforming global finance.",
    isTrending: false
  },
  {
    name: "NFTs",
    growth: "+134%",
    growthValue: 134,
    icon: "ri-palette-line",
    color: "from-orange-500 to-red-500",
    tooltip: "Unlock the digital collectible revolution",
    description: "NFTs expand into gaming, music, and brand loyalty programs.",
    isTrending: true
  }
];


  const advancedFeatures = [
    {
      title: "Smart Contract Security",
      description: "Multi-signature wallets and automated escrow for maximum security",
      icon: "ri-shield-check-line",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Real-time Analytics",
      description: "Live dashboard with funding progress and backer insights",
      icon: "ri-line-chart-line",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Global Accessibility",
      description: "Cross-border funding with instant cryptocurrency transactions",
      icon: "ri-global-line",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Community Governance",
      description: "Decentralized voting on platform improvements and policies",
      icon: "ri-government-line",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="mb-12 md:mb-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="mb-16 md:mb-20 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">The Future of</span>
              <span className="block gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Decentralized Funding
              </span>
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
              Experience the next evolution of crowdfunding with blockchain technology. 
              Zero fees, instant transactions, and complete transparency for creators and backers worldwide.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={handleConnectWallet}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">
                  {address ? 'Explore Campaigns' : 'Connect Wallet'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <Link 
                href="/create-campaign" 
                className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-full font-medium hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:scale-105"
              >
                <span className="group-hover:text-blue-500 transition-colors">Launch Campaign</span>
              </Link>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {Math.round(countUpValues.campaigns)}+
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Campaigns</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  ${countUpValues.raised.toFixed(1)}M
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Raised</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {Math.round(countUpValues.backers / 1000)}k+
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Global Backers</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=500" 
                alt="Blockchain Crowdfunding" 
                className="rounded-3xl shadow-2xl w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Floating Elements */}  
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <i className="ri-secure-payment-line text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Secured by</p>
                    <p className="font-bold">Blockchain Technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">🔥 Trending Categories</h2>
          <p className="text-gray-600 dark:text-gray-300">Discover the hottest funding categories this month</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {trendingCategories.map((category, index) => (
    <div
      key={index}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
      onClick={() => handleCategoryClick(category)}
    >
      {/* Tooltip */}
      <div className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {category.tooltip || "Click to learn more"}
      </div>

      {/* Icon Container */}
      <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <i className={`${category.icon} text-white text-xl`}></i>
      </div>

      {/* Category Name */}
      <h3 className="font-bold mb-1 text-base">{category.name}</h3>

      {/* Growth Value */}
      <p className="text-green-500 font-semibold text-sm mb-1">{category.growth}</p>

      {/* Visual Progress */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-500 h-2 transition-all duration-500"
          style={{ width: category.growthValue + '%' }}
        ></div>
      </div>

      {/* Additional Info */}
      <p className="text-xs text-gray-500 mt-2">{category.description}</p>

      {/* Tag Badge */}
      {category.isTrending && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
          Trending
        </span>
      )}
    </div>
  ))}
</div>

      </section>

      {/* Advanced Features */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">⚡ Advanced Features</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cutting-edge technology meets user-friendly design for the ultimate funding experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advancedFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              
              {hoveredFeature === index && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Real-time Activity Feed */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Live Activity Feed
            </h2>
            <span className="text-sm text-gray-500">Real-time updates</span>
          </div>
          
          <div className="space-y-4">
            {[
              { user: "Alex K.", action: "backed", project: "AI Vision Project", amount: "$500", time: "2 min ago" },
              { user: "Sarah M.", action: "launched", project: "Green Energy Initiative", amount: "$50K goal", time: "5 min ago" },
              { user: "Mike R.", action: "funded", project: "DeFi Protocol", amount: "$25K", time: "8 min ago" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">
                      <span className="text-blue-500">{activity.user}</span> {activity.action} <span className="font-bold">{activity.project}</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.amount}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Tabs */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Browse Campaigns</h2>
          <div className="hidden md:flex items-center space-x-2 overflow-x-auto">
            {categories.map((category, index) => (
              <button 
                key={index}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <select 
            className="md:hidden bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-3 py-2 text-sm"
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-6 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="ri-search-line"></i>
          </div>
          <input 
            type="search" 
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
            placeholder="Search for campaigns..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Campaigns Grid */}
      {isLoading ? (
        <Loader />
      ) : !address ? (
        <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-wallet-3-line text-white text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Join thousands of creators and backers in the decentralized funding revolution
          </p>
          <button 
            onClick={handleConnectWallet}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCampaigns.map((campaign, i) => (
            <CampaignCard key={i} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-file-search-line text-white text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold mb-4">No campaigns found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {searchTerm || activeCategory !== 'All Categories' ? 
              'Try changing your search or filter criteria.' : 
              'Be the first to create a campaign!'}
          </p>
          {!searchTerm && activeCategory === 'All Categories' && (
            <Link 
              href="/create-campaign" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Create Campaign
            </Link>
          )}
        </div>
      )}

      {/* Load More Button */}
      {filteredCampaigns.length > 6 && (
        <div className="flex justify-center mb-16">
          <button className="px-8 py-3 border-2 border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105">
            Load More Campaigns
          </button>
        </div>
      )}
      
      {/* How It Works Section */}
      <section className="mb-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-200/50 dark:border-gray-700/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Simple, secure, and transparent funding process powered by blockchain technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {howItWorksData.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${item.icon} text-white text-3xl`}></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Web3 Benefits Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Blockchain Crowdfunding?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Revolutionary technology that eliminates intermediaries, reduces costs, and ensures complete transparency in every transaction.
            </p>
            
            <div className="space-y-6">
              {web3BenefitsData.map((benefit, index) => (
                <div key={index} className="flex items-start group">
                  <div className="mt-1 mr-4 text-green-500 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-check-double-line text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=600" 
              alt="Blockchain Technology" 
              className="rounded-3xl w-full h-auto shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-3xl"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-gray-600 dark:text-gray-300">Join thousands of satisfied creators and backers worldwide</p>
        </div>
        
        <div className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-500/20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={testimonials[activeTestimonial].avatar} 
                alt={testimonials[activeTestimonial].name}
                className="w-full h-full object-cover"
              />
            </div>
            <blockquote className="text-xl font-medium mb-4 italic">
              "{testimonials[activeTestimonial].content}"
            </blockquote>
            <div className="font-bold">{testimonials[activeTestimonial].name}</div>
            <div className="text-gray-500 text-sm">{testimonials[activeTestimonial].role}</div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">🎉 Success Stories</h2>
          <p className="text-gray-600 dark:text-gray-300">Celebrating projects that changed the world</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Solar Village Initiative",
              raised: "$127K",
              backers: "1,240",
              image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop",
              category: "Environment",
              impact: "Powered 500 homes"
            },
            {
              title: "AI Learning Platform",
              raised: "$89K",
              backers: "890",
              image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
              category: "Education",
              impact: "10K+ students"
            },
            {
              title: "Blockchain Gaming",
              raised: "$234K",
              backers: "2,100",
              image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
              category: "Gaming",
              impact: "50K+ players"
            }
          ].map((story, index) => (
            <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Funded
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {story.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-green-500 font-bold">{story.raised}</span>
                  <span className="text-gray-500">{story.backers} backers</span>
                </div>
                <p className="text-blue-500 font-medium">{story.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Impact</h2>
            <p className="text-gray-300">Real numbers, real impact, real change</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2.8M+", label: "Total Raised", icon: "ri-money-dollar-circle-line" },
              { value: "1,247", label: "Campaigns", icon: "ri-rocket-line" },
              { value: "15.6K", label: "Backers", icon: "ri-group-line" },
              { value: "94%", label: "Success Rate", icon: "ri-trophy-line" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-2xl text-blue-400`}></i>
                </div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">🔒 Security & Trust</h2>
          <p className="text-gray-600 dark:text-gray-300">Your funds are protected by cutting-edge blockchain security</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Multi-Sig Wallets",
              description: "Require multiple signatures for enhanced security",
              icon: "ri-key-2-line",
              color: "from-red-500 to-orange-500"
            },
            {
              title: "Smart Contract Audits",
              description: "Professionally audited by leading security firms",
              icon: "ri-shield-check-line",
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "Immutable Records",
              description: "All transactions permanently recorded on blockchain",
              icon: "ri-file-lock-line",
              color: "from-purple-500 to-pink-500"
            },
            {
              title: "24/7 Monitoring",
              description: "Continuous monitoring for suspicious activities",
              icon: "ri-eye-line",
              color: "from-green-500 to-emerald-500"
            }
          ].map((feature, index) => (
            <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${feature.icon} text-white text-xl`}></i>
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 md:p-12 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Join the decentralized funding revolution and turn your ideas into reality with the power of blockchain technology.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={handleConnectWallet}
            className="px-8 py-4 bg-white text-blue-500 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {address ? 'Explore Now' : 'Connect Wallet'}
          </button>
          <Link 
            href="/create-campaign" 
            className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-500 transition-all duration-300 hover:scale-105"
          >
            Launch Campaign
          </Link>
        </div>
      </section>

      {/* Connect Wallet Modal */}
      <ConnectWalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={connect}
      />
    </div>
  );
};

export default HomePage;