import {
    Campaign,
    Donation,
    GptInteraction,
    InsertCampaign,
    InsertDonation,
    InsertGptInteraction,
    InsertUser,
    User
} from "@shared/schema";

// UN SDG Goals mapping
const UN_SDG_GOALS = {
  "No Poverty": 1,
  "Zero Hunger": 2,
  "Good Health and Well-being": 3,
  "Quality Education": 4,
  "Gender Equality": 5,
  "Clean Water and Sanitation": 6,
  "Affordable and Clean Energy": 7,
  "Decent Work and Economic Growth": 8,
  "Industry, Innovation and Infrastructure": 9,
  "Reduced Inequalities": 10,
  "Sustainable Cities and Communities": 11,
  "Responsible Consumption and Production": 12,
  "Climate Action": 13,
  "Life Below Water": 14,
  "Life on Land": 15,
  "Peace, Justice and Strong Institutions": 16,
  "Partnerships for the Goals": 17
};

// Category to SDG mapping
const CATEGORY_SDG_MAPPING = {
  "Environment": [6, 7, 13, 14, 15], // Clean Water, Clean Energy, Climate Action, Life Below Water, Life on Land
  "Education": [4], // Quality Education
  "Health": [3], // Good Health and Well-being
  "Community": [1, 2, 5, 8, 10, 11, 16], // No Poverty, Zero Hunger, Gender Equality, Economic Growth, Reduced Inequalities, Sustainable Cities, Peace
  "Technology": [9, 12], // Industry/Innovation, Responsible Consumption
  "Social Impact": [1, 2, 5, 10, 16], // Poverty, Hunger, Gender Equality, Reduced Inequalities, Peace
  "Arts & Culture": [4, 11], // Education, Sustainable Cities
  "Science": [3, 9, 13], // Health, Innovation, Climate Action
  "Sports": [3, 4], // Health, Education
  "Other": [17] // Partnerships
};

function calculateImpactMeter(category: string, description: string, title: string): { score: number; goals: string[] } {
  const relevantGoals = CATEGORY_SDG_MAPPING[category as keyof typeof CATEGORY_SDG_MAPPING] || [];
  
  // Base score from category alignment
  let score = Math.min(relevantGoals.length * 0.5, 3); // Max 3 points from category
  
  // Additional points from content analysis
  const content = `${title} ${description}`.toLowerCase();
  
  // Check for specific SDG-related keywords
  const sdgKeywords = {
    1: ['poverty', 'poor', 'needy', 'disadvantaged', 'vulnerable'],
    2: ['hunger', 'food', 'nutrition', 'agriculture', 'farming'],
    3: ['health', 'medical', 'wellness', 'healthcare', 'medicine'],
    4: ['education', 'learning', 'school', 'training', 'knowledge'],
    5: ['gender', 'women', 'equality', 'empowerment', 'feminist'],
    6: ['water', 'sanitation', 'clean', 'drinking'],
    7: ['energy', 'solar', 'wind', 'renewable', 'electricity'],
    8: ['work', 'employment', 'job', 'economic', 'business'],
    9: ['innovation', 'technology', 'infrastructure', 'industry'],
    10: ['inequality', 'equality', 'inclusive', 'diversity'],
    11: ['city', 'urban', 'community', 'sustainable'],
    12: ['consumption', 'production', 'waste', 'recycling'],
    13: ['climate', 'carbon', 'emission', 'global warming'],
    14: ['ocean', 'marine', 'sea', 'water life'],
    15: ['forest', 'biodiversity', 'wildlife', 'ecosystem'],
    16: ['peace', 'justice', 'institution', 'governance'],
    17: ['partnership', 'collaboration', 'global']
  };
  
  let additionalGoals = 0;
  for (const [goalNum, keywords] of Object.entries(sdgKeywords)) {
    const goalNumber = parseInt(goalNum);
    if (!relevantGoals.includes(goalNumber)) {
      const hasKeyword = keywords.some(keyword => content.includes(keyword));
      if (hasKeyword) {
        additionalGoals++;
      }
    }
  }
  
  // Add points for additional goal alignment (max 2 points)
  score += Math.min(additionalGoals * 0.3, 2);
  
  // Cap at maximum of 5
  score = Math.min(score, 5);
  
  // Get the actual goals that are relevant
  const allRelevantGoals = [...relevantGoals];
  for (const [goalNum, keywords] of Object.entries(sdgKeywords)) {
    const goalNumber = parseInt(goalNum);
    if (!allRelevantGoals.includes(goalNumber)) {
      const hasKeyword = keywords.some(keyword => content.includes(keyword));
      if (hasKeyword) {
        allRelevantGoals.push(goalNumber);
      }
    }
  }
  
  const goalNames = allRelevantGoals
    .map(num => Object.entries(UN_SDG_GOALS).find(([_, value]) => value === num)?.[0])
    .filter(Boolean) as string[];
  
  return {
    score: Math.round(score * 10) / 10, // Round to 1 decimal place
    goals: goalNames
  };
}

