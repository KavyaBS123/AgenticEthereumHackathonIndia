import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Calendar, 
  Percent, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Search
} from 'lucide-react';
import { FundReleaseMilestone } from '@/shared/types';
import ScrapedEvidenceDisplay from './ScrapedEvidenceDisplay';

interface MilestoneDisplayProps {
  milestones: FundReleaseMilestone[];
  amountCollected: string;
  target: string;
  campaignId: number;
  isCreator?: boolean;
  onMarkComplete?: (milestoneId: string, evidence: string) => void;
}

const MilestoneDisplay: React.FC<MilestoneDisplayProps> = ({
  milestones,
  amountCollected,
  target,
  campaignId,
  isCreator = false,
  onMarkComplete
}) => {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const collectedAmount = parseFloat(amountCollected);
  const targetAmount = parseFloat(target);

  const getMilestoneStatus = (milestone: FundReleaseMilestone) => {
    const milestoneTarget = parseFloat(milestone.targetAmount);
    
    if (milestone.isCompleted) {
      return 'completed';
    } else if (collectedAmount >= milestoneTarget) {
      return 'ready';
    } else {
      return 'pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'ready':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'ready':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getProgressPercentage = (milestone: FundReleaseMilestone) => {
    const milestoneTarget = parseFloat(milestone.targetAmount);
    if (milestoneTarget === 0) return 0;
    return Math.min((collectedAmount / milestoneTarget) * 100, 100);
  };

  const totalReleasedPercentage = milestones
    .filter(m => m.isCompleted)
    .reduce((sum, m) => sum + m.releasePercentage, 0);

  const nextMilestone = milestones.find(m => !m.isCompleted && collectedAmount >= parseFloat(m.targetAmount));

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Total Milestones</span>
            </div>
            <p className="text-2xl font-bold">{milestones.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <p className="text-2xl font-bold">
              {milestones.filter(m => m.isCompleted).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Funds Released</span>
            </div>
            <p className="text-2xl font-bold">{totalReleasedPercentage}%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Ready to Release</span>
            </div>
            <p className="text-2xl font-bold">
              {milestones.filter(m => !m.isCompleted && collectedAmount >= parseFloat(m.targetAmount)).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Next Milestone Alert */}
      {nextMilestone && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-800">Milestone Ready for Release</h4>
                <p className="text-sm text-yellow-700">
                  "{nextMilestone.title}" has reached its target and is ready for fund release.
                </p>
              </div>
              {isCreator && (
                <Button
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => {
                    const evidence = prompt('Please provide evidence of milestone completion (URL or description):');
                    if (evidence && onMarkComplete) {
                      onMarkComplete(nextMilestone.id, evidence);
                    }
                  }}
                >
                  Mark Complete
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const status = getMilestoneStatus(milestone);
          const progress = getProgressPercentage(milestone);
          
          return (
            <Card key={milestone.id} className={`border-l-4 ${
              status === 'completed' ? 'border-l-green-500' :
              status === 'ready' ? 'border-l-yellow-500' :
              'border-l-gray-300'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <h4 className="font-medium text-lg">{milestone.title}</h4>
                      {getStatusIcon(status)}
                      <Badge variant="outline">{milestone.releasePercentage}%</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{milestone.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress: {progress.toFixed(1)}%</span>
                        <span>{collectedAmount.toFixed(2)} / {milestone.targetAmount} ETH</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    {/* Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Target: {milestone.targetAmount} ETH
                      </span>
                      {milestone.deadline && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {new Date(milestone.deadline).toLocaleDateString()}
                        </span>
                      )}
                      {milestone.completedAt && (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Evidence */}
                {milestone.evidence && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Completion Evidence:</h5>
                    <p className="text-sm text-gray-600">{milestone.evidence}</p>
                    {milestone.evidence.startsWith('http') && (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-blue-600"
                        onClick={() => window.open(milestone.evidence, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Evidence
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setExpandedMilestone(
                      expandedMilestone === milestone.id ? null : milestone.id
                    )}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {expandedMilestone === milestone.id ? 'Hide' : 'View'} Scraped Evidence
                  </Button>
                  
                  {isCreator && status === 'ready' && !milestone.isCompleted && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        const evidence = prompt('Please provide evidence of milestone completion (URL or description):');
                        if (evidence && onMarkComplete) {
                          onMarkComplete(milestone.id, evidence);
                        }
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete & Release Funds
                    </Button>
                  )}
                </div>

                {/* Scraped Evidence Section */}
                {expandedMilestone === milestone.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ScrapedEvidenceDisplay
                      campaignId={campaignId}
                      milestoneId={milestone.id}
                      onEvidenceFound={(evidence) => {
                        console.log(`Found ${evidence.length} pieces of evidence for milestone ${milestone.id}`);
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneDisplay; 