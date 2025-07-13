import {
    AlertCircle,
    Award,
    BookOpen,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    Clock,
    CreditCard,
    Eye,
    FileText,
    Globe,
    HelpCircle,
    Lightbulb,
    Play,
    Rocket,
    Shield,
    Target,
    TrendingUp,
    Users,
    XCircle,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

const LearnPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigationItems = [
    { id: 'getting-started', label: 'Getting Started', icon: Rocket },
    { id: 'how-it-works', label: 'How It Works', icon: BookOpen },
    { id: 'creating-campaigns', label: 'Creating Campaigns', icon: Target },
    { id: 'guidelines', label: 'Guidelines & Rules', icon: Shield },
    { id: 'best-practices', label: 'Best Practices', icon: Award },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ];

  const acceptedCampaigns = [
    { title: 'Community Projects', description: 'Local initiatives that benefit communities', icon: Users },
    { title: 'Educational Initiatives', description: 'Schools, scholarships, and learning programs', icon: BookOpen },
    { title: 'Environmental Causes', description: 'Sustainability and conservation projects', icon: Globe },
    { title: 'Technology Innovation', description: 'Open-source and tech development projects', icon: Zap },
    { title: 'Healthcare Support', description: 'Medical treatments and health awareness campaigns', icon: Shield },
    { title: 'Arts & Culture', description: 'Creative projects and cultural preservation', icon: Award }
  ];

  const rejectedCampaigns = [
    { title: 'Illegal Activities', description: 'Any project that violates laws or regulations' },
    { title: 'Hate Speech', description: 'Content promoting discrimination or violence' },
    { title: 'Misleading Claims', description: 'False information or deceptive practices' },
    { title: 'Personal Expenses', description: 'Individual lifestyle costs without community benefit' },
    { title: 'Pyramid Schemes', description: 'Multi-level marketing or investment scams' },
    { title: 'Gambling/Betting', description: 'Any form of gambling or betting activities' }
  ];

  const prerequisites = [
    { 
      title: 'Clear Project Description', 
      description: 'Detailed explanation of your project goals and impact',
      items: ['Project timeline', 'Expected outcomes', 'Community benefit']
    },
    { 
      title: 'Realistic Budget', 
      description: 'Transparent breakdown of how funds will be used',
      items: ['Itemized expenses', 'Funding milestones', 'Financial accountability']
    },
    { 
      title: 'Identity Verification', 
      description: 'Verified identity and contact information',
      items: ['Government ID', 'Address verification', 'Social media profiles']
    },
    { 
      title: 'Supporting Documentation', 
      description: 'Evidence supporting your project claims',
      items: ['Permits/licenses', 'Partner agreements', 'Previous work examples']
    }
  ];

  const faqs = [
    {
      question: 'How do I connect my wallet to CrowdChain?',
      answer: 'Click the "Connect Wallet" button in the top right corner. We support MetaMask, WalletConnect, and other popular Web3 wallets. Make sure you have some ETH for transaction fees.'
    },
    {
      question: 'What fees does CrowdChain charge?',
      answer: 'CrowdChain charges a 3% platform fee on successfully funded campaigns. This covers platform maintenance, security, and support services. There are no upfront costs to create a campaign.'
    },
    {
      question: 'How long does campaign approval take?',
      answer: 'Most campaigns are reviewed within 24-48 hours. Complex projects may take up to 5 business days. You\'ll receive email updates throughout the review process.'
    },
    {
      question: 'Can I edit my campaign after it goes live?',
      answer: 'You can make minor edits like updates and clarifications, but major changes require re-approval. Campaign goals and funding targets cannot be changed once live.'
    },
    {
      question: 'What happens if my campaign doesn\'t reach its goal?',
      answer: 'CrowdChain uses an all-or-nothing model. If you don\'t reach your funding goal by the deadline, all funds are automatically returned to backers via smart contracts.'
    },
    {
      question: 'How do I withdraw funds from my campaign?',
      answer: 'Funds are released automatically through smart contracts when milestones are met. You can set up milestone-based funding or receive funds immediately upon successful completion.'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Connect Your Wallet',
      description: 'Link your Web3 wallet to access all platform features',
      icon: CreditCard
    },
    {
      number: 2,
      title: 'Verify Your Identity',
      description: 'Complete KYC verification to build trust with backers',
      icon: Shield
    },
    {
      number: 3,
      title: 'Create Your Campaign',
      description: 'Set up your project with detailed information and goals',
      icon: Target
    },
    {
      number: 4,
      title: 'Get Approved',
      description: 'Our team reviews your campaign for compliance',
      icon: CheckCircle
    },
    {
      number: 5,
      title: 'Launch & Promote',
      description: 'Share your campaign and start raising funds',
      icon: Rocket
    }
  ];

  const renderSection = () => {
    switch(activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to CrowdChain
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Your journey to decentralized fundraising starts here. Follow these steps to get started on our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="relative group">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                        {step.number}
                      </div>
                      <step.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to Start?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of creators who have successfully funded their projects on CrowdChain.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold">
                Create Your First Campaign
              </button>
            </div>
          </div>
        );

      case 'how-it-works':
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How CrowdChain Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Understanding the decentralized funding process and blockchain technology behind CrowdChain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Smart Contract Security
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  All funds are secured by smart contracts on the blockchain. This ensures transparency and automatic execution of funding terms.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Funds held in escrow until goals are met
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Automatic refunds if campaigns fail
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    No intermediaries or third-party control
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Complete Transparency
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Every transaction is recorded on the blockchain, providing complete visibility into how funds are used.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Real-time funding tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Public transaction history
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Milestone-based fund release
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Community Governance
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The community plays a vital role in platform governance and project validation through voting mechanisms.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Community project ratings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Decentralized dispute resolution
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Platform governance participation
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Global Accessibility
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Access funding from anywhere in the world without traditional banking limitations or geographic restrictions.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    No geographical restrictions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Multiple cryptocurrency support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    24/7 platform availability
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'creating-campaigns':
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Creating Your Campaign
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Step-by-step guide to creating a successful campaign that attracts backers and meets your funding goals.
              </p>
            </div>

            <div className="space-y-6">
              {prerequisites.map((prerequisite, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {prerequisite.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {prerequisite.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {prerequisite.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Pro Tips for Success
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Campaign Title</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Make it clear, compelling, and under 60 characters. Include your main benefit or unique value proposition.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Visual Content</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Use high-quality images and videos. Campaigns with videos raise 105% more funds on average.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Funding Goal</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Set a realistic goal. It's better to exceed a smaller goal than to fall short of a larger one.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Updates</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Post regular updates to keep backers engaged. Campaigns with frequent updates raise 126% more funds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'guidelines':
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Guidelines & Rules
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Understanding what types of campaigns are accepted and rejected on CrowdChain.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Accepted Campaigns
                  </h3>
                </div>
                <div className="space-y-4">
                  {acceptedCampaigns.map((campaign, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <campaign.icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {campaign.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {campaign.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Rejected Campaigns
                  </h3>
                </div>
                <div className="space-y-4">
                  {rejectedCampaigns.map((campaign, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {campaign.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {campaign.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Important Compliance Notes
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• All campaigns must comply with local and international laws</li>
                    <li>• Misleading information will result in immediate campaign removal</li>
                    <li>• Funds raised must be used for stated purposes only</li>
                    <li>• Regular progress updates are required for active campaigns</li>
                    <li>• Violation of guidelines may result in permanent account suspension</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'best-practices':
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Best Practices
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Proven strategies to maximize your campaign's success and build a strong community of supporters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Pre-Launch Strategy
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Build an email list of potential backers before launching
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Create social media accounts and start building community
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Prepare all campaign materials in advance
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Set up analytics and tracking systems
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Community Engagement
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Respond to comments and messages promptly
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Share regular updates and behind-the-scenes content
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Engage with backers on social media platforms
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Thank supporters publicly and privately
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Content Strategy
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Create compelling storytelling that connects emotionally
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Use high-quality visuals and professional videos
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Include clear calls-to-action throughout your campaign
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Regularly update your campaign with fresh content
                    </li>
                </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900
                    rounded-lg flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Timing & Milestones
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300"> 

                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Set clear funding milestones with specific goals
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Use countdown timers to create urgency
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Plan your campaign duration strategically (30-60 days)
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Schedule regular updates aligned with milestones
                        </li>
                    </ul>
                </div>
                </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recognition & Rewards
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Acknowledge your backers with exclusive rewards and recognition. This builds loyalty and encourages future support.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Offer tiered rewards for different funding levels</li>
                <li>Provide early access to products or services</li>
                <li>Feature top backers on your campaign page</li>
                <li>Send personalized thank-you messages</li>
              </ul>
            </div>
            </div>
        );
        case 'faq':
            return (
                <div className="space-y-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Find answers to common questions about using CrowdChain and managing your campaigns.
                    </p>
                </div>
    
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                        <button
                          type="button"
                          className="flex items-center justify-between w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          aria-expanded={expandedFaq === index}
                          aria-controls={`faq-panel-${index}`}
                          tabIndex={0}
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setExpandedFaq(expandedFaq === index ? null : index);
                            }
                          }}
                          role="button"
                        >
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {faq.question}
                          </h3>
                          {expandedFaq === index ? (
                              <ChevronUp className="w-6 h-6 text-gray-500" />
                          ) : (
                              <ChevronDown className="w-6 h-6 text-gray-500" />
                          )}
                        </button>
                        {expandedFaq === index && (
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            {faq.answer}
                        </p>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            );
        default:
            return null;
            }
    };
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Learn About CrowdChain
                </h1>
                <div className="flex space-x-4">
                    {navigationItems.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                                activeSection === section.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-slate-600'
                            }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </div>
            {renderSection()}
        </div>
    );
};
export default LearnPage;