function getStreakBadge(streak: number): string | null {
  if (streak >= 30) return 'Custom Governance';
  if (streak >= 14) return 'Voting Rights NFT';
  if (streak >= 7) return 'Gold Badge NFT';
  if (streak >= 3) return 'Silver Badge NFT';
  if (streak >= 1) return 'Bronze Badge NFT';
  return null;
}

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByAddress(address: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyUser(userId: number, method: string, proof: string): Promise<User>;
  
  // Campaign operations
  getCampaigns(): Promise<Campaign[]>;
  getCampaignsByCategory(category: string): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  getCampaignsByOwner(owner: string): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaignAmountCollected(id: number, amount: number): Promise<void>;
  updateCampaignVerificationStatus(id: number, verified: boolean): Promise<void>;
  updateCampaignImpactMeter(id: number): Promise<void>;
  
  // Campaign features operations
  addCampaignReward(campaignId: number, reward: any): Promise<void>;
  addCampaignFAQ(campaignId: number, faq: any): Promise<void>;
  addCampaignUpdate(campaignId: number, update: any): Promise<void>;
  addCampaignComment(campaignId: number, comment: any): Promise<void>;
  updateCampaignCommunity(campaignId: number, community: any): Promise<void>;
  
  // Milestone operations
  completeMilestone(campaignId: number, milestoneId: string, evidence: string): Promise<void>;
  
  // Donation operations
  getDonations(campaignId: number): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  
  // GPT interactions
  getGptInteractions(userId: number): Promise<GptInteraction[]>;
  createGptInteraction(interaction: InsertGptInteraction): Promise<GptInteraction>;

  // Saved campaigns operations
  saveCampaign(userId: number, campaignId: number): Promise<void>;
  unsaveCampaign(userId: number, campaignId: number): Promise<void>;
  getSavedCampaigns(userId: number): Promise<number[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private campaigns: Map<number, Campaign>;
  private donations: Map<number, Donation>;
  private gptInteractions: Map<number, GptInteraction>;
  private savedCampaigns: Map<number, Set<number>>; // userId -> Set<campaignId>
  
  private currentUserId: number;
  private currentCampaignId: number;
  private currentDonationId: number;
  private currentGptInteractionId: number;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.donations = new Map();
    this.gptInteractions = new Map();
    this.savedCampaigns = new Map();
    
    this.currentUserId = 1;
    this.currentCampaignId = 1;
    this.currentDonationId = 1;
    this.currentGptInteractionId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByAddress(address: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.address === address,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      isVerified: false,
      verificationMethod: null,
      verificationProof: null,
      verificationTimestamp: null,
      badges: ['Pioneer'],
      streakCount: 0,
      lastDonationTime: undefined,
    };
    this.users.set(id, user);
    return user;
  }
  
  async verifyUser(userId: number, method: string, proof: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser: User = {
      ...user,
      isVerified: true,
      verificationMethod: method,
      verificationProof: proof,
      verificationTimestamp: new Date()
    };
    
    this.users.set(userId, updatedUser);
    
    // Also update any campaigns owned by this user
    Array.from(this.campaigns.values())
      .filter(campaign => campaign.owner === user.address)
      .forEach(campaign => {
        this.campaigns.set(campaign.id, {
          ...campaign,
          creatorVerified: true
        });
      });
    
    return updatedUser;
  }
  
  // Campaign operations
  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }
  
  async getCampaignsByCategory(category: string): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(
      (campaign) => campaign.category === category,
    );
  }
  
  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }
  
  async getCampaignsByOwner(owner: string): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(
      (campaign) => campaign.owner === owner,
    );
  }
  
  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = this.currentCampaignId++;
    const amountCollected = "0";
    const createdAt = new Date();
    
    // Check if user is verified
    let creatorVerified = false;
    const user = Array.from(this.users.values()).find(
      user => user.address === insertCampaign.owner
    );
    
    if (user && user.isVerified) {
      creatorVerified = true;
    }
    
    // Calculate impact meter based on UN SDG goals
    const impactMeter = calculateImpactMeter(
      insertCampaign.category,
      insertCampaign.description,
      insertCampaign.title
    );
    
    const campaign: Campaign = { 
      ...insertCampaign, 
      id, 
      amountCollected, 
      createdAt,
      requiresVerification: false,
      creatorVerified,
      pId: insertCampaign.pId || null,
      metaDescription: insertCampaign.metaDescription || '',
      videoUrl: insertCampaign.videoUrl || '',
      videoThumbnail: insertCampaign.videoThumbnail || '',
      storySections: insertCampaign.storySections || null,
      stretchGoals: insertCampaign.stretchGoals || null,
      timeline: insertCampaign.timeline || null,
      team: insertCampaign.team || null,
      risks: insertCampaign.risks || '',
      milestones: insertCampaign.milestones || null,
      rewards: insertCampaign.rewards || null,
      faq: insertCampaign.faq || null,
      updates: insertCampaign.updates || null,
      comments: insertCampaign.comments || null,
      community: insertCampaign.community || null,
      impactMeter: JSON.stringify(impactMeter),
    };
    
    this.campaigns.set(id, campaign);

    if (user) {
      // Award 'Creator' badge if this is their first campaign
      const userCampaigns = Array.from(this.campaigns.values()).filter(c => c.owner === user.address);
      if (userCampaigns.length === 0 && !(user.badges || []).includes('Creator')) {
        user.badges = [...(user.badges || []), 'Creator'];
        this.users.set(user.id, user);
      }
    }
    
    return campaign;
  }
  
  async updateCampaignAmountCollected(id: number, amount: number): Promise<void> {
    const campaign = this.campaigns.get(id);
    if (!campaign) throw new Error("Campaign not found");
    
    const currentAmount = parseFloat(campaign.amountCollected.toString());
    const newAmount = currentAmount + amount;
    
    this.campaigns.set(id, {
      ...campaign,
      amountCollected: newAmount.toString()
    });
  }
  
  async updateCampaignVerificationStatus(id: number, verified: boolean): Promise<void> {
    const campaign = this.campaigns.get(id);
    if (!campaign) throw new Error("Campaign not found");
    
    this.campaigns.set(id, {
      ...campaign,
      creatorVerified: verified
    });
  }
  
  async updateCampaignImpactMeter(id: number): Promise<void> {
    const campaign = this.campaigns.get(id);
    if (!campaign) throw new Error("Campaign not found");
    
    const impactMeter = calculateImpactMeter(
      campaign.category,
      campaign.description,
      campaign.title
    );
    
    this.campaigns.set(id, {
      ...campaign,
      impactMeter: JSON.stringify(impactMeter)
    });
  }
  
  async updateAllCampaignsImpactMeter(): Promise<void> {
    const campaigns = Array.from(this.campaigns.values());
    for (const campaign of campaigns) {
      await this.updateCampaignImpactMeter(campaign.id);
    }
  }
  
  // Campaign features operations
  async addCampaignReward(campaignId: number, reward: any): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) throw new Error("Campaign not found");
    const currentRewards = campaign.rewards ? JSON.parse(campaign.rewards) : [];
    campaign.rewards = JSON.stringify([...currentRewards, reward]);
    this.campaigns.set(campaignId, campaign);
  }

  async addCampaignFAQ(campaignId: number, faq: any): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) throw new Error("Campaign not found");
    const currentFaqs = campaign.faq ? JSON.parse(campaign.faq) : [];
    campaign.faq = JSON.stringify([...currentFaqs, faq]);
    this.campaigns.set(campaignId, campaign);
  }

  async addCampaignUpdate(campaignId: number, update: any): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) throw new Error("Campaign not found");
    const currentUpdates = campaign.updates ? JSON.parse(campaign.updates) : [];
    campaign.updates = JSON.stringify([...currentUpdates, update]);
    this.campaigns.set(campaignId, campaign);
  }

  async addCampaignComment(campaignId: number, comment: any): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) throw new Error("Campaign not found");
    const currentComments = campaign.comments ? JSON.parse(campaign.comments) : [];
    campaign.comments = JSON.stringify([...currentComments, comment]);
    this.campaigns.set(campaignId, campaign);
  }

  async updateCampaignCommunity(campaignId: number, community: any): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) throw new Error("Campaign not found");
    campaign.community = community;
    this.campaigns.set(campaignId, campaign);
  }

  async completeMilestone(campaignId: number, milestoneId: string, evidence: string): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) throw new Error('Campaign not found');
    
    if (!campaign.milestones) {
      console.warn(`No milestones found for campaign ${campaignId}`);
      return;
    }
    
    let milestones: any[];
    try {
      milestones = JSON.parse(campaign.milestones);
    } catch {
      console.warn(`Invalid milestones format for campaign ${campaignId}`);
      return;
    }
    
    if (!Array.isArray(milestones) || !milestones.length) {
      console.warn(`No valid milestones found for campaign ${campaignId}`);
      return;
    }
    
    const milestoneIndex = milestones.findIndex((m: any) => m.id === milestoneId);
    if (milestoneIndex === -1) {
      console.warn(`Milestone ${milestoneId} not found in campaign ${campaignId}`);
      return;
    }
    
    milestones[milestoneIndex].isCompleted = true;
    milestones[milestoneIndex].evidence = evidence;
    campaign.milestones = JSON.stringify(milestones);
    this.campaigns.set(campaignId, campaign);
  }
  
  // Donation operations
  async getDonations(campaignId: number): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(
      (donation) => donation.campaignId === campaignId,
    );
  }
  
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.currentDonationId++;
    const timestamp = new Date();
    
    // Streak logic and badge logic
    const user = Array.from(this.users.values()).find(
      (u) => u.address === insertDonation.donator
    );
    if (user) {
      const now = new Date();
      const last = user.lastDonationTime ? new Date(user.lastDonationTime) : null;
      const oneDay = 24 * 60 * 60 * 1000;
      const twoDays = 2 * oneDay;
      if (last) {
        const diff = now.getTime() - last.getTime();
        if (diff < twoDays && diff >= oneDay) {
          user.streakCount = (user.streakCount || 0) + 1;
        } else if (diff >= twoDays) {
          user.streakCount = 1;
        }
      } else {
        user.streakCount = 1;
      }
      user.lastDonationTime = now;
      // Award streak badge
      const badge = getStreakBadge(user.streakCount || 0);
      if (badge && !(user.badges || []).includes(badge)) {
        user.badges = [...(user.badges || []), badge];
      }
      this.users.set(user.id, user);
    }
    const donation: Donation = { 
      ...insertDonation, 
      id, 
      timestamp
    };
    this.donations.set(id, donation);
    return donation;
  }
  
  // GPT interactions
  async getGptInteractions(userId: number): Promise<GptInteraction[]> {
    return Array.from(this.gptInteractions.values()).filter(
      (interaction) => interaction.userId === userId,
    );
  }
  
  async createGptInteraction(insertInteraction: InsertGptInteraction): Promise<GptInteraction> {
    const id = this.currentGptInteractionId++;
    const timestamp = new Date();
    
    const interaction: GptInteraction = { 
      ...insertInteraction, 
      id, 
      timestamp
    };
    
    this.gptInteractions.set(id, interaction);
    return interaction;
  }

  // Saved campaigns operations
  async saveCampaign(userId: nu/mber, campaignId: number): Promise<void> {
    if (!this.savedCampaigns.has(userId)) {
      this.savedCampaigns.set(userId, new Set());
    }
    this.savedCampaigns.get(userId)!.add(campaignId);
  }

  async unsaveCampaign(userId: number, campaignId: number): Promise<void> {
    if (this.savedCampaigns.has(userId)) {
      this.savedCampaigns.get(userId)!.delete(campaignId);
    }
  }

  async getSavedCampaigns(userId: number): Promise<number[]> {
    return Array.from(this.savedCampaigns.get(userId) || []);
  }
}

export const storage = new MemStorage();

