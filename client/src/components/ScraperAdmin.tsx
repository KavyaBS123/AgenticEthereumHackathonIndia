import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Play, 
  Square, 
  RefreshCw, 
  Activity, 
  Settings,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface ScraperStatus {
  isRunning: boolean;
  intervalMinutes?: number;
}

const ScraperAdmin: React.FC = () => {
  const [status, setStatus] = useState<ScraperStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(30);
  const [campaignId, setCampaignId] = useState('');
  const { toast } = useToast();

  const fetchStatus = async () => {
    try {
      const response = await apiRequest('/api/scraper/status', 'GET');
      if (response.success) {
        setStatus(response.status);
      }
    } catch (error) {
      console.error('Error fetching scraper status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleStartScraper = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest('/api/scraper/start', 'POST', {
        intervalMinutes: parseInt(intervalMinutes.toString())
      });
      
      if (response.success) {
        setStatus(response.status);
        toast({
          title: 'Scraper Started',
          description: response.message,
        });
      }
    } catch (error) {
      console.error('Error starting scraper:', error);
      toast({
        title: 'Error',
        description: 'Failed to start scraper',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopScraper = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest('/api/scraper/stop', 'POST');
      
      if (response.success) {
        setStatus(response.status);
        toast({
          title: 'Scraper Stopped',
          description: response.message,
        });
      }
    } catch (error) {
      console.error('Error stopping scraper:', error);
      toast({
        title: 'Error',
        description: 'Failed to stop scraper',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMonitorCampaign = async () => {
    if (!campaignId) {
      toast({
        title: 'Error',
        description: 'Please enter a campaign ID',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest(`/api/scraper/monitor/${campaignId}`, 'POST');
      
      if (response.success) {
        toast({
          title: 'Monitoring Complete',
          description: response.message,
        });
      }
    } catch (error) {
      console.error('Error monitoring campaign:', error);
      toast({
        title: 'Error',
        description: 'Failed to monitor campaign',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Scraper Administration</h2>
          <p className="text-gray-600">Monitor and control the automated campaign scraper</p>
        </div>
        <Button
          onClick={fetchStatus}
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Status
        </Button>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Scraper Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status ? (
            <div className="flex items-center gap-4">
              <Badge 
                variant={status.isRunning ? "default" : "secondary"}
                className={status.isRunning ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
              >
                {status.isRunning ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Running
                  </>
                ) : (
                  <>
                    <Square className="w-3 h-3 mr-1" />
                    Stopped
                  </>
                )}
              </Badge>
              
              {status.isRunning && status.intervalMinutes && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Runs every {status.intervalMinutes} minutes</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-500">
              <AlertCircle className="w-4 h-4" />
              <span>Status unavailable</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start/Stop Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Scraper Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="interval">Monitoring Interval (minutes)</Label>
              <Input
                id="interval"
                type="number"
                min="5"
                max="1440"
                value={intervalMinutes}
                onChange={(e) => setIntervalMinutes(parseInt(e.target.value) || 30)}
                className="mt-1"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleStartScraper}
                disabled={isLoading || status?.isRunning}
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Scraper
              </Button>
              
              <Button
                onClick={handleStopScraper}
                disabled={isLoading || !status?.isRunning}
                variant="destructive"
                className="flex-1"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Scraper
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Manual Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Manual Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="campaignId">Campaign ID</Label>
              <Input
                id="campaignId"
                type="number"
                placeholder="Enter campaign ID"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <Button
              onClick={handleMonitorCampaign}
              disabled={isLoading || !campaignId}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Monitor Campaign
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Information */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Automatic Monitoring:</strong> The scraper runs periodically to check all campaigns with milestones
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Evidence Collection:</strong> Searches websites and social media for evidence of milestone completion
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Auto-Completion:</strong> Automatically completes milestones when sufficient evidence is found (≥70% confidence)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Manual Review:</strong> Milestones with 50-70% confidence require manual review before completion
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScraperAdmin; 