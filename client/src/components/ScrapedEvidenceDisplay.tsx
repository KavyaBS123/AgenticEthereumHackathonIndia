import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ExternalLink, 
  Globe, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface ScrapedEvidence {
  source: string;
  url: string;
  title: string;
  content: string;
  timestamp: Date;
  confidence: number;
  keywords: string[];
}

interface ScrapedEvidenceDisplayProps {
  campaignId: number;
  milestoneId: string;
  onEvidenceFound?: (evidence: ScrapedEvidence[]) => void;
}

const ScrapedEvidenceDisplay: React.FC<ScrapedEvidenceDisplayProps> = ({
  campaignId,
  milestoneId,
  onEvidenceFound
}) => {
  const [evidence, setEvidence] = useState<ScrapedEvidence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchEvidence = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest(
        `/api/campaigns/${campaignId}/milestones/${milestoneId}/evidence`,
        'GET'
      );
      
      if (response.success) {
        setEvidence(response.evidence);
        setLastUpdated(new Date());
        onEvidenceFound?.(response.evidence);
      }
    } catch (error) {
      console.error('Error fetching scraped evidence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, [campaignId, milestoneId]);

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'website':
        return <Globe className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return <Badge className="bg-green-100 text-green-800">High</Badge>;
    if (confidence >= 0.6) return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    return <Badge className="bg-red-100 text-red-800">Low</Badge>;
  };

  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'twitter':
        return 'text-blue-500';
      case 'linkedin':
        return 'text-blue-700';
      case 'facebook':
        return 'text-blue-600';
      case 'instagram':
        return 'text-pink-600';
      case 'youtube':
        return 'text-red-600';
      case 'website':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const averageConfidence = evidence.length > 0 
    ? evidence.reduce((sum, e) => sum + e.confidence, 0) / evidence.length 
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Scraped Evidence</h3>
          <p className="text-sm text-gray-500">
            Automatically collected evidence from websites and social media
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button
            onClick={fetchEvidence}
            disabled={isLoading}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Card */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{evidence.length}</div>
              <div className="text-sm text-gray-500">Evidence Sources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(averageConfidence * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">Average Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {evidence.filter(e => e.confidence >= 0.8).length}
              </div>
              <div className="text-sm text-gray-500">High Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence List */}
      {isLoading ? (
        <div className="text-center py-8">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p className="text-gray-500">Fetching evidence...</p>
        </div>
      ) : evidence.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">No Evidence Found</h4>
            <p className="text-gray-500">
              No evidence has been scraped for this milestone yet. The system will automatically search for updates.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {evidence.map((item, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`${getSourceColor(item.source)}`}>
                      {getSourceIcon(item.source)}
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {item.source}
                    </Badge>
                    {getConfidenceBadge(item.confidence)}
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getConfidenceColor(item.confidence)}`}>
                      {(item.confidence * 100).toFixed(0)}% confidence
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <h4 className="font-medium mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.content}
                </p>

                {/* Keywords */}
                {item.keywords.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Keywords:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.slice(0, 5).map((keyword, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confidence Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Confidence</span>
                    <span>{(item.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={item.confidence * 100} className="h-2" />
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Source
                  </Button>
                  
                  {item.confidence >= 0.8 && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>High confidence evidence</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Auto-completion Notice */}
      {averageConfidence >= 0.7 && evidence.length > 0 && (
        <Card className="border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-medium text-green-800">Milestone Ready for Auto-Completion</h4>
                <p className="text-sm text-green-700">
                  Sufficient evidence has been found with {averageConfidence.toFixed(1)}% average confidence. 
                  This milestone may be automatically completed by the system.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {averageConfidence >= 0.5 && averageConfidence < 0.7 && evidence.length > 0 && (
        <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-800">Evidence Found - Manual Review Recommended</h4>
                <p className="text-sm text-yellow-700">
                  Evidence has been found with {averageConfidence.toFixed(1)}% average confidence. 
                  Manual review is recommended before completing this milestone.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScrapedEvidenceDisplay; 