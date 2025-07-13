import { useEffect, useState, useMemo } from 'react';
import { Link } from 'wouter';
import { calculateDaysLeft } from '@/lib/contract';
import { CampaignMetadata } from '@shared/types';
import VerificationBadge from './VerificationBadge';
import { useThirdweb } from '@/context/ThirdwebContext';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface CampaignCardProps {
  campaign: CampaignMetadata;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const { address } = useThirdweb();
  const { toast } = useToast();

  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const daysLeft = useMemo(() => calculateDaysLeft(campaign.deadline), [campaign.deadline]);

  const formattedProgress = useMemo(() => {
    const target = parseFloat(campaign.target);
    const collected = parseFloat(campaign.amountCollected);
    return Math.min(100, Math.max(0, Math.round((collected / target) * 100)));
  }, [campaign.target, campaign.amountCollected]);

  // Fetch user & saved campaigns
  useEffect(() => {
    if (!address) return;

    const fetchSaved = async () => {
      setLoadingUser(true);

      try {
        let user;

        try {
          user = await apiRequest(`/api/users/address/${address}`, 'GET');
        } catch (err: any) {
          if (err.status === 404) {
            user = await apiRequest('/api/users', 'POST', {
              username: `user_${address.slice(2, 8)}`,
              address,
              avatar: `https://avatars.dicebear.com/api/identicon/${address}.svg`,
              password: 'web3user',
            });
          } else {
            throw err;
          }
        }

        if (user?.id) {
          setUserId(user.id);
          const saved = await apiRequest(`/api/users/${user.id}/saved-campaigns`, 'GET');
          setIsSaved(saved.savedCampaignIds?.includes(campaign.pId));
        } else {
          toast({
            title: 'Failed to create user for this wallet address.',
            description: JSON.stringify(user),
            variant: 'destructive',
          });
        }
      } catch (e) {
        toast({
          title: 'Error fetching or creating user.',
          description: String(e),
          variant: 'destructive',
        });
      } finally {
        setLoadingUser(false);
      }
    };

    fetchSaved();
  }, [address, campaign.pId, toast]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (loadingUser) return toast({ title: 'Please wait, loading user info...' });
    if (!userId) return toast({ title: 'Please connect your wallet to save campaigns.' });

    try {
      const endpoint = `/api/users/${userId}/save/${campaign.pId}`;
      await apiRequest(endpoint, isSaved ? 'DELETE' : 'POST');
      setIsSaved(!isSaved);
      toast({ title: isSaved ? 'Campaign removed from saved.' : 'Campaign saved!' });
    } catch (e) {
      toast({
        title: 'Error saving campaign.',
        description: String(e),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-campaign">
      <div className="flex justify-end p-2 relative">
        {/* Debug Info */}
        <div className="absolute left-2 top-2 text-[10px] text-gray-500">
          <div>UserId: {userId ?? 'null'}</div>
          <div>Loading: {loadingUser ? 'yes' : 'no'}</div>
        </div>

        <button
          onClick={handleSave}
          className="text-primary focus:outline-none"
          title={isSaved ? 'Unsave' : 'Save'}
          disabled={loadingUser || !userId}
        >
          <i className={`ri-bookmark${isSaved ? '-fill' : '-line'} text-xl`} />
        </button>
      </div>

      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-48 object-cover"
        onError={(e) => (e.currentTarget.src = '/default-campaign-poster.jpg')}
      />

      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
            {campaign.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}
          </span>
        </div>

        <div className="mb-2">
          <VerificationBadge
            isVerified={true}
            requiresVerification={false}
            method={null}
            className="mt-1"
          />
        </div>

        <h3 className="text-lg font-bold mb-2">{campaign.title}</h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {campaign.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Progress</span>
            <span>{formattedProgress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${formattedProgress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{parseFloat(campaign.amountCollected).toFixed(2)} ETH</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">of {campaign.target} ETH</p>
          </div>

          <Link
            href={`/campaign-details/${campaign.pId}`}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
