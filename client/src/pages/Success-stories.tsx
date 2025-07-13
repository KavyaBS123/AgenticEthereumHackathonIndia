import {
  Award,
  BookOpen,
  Cpu,
  ExternalLink,
  Leaf,
  Palette,
  Search,
  Stethoscope,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

const SuccessStoriesPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All Categories', 'Technology', 'Education', 'Healthcare', 
    'Environment', 'Community', 'Arts & Culture'
  ];

  const categoryIcons = {
    'Technology': Cpu,
    'Education': BookOpen,
    'Healthcare': Stethoscope,
    'Environment': Leaf,
    'Community': Users,
    'Arts & Culture': Palette
  };

  const successStories = [
    {
      id: 1,
      title: "Solar Energy Revolution",
      description: "A community-driven solar panel installation project that brought clean energy to 500+ households in rural areas.",
      category: "Environment",
      fundingGoal: "$150,000",
      amountRaised: "$175,000",
      backers: 1250,
      completedDate: "March 2024",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
      mediumLink: "https://medium.com/@crowdchain/solar-energy-revolution-how-blockchain-crowdfunding-transformed-a-community-abc123",
      tags: ["Clean Energy", "Rural Development", "Community Impact"],
      impact: "Reduced carbon footprint by 40% in target communities"
    },
    {
      id: 2,
      title: "Digital Learning Platform",
      description: "An innovative blockchain-based educational platform providing free coding courses to underserved communities.",
      category: "Education",
      fundingGoal: "$80,000",
      amountRaised: "$95,000",
      backers: 850,
      completedDate: "January 2024",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      mediumLink: "https://medium.com/@crowdchain/bridging-the-digital-divide-blockchain-education-platform-success-def456",
      tags: ["Blockchain Education", "Digital Literacy", "Community Access"],
      impact: "Trained 2,500+ students in blockchain technology"
    },
    {
      id: 3,
      title: "Medical Supply Chain",
      description: "Transparent medical supply tracking system ensuring authentic medications reach patients in developing countries.",
      category: "Healthcare",
      fundingGoal: "$200,000",
      amountRaised: "$240,000",
      backers: 1800,
      completedDate: "February 2024",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      mediumLink: "https://medium.com/@crowdchain/revolutionizing-medical-supply-chains-blockchain-transparency-saves-lives-ghi789",
      tags: ["Supply Chain", "Healthcare", "Transparency"],
      impact: "Served 50,000+ patients with verified medications"
    },
    {
      id: 4,
      title: "Community Art Gallery",
      description: "A decentralized art gallery supporting local artists with NFT marketplace and physical exhibition space.",
      category: "Arts & Culture",
      fundingGoal: "$60,000",
      amountRaised: "$72,000",
      backers: 420,
      completedDate: "April 2024",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop",
      mediumLink: "https://medium.com/@crowdchain/empowering-local-artists-through-blockchain-community-gallery-success-jkl012",
      tags: ["NFT", "Local Artists", "Community Space"],
      impact: "Showcased 150+ artists, sold 300+ digital artworks"
    },
    {
      id: 5,
      title: "Smart Agriculture IoT",
      description: "IoT-enabled smart farming solutions helping small farmers optimize crop yields using blockchain data integrity.",
      category: "Technology",
      fundingGoal: "$120,000",
      amountRaised: "$145,000",
      backers: 980,
      completedDate: "December 2023",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
      mediumLink: "https://medium.com/@crowdchain/smart-agriculture-iot-blockchain-transforms-farming-communities-mno345",
      tags: ["IoT", "Agriculture", "Data Integrity"],
      impact: "Increased crop yields by 35% for 200+ farmers"
    },
    {
      id: 6,
      title: "Youth Coding Bootcamp",
      description: "Intensive coding bootcamp for disadvantaged youth, funded through blockchain crowdfunding with job placement guarantee.",
      category: "Education",
      fundingGoal: "$90,000",
      amountRaised: "$110,000",
      backers: 750,
      completedDate: "May 2024",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
      mediumLink: "https://medium.com/@crowdchain/youth-coding-bootcamp-blockchain-funding-creates-tech-careers-pqr678",
      tags: ["Coding", "Youth Development", "Career Training"],
      impact: "85% job placement rate, average salary increase of 300%"
    }
  ];

  const filteredStories = successStories.filter(story => {
    const matchesCategory = activeCategory === 'All Categories' || story.category === activeCategory;
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         story.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Success <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how blockchain-powered crowdfunding has transformed communities, 
            funded innovation, and created lasting impact around the world.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                    activeCategory === category
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : darkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {category}
                </button>
              );
            })}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search success stories..."
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

      {/* Success Stories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className={`rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } hover:shadow-2xl group`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    story.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                    story.category === 'Education' ? 'bg-green-100 text-green-800' :
                    story.category === 'Healthcare' ? 'bg-red-100 text-red-800' :
                    story.category === 'Environment' ? 'bg-emerald-100 text-emerald-800' :
                    story.category === 'Community' ? 'bg-purple-100 text-purple-800' :
                    'bg-pink-100 text-pink-800'
                  }`}>
                    {story.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {story.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Funded</span>
                    <span className="font-semibold text-green-600">{story.amountRaised}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Backers</span>
                    <span className="font-semibold">{story.backers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Completed</span>
                    <span className="font-semibold">{story.completedDate}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Impact</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{story.impact}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full text-xs ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a
                  href={story.mediumLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors group"
                >
                  <span>Read Full Story</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No stories found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of innovators who have turned their ideas into reality through blockchain-powered crowdfunding.
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

export default SuccessStoriesPage;