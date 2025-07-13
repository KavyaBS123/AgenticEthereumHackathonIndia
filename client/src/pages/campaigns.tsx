import { useState, useEffect } from 'react';
import { useThirdweb } from '@/context/ThirdwebContext';
import { CampaignMetadata } from '@shared/types';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/constants';
import CampaignCard from '@/components/CampaignCard';
import Loader from '@/components/Loader';
import ConnectWalletModal from '@/components/ConnectWalletModal';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';

const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<CampaignMetadata[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<CampaignMetadata[]>([]);
  const [visibleCampaigns, setVisibleCampaigns] = useState<CampaignMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  
  const itemsPerPage = 6;
  const { address, connect } = useThirdweb();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const backendCampaigns = await apiRequest('/api/campaigns', 'GET');
        if (backendCampaigns && backendCampaigns.length > 0) {
          // Convert to CampaignMetadata format
          const formattedCampaigns: CampaignMetadata[] = backendCampaigns.map((campaign: any) => ({
            pId: campaign.id ?? campaign.pId,
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: campaign.target?.toString() ?? '0',
            deadline: campaign.deadline ? new Date(campaign.deadline).toISOString() : '',
            amountCollected: campaign.amountCollected?.toString() || '0',
            image: campaign.image,
            category: campaign.category,
            requiresVerification: false,
            creatorVerified: true,
            verificationMethod: null,
            donators: [],
            donations: []
          }));
          console.log('Fetched campaigns from backend:', formattedCampaigns);
          setCampaigns(formattedCampaigns);
          setFilteredCampaigns(formattedCampaigns);
        } else {
          setCampaigns([]);
          setFilteredCampaigns([]);
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch campaigns. Please try again.',
          variant: 'destructive',
        });
        setCampaigns([]);
        setFilteredCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    // Filter campaigns based on search term and category
    const filtered = campaigns.filter((campaign) => {
      const matchesSearch = campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All Categories' || campaign.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredCampaigns(filtered);
    setPage(1); // Reset to first page when filters change
  }, [searchTerm, activeCategory, campaigns]);

  useEffect(() => {
    // Update visible campaigns based on pagination
    const startIndex = (page - 1) * itemsPerPage;
    setVisibleCampaigns(filteredCampaigns.slice(0, startIndex + itemsPerPage));
  }, [page, filteredCampaigns]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleConnectWallet = async () => {
    setIsWalletModalOpen(true);
  };

  return (
    <div className="mb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Browse Campaigns</h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input 
              type="search" 
              className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              placeholder="Search for campaigns..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute left-3 top-2.5">
              <i className="ri-search-line text-gray-400"></i>
            </div>
          </div>
          <div className="flex overflow-x-auto py-2 md:py-0 space-x-2">
            {categories.map((category, index) => (
              <button 
                key={index}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleCampaigns.map((campaign, i) => (
              <CampaignCard key={i} campaign={campaign} />
            ))}
          </div>
          {/* Load More Button */}
          {visibleCampaigns.length < filteredCampaigns.length && (
            <div className="flex justify-center">
              <Button 
                onClick={handleLoadMore}
                variant="outline"
                className="px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-all"
              >
                Load More Campaigns
              </Button>
            </div>
          )}
        </>
      )}
      <ConnectWalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={connect}
      />
    </div>
  );
};

export default Campaigns;
