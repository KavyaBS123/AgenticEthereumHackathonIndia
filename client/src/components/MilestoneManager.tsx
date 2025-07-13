import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Target, Calendar, Percent } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: string;
  releasePercentage: number;
  deadline?: string;
}

interface MilestoneManagerProps {
  milestones: Milestone[];
  onChange: (milestones: Milestone[]) => void;
  totalTarget: string;
}

const MilestoneManager: React.FC<MilestoneManagerProps> = ({ 
  milestones, 
  onChange, 
  totalTarget 
}) => {
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: `milestone-${Date.now()}`,
      title: '',
      description: '',
      targetAmount: '',
      releasePercentage: 0,
      deadline: ''
    };
    setEditingMilestone(newMilestone);
    setIsAdding(true);
  };

  const saveMilestone = () => {
    if (!editingMilestone) return;

    if (editingMilestone.title && editingMilestone.description && editingMilestone.targetAmount) {
      if (isAdding) {
        onChange([...milestones, editingMilestone]);
      } else {
        onChange(milestones.map(m => m.id === editingMilestone.id ? editingMilestone : m));
      }
    }

    setEditingMilestone(null);
    setIsAdding(false);
  };

  const deleteMilestone = (id: string) => {
    onChange(milestones.filter(m => m.id !== id));
  };

  const editMilestone = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingMilestone(null);
    setIsAdding(false);
  };

  const totalPercentage = milestones.reduce((sum, m) => sum + m.releasePercentage, 0);
  const totalAmount = milestones.reduce((sum, m) => sum + parseFloat(m.targetAmount || '0'), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Fund Release Milestones</Label>
          <p className="text-xs text-gray-500">Set milestones to release funds gradually as goals are met</p>
        </div>
        <Button
          type="button"
          onClick={addMilestone}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              <Percent className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Release %</span>
            </div>
            <p className="text-2xl font-bold">{totalPercentage}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Total Amount</span>
            </div>
            <p className="text-2xl font-bold">{totalAmount.toFixed(2)} ETH</p>
          </CardContent>
        </Card>
      </div>

      {/* Milestones List */}
      <div className="space-y-3">
        {milestones.map((milestone, index) => (
          <Card key={milestone.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">#{index + 1}</Badge>
                    <h4 className="font-medium">{milestone.title}</h4>
                    <Badge variant="outline">{milestone.releasePercentage}%</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {milestone.targetAmount} ETH
                    </span>
                    {milestone.deadline && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(milestone.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editMilestone(milestone)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMilestone(milestone.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {editingMilestone && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">
              {isAdding ? 'Add New Milestone' : 'Edit Milestone'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Milestone Title</Label>
              <Input
                id="title"
                value={editingMilestone.title}
                onChange={(e) => setEditingMilestone({
                  ...editingMilestone,
                  title: e.target.value
                })}
                placeholder="e.g., Phase 1: Initial Development"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingMilestone.description}
                onChange={(e) => setEditingMilestone({
                  ...editingMilestone,
                  description: e.target.value
                })}
                placeholder="Describe what will be accomplished in this milestone"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetAmount">Target Amount (ETH)</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  step="0.01"
                  value={editingMilestone.targetAmount}
                  onChange={(e) => setEditingMilestone({
                    ...editingMilestone,
                    targetAmount: e.target.value
                  })}
                  placeholder="0.5"
                />
              </div>
              
              <div>
                <Label htmlFor="releasePercentage">Release Percentage</Label>
                <Input
                  id="releasePercentage"
                  type="number"
                  min="1"
                  max="100"
                  value={editingMilestone.releasePercentage}
                  onChange={(e) => setEditingMilestone({
                    ...editingMilestone,
                    releasePercentage: parseInt(e.target.value) || 0
                  })}
                  placeholder="25"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="deadline">Deadline (Optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={editingMilestone.deadline || ''}
                onChange={(e) => setEditingMilestone({
                  ...editingMilestone,
                  deadline: e.target.value
                })}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="button" onClick={saveMilestone} className="bg-blue-600 hover:bg-blue-700">
                {isAdding ? 'Add Milestone' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Warnings */}
      {totalPercentage > 100 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">
            ⚠️ Total release percentage exceeds 100% ({totalPercentage}%)
          </p>
        </div>
      )}
      
      {totalPercentage < 100 && milestones.length > 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-600">
            ℹ️ Total release percentage is {totalPercentage}%. Consider adding more milestones to reach 100%.
          </p>
        </div>
      )}
    </div>
  );
};

export default MilestoneManager; 