import { Clock, ExternalLink, Grid, List, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const CrowdChainBlogs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const blogPosts = [
  // Technology (4 cards)
  {
    id: 1,
    title: "The Future of Decentralized Fundraising: How Blockchain is Revolutionizing Charity",
    excerpt: "Explore how blockchain technology is transforming the way we approach charitable giving and community funding.",
    category: "Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/future-decentralized-fundraising-blockchain-charity-1234567890ab"
  },
  {
    id: 4,
    title: "Smart Contracts Explained: Automating Trust in Crowdfunding",
    excerpt: "A deep dive into how smart contracts are eliminating intermediaries and reducing costs in fundraising.",
    category: "Technology",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/smart-contracts-explained-automating-trust-crowdfunding-987654321098"
  },
  {
    id: 7,
    title: "AI Meets Crowdfunding: Smarter Campaigns Through Data Analysis",
    excerpt: "Learn how artificial intelligence is optimizing campaign strategies and donor targeting in crowdfunding.",
    category: "Technology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/ai-meets-crowdfunding-data-driven-campaigns-9876abcd4321"
  },
  {
    id: 8,
    title: "Cybersecurity in Fundraising Platforms: Safeguarding Donor Information",
    excerpt: "Explore essential security protocols to ensure donor trust in digital giving platforms.",
    category: "Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/cybersecurity-in-fundraising-safeguarding-data-abc123def456"
  },

  // Community (4 cards)
  {
    id: 2,
    title: "Building Trust in Digital Communities: The Role of Transparency in Modern Crowdfunding",
    excerpt: "Learn how transparency features are building stronger trust between donors and campaign creators.",
    category: "Community",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/building-trust-digital-communities-transparency-crowdfunding-abcdef123456"
  },
  {
    id: 5,
    title: "From Idea to Impact: Success Stories of Community-Driven Projects",
    excerpt: "Inspiring stories of projects that started small and created massive positive change through community support.",
    category: "Community",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/idea-to-impact-success-stories-community-driven-projects-456789012345"
  },
  {
    id: 9,
    title: "Crowd Power: Mobilizing Communities for Disaster Relief",
    excerpt: "Discover how grassroots crowdfunding is becoming a fast, efficient response to natural disasters.",
    category: "Community",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/community-crowdfunding-disaster-relief-7890efgh1234"
  },
  {
    id: 10,
    title: "Gamification in Crowdfunding: Engaging Communities Through Play",
    excerpt: "Explore how fun, game-like elements are increasing participation and donations in campaigns.",
    category: "Community",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1533142266415-ac591a4c3a62?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/gamification-crowdfunding-community-engagement-98765zyx543"
  },

  // Environment (4 cards)
  {
    id: 3,
    title: "Environmental Impact: How Green Tech Projects Are Changing the World",
    excerpt: "Discover innovative environmental projects that are making a real difference through community funding.",
    category: "Environment",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/environmental-impact-green-tech-projects-changing-world-fedcba654321"
  },
  {
    id: 11,
    title: "Reforestation Campaigns: How Digital Platforms Are Saving Forests",
    excerpt: "A look at how decentralized campaigns are helping plant millions of trees around the world.",
    category: "Environment",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1445820135717-281c2e5e7e56?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/reforestation-campaigns-digital-environmental-impact-1122334455aa"
  },
  {
    id: 12,
    title: "Clean Water for All: Sustainable Projects Changing Lives",
    excerpt: "Community-funded clean water projects are providing hope in remote areas around the globe.",
    category: "Environment",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1588776814546-ec7f48a80f4a?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/clean-water-sustainable-community-projects-ccbbaa998877"
  },
  {
    id: 13,
    title: "Eco Startups on the Rise: How Crowdfunding is Fueling Sustainability",
    excerpt: "Green startups are using crowdfunding to innovate, scale, and drive positive environmental impact.",
    category: "Environment",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/eco-startups-crowdfunding-sustainability-efg456hij789"
  },

  // Education (3 cards)
  {
    id: 6,
    title: "The Psychology of Giving: What Motivates People to Support Causes",
    excerpt: "Understanding the human psychology behind charitable giving and how to connect with potential supporters.",
    category: "Education",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/psychology-of-giving-motivates-people-support-causes-123456789012"
  },
  {
    id: 14,
    title: "Crowdfunding in Education: Empowering the Next Generation",
    excerpt: "How educators and students are raising funds to support learning materials, scholarships, and innovation.",
    category: "Education",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/education-crowdfunding-empowering-students-5678klmn1234"
  },
  {
    id: 15,
    title: "Tech for Teaching: Community Tools for Remote Learning",
    excerpt: "How open-source tools and donations are bridging the educational gap in underserved regions.",
    category: "Education",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1580894894514-f9da0c49fc63?w=400&h=250&fit=crop",
    link: "https://medium.com/@crowdchain/community-edtech-remote-learning-9988776655zz"
  }
];


  const categories = ['All', 'Technology', 'Community', 'Environment', 'Education'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ? true : post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    image: string;
    link: string;
  };

  interface BlogCardProps {
    post: BlogPost;
    index: number;
  }

  const BlogCard = ({ post, index }: BlogCardProps) => (
    <div
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
        viewMode === 'grid' ? 'overflow-hidden' : 'flex gap-6 p-6'
      }`}
      onMouseEnter={() => setHoveredCard(post.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className={`relative ${viewMode === 'grid' ? 'aspect-[4/3]' : 'w-48 h-32 flex-shrink-0'} overflow-hidden ${viewMode === 'grid' ? '' : 'rounded-xl'}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className={`${viewMode === 'grid' ? 'p-6' : 'flex-1'}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            post.category === 'Technology' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
            post.category === 'Community' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
            post.category === 'Environment' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' :
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
          }`}>
            {post.category}
          </span>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 group/btn"
          >
            <span className="text-sm font-medium">Read More</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Decentralized
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
                {' '}Insights
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest trends, insights, and stories from the world of decentralized fundraising and blockchain innovation.
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-all duration-300"
                />
              </div>
              
              <div className="flex items-center gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
          }`}>
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting  your search terms or selected category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CrowdChainBlogs;