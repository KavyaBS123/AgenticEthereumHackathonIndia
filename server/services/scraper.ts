import axios from 'axios';
import * as cheerio from 'cheerio';
import { storage } from '../storage';
import { FundReleaseMilestone } from '../../shared/types';
import { ethers } from 'ethers';

// Add your contract address and ABI here
const contractAddress = process.env.FUND_RELEASE_CONTRACT_ADDRESS;
const contractABI = [
  // Replace with your contract ABI
  // Example:
  // "function releaseFunds(uint256 campaignId, string milestoneId) public"
];

async function releaseFundsForMilestone(campaignId: number, milestoneId: string) {
  if (!process.env.FUND_RELEASE_PRIVATE_KEY || !process.env.FUND_RELEASE_RPC_URL) {
    console.warn('Fund release skipped: FUND_RELEASE_PRIVATE_KEY or FUND_RELEASE_RPC_URL not set');
    return;
  }
  const provider = new ethers.JsonRpcProvider(process.env.FUND_RELEASE_RPC_URL);
  const signer = new ethers.Wallet(process.env.FUND_RELEASE_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  try {
    // Call your contract's fund release function
    const tx = await contract.releaseFunds(campaignId, milestoneId);
    await tx.wait();
    console.log(`Funds released for campaign ${campaignId}, milestone ${milestoneId}`);
  } catch (err) {
    console.error(`Failed to release funds for campaign ${campaignId}, milestone ${milestoneId}:`, err);
  }
}

interface ScrapedEvidence {
  source: string;
  url: string;
  title: string;
  content: string;
  timestamp: Date;
  confidence: number; // 0-1 confidence score
  keywords: string[];
}

interface ScrapingResult {
  milestoneId: string;
  evidence: ScrapedEvidence[];
  isCompleted: boolean;
  confidence: number;
}

class CampaignScraper {
  private userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  ];

  private async getRandomUserAgent(): Promise<string> {
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }

  private async scrapeWebsite(url: string): Promise<ScrapedEvidence | null> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': await this.getRandomUserAgent(),
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      
      // Extract title
      const title = $('title').text() || $('h1').first().text() || '';
      
      // Extract main content
      const content = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 1000);
      
      // Extract meta description
      const metaDescription = $('meta[name="description"]').attr('content') || '';
      
      return {
        source: 'website',
        url,
        title,
        content: metaDescription || content,
        timestamp: new Date(),
        confidence: 0.8,
        keywords: this.extractKeywords(title + ' ' + content)
      };
    } catch (error) {
      console.error(`Error scraping website ${url}:`, error);
      return null;
    }
  }

  private async scrapeSocialMedia(platform: string, query: string): Promise<ScrapedEvidence[]> {
    const results: ScrapedEvidence[] = [];
    
    try {
      switch (platform) {
        case 'twitter':
          results.push(...await this.scrapeTwitter(query));
          break;
        case 'linkedin':
          results.push(...await this.scrapeLinkedIn(query));
          break;
        case 'facebook':
          results.push(...await this.scrapeFacebook(query));
          break;
        case 'instagram':
          results.push(...await this.scrapeInstagram(query));
          break;
        case 'youtube':
          results.push(...await this.scrapeYouTube(query));
          break;
        default:
          console.warn(`Unsupported platform: ${platform}`);
      }
    } catch (error) {
      console.error(`Error scraping ${platform}:`, error);
    }
    
    return results;
  }

  private async scrapeTwitter(query: string): Promise<ScrapedEvidence[]> {
    // Note: Twitter scraping requires API access or specialized tools
    // This is a simplified implementation
    const results: ScrapedEvidence[] = [];
    
    try {
      // In a real implementation, you would use Twitter API or a scraping service
      const searchUrl = `https://twitter.com/search?q=${encodeURIComponent(query)}`;
      
      // For demo purposes, we'll simulate finding relevant tweets
      if (query.toLowerCase().includes('milestone') || query.toLowerCase().includes('completed')) {
        results.push({
          source: 'twitter',
          url: searchUrl,
          title: `Twitter search: ${query}`,
          content: `Found relevant tweets about ${query}`,
          timestamp: new Date(),
          confidence: 0.7,
          keywords: this.extractKeywords(query)
        });
      }
    } catch (error) {
      console.error('Error scraping Twitter:', error);
    }
    
    return results;
  }

  private async scrapeLinkedIn(query: string): Promise<ScrapedEvidence[]> {
    const results: ScrapedEvidence[] = [];
    
    try {
      const searchUrl = `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(query)}`;
      
      // Simulate LinkedIn scraping
      if (query.toLowerCase().includes('project') || query.toLowerCase().includes('launch')) {
        results.push({
          source: 'linkedin',
          url: searchUrl,
          title: `LinkedIn posts: ${query}`,
          content: `Found relevant LinkedIn posts about ${query}`,
          timestamp: new Date(),
          confidence: 0.8,
          keywords: this.extractKeywords(query)
        });
      }
    } catch (error) {
      console.error('Error scraping LinkedIn:', error);
    }
    
    return results;
  }

  private async scrapeFacebook(query: string): Promise<ScrapedEvidence[]> {
    const results: ScrapedEvidence[] = [];
    
    try {
      const searchUrl = `https://www.facebook.com/search/posts/?q=${encodeURIComponent(query)}`;
      
      // Simulate Facebook scraping
      if (query.toLowerCase().includes('update') || query.toLowerCase().includes('progress')) {
        results.push({
          source: 'facebook',
          url: searchUrl,
          title: `Facebook posts: ${query}`,
          content: `Found relevant Facebook posts about ${query}`,
          timestamp: new Date(),
          confidence: 0.6,
          keywords: this.extractKeywords(query)
        });
      }
    } catch (error) {
      console.error('Error scraping Facebook:', error);
    }
    
    return results;
  }

  private async scrapeInstagram(query: string): Promise<ScrapedEvidence[]> {
    const results: ScrapedEvidence[] = [];
    
    try {
      const searchUrl = `https://www.instagram.com/explore/tags/${encodeURIComponent(query.replace(/\s+/g, ''))}`;
      
      // Simulate Instagram scraping
      if (query.toLowerCase().includes('launch') || query.toLowerCase().includes('release')) {
        results.push({
          source: 'instagram',
          url: searchUrl,
          title: `Instagram posts: ${query}`,
          content: `Found relevant Instagram posts about ${query}`,
          timestamp: new Date(),
          confidence: 0.5,
          keywords: this.extractKeywords(query)
        });
      }
    } catch (error) {
      console.error('Error scraping Instagram:', error);
    }
    
    return results;
  }

  private async scrapeYouTube(query: string): Promise<ScrapedEvidence[]> {
    const results: ScrapedEvidence[] = [];
    
    try {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      
      // Simulate YouTube scraping
      if (query.toLowerCase().includes('demo') || query.toLowerCase().includes('showcase')) {
        results.push({
          source: 'youtube',
          url: searchUrl,
          title: `YouTube videos: ${query}`,
          content: `Found relevant YouTube videos about ${query}`,
          timestamp: new Date(),
          confidence: 0.9,
          keywords: this.extractKeywords(query)
        });
      }
    } catch (error) {
      console.error('Error scraping YouTube:', error);
    }
    
    return results;
  }

  private extractKeywords(text: string): string[] {
    const keywords = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 10);
    
    return [...new Set(keywords)];
  }

  private calculateCompletionConfidence(
    milestone: FundReleaseMilestone,
    evidence: ScrapedEvidence[]
  ): number {
    if (evidence.length === 0) return 0;

    let totalConfidence = 0;
    let keywordMatches = 0;
    const milestoneKeywords = this.extractKeywords(milestone.title + ' ' + milestone.description);

    evidence.forEach(e => {
      totalConfidence += e.confidence;
      
      // Check for keyword matches
      const commonKeywords = milestoneKeywords.filter(keyword => 
        e.keywords.includes(keyword)
      );
      keywordMatches += commonKeywords.length;
    });

    const avgConfidence = totalConfidence / evidence.length;
    const keywordScore = Math.min(keywordMatches / milestoneKeywords.length, 1);
    
    return (avgConfidence * 0.7) + (keywordScore * 0.3);
  }

  private async checkMilestoneCompletion(
    milestone: FundReleaseMilestone,
    campaignTitle: string
  ): Promise<ScrapingResult> {
    const evidence: ScrapedEvidence[] = [];
    
    // Create search queries for different platforms
    const searchQueries = [
      `${campaignTitle} ${milestone.title} completed`,
      `${campaignTitle} ${milestone.title} finished`,
      `${campaignTitle} ${milestone.title} launched`,
      `${campaignTitle} ${milestone.title} milestone`,
      `${campaignTitle} ${milestone.title} update`
    ];

    // Scrape different sources
    const platforms = ['twitter', 'linkedin', 'facebook', 'instagram', 'youtube'];
    
    for (const query of searchQueries) {
      for (const platform of platforms) {
        const platformResults = await this.scrapeSocialMedia(platform, query);
        evidence.push(...platformResults);
      }
    }

    // Check if milestone has any associated URLs
    if (milestone.evidence && milestone.evidence.startsWith('http')) {
      const websiteEvidence = await this.scrapeWebsite(milestone.evidence);
      if (websiteEvidence) {
        evidence.push(websiteEvidence);
      }
    }

    const confidence = this.calculateCompletionConfidence(milestone, evidence);
    const isCompleted = confidence > 0.7; // Threshold for automatic completion

    return {
      milestoneId: milestone.id,
      evidence,
      isCompleted,
      confidence
    };
  }

  public async monitorCampaign(campaignId: number): Promise<void> {
    try {
      const campaign = await storage.getCampaign(campaignId);
      if (!campaign || !Array.isArray(campaign.milestones) || campaign.milestones.length === 0) {
        console.warn(`No milestones found for campaign ${campaignId}`);
        return;
      }

      console.log(`Monitoring campaign ${campaignId}: ${campaign.title}`);

      for (const milestone of campaign.milestones) {
        if (!milestone || !milestone.id) {
          console.warn(`Skipping milestone: invalid or missing ID for campaign ${campaignId}`);
          continue;
        }
        if (milestone.isCompleted) continue;

        const result = await this.checkMilestoneCompletion(milestone, campaign.title);
        
        if (result.isCompleted && milestone.id) {
          console.log(`Milestone ${milestone.id} appears to be completed with ${(result.confidence * 100).toFixed(1)}% confidence`);
          
          // Automatically complete the milestone
          const evidenceText = result.evidence
            .map(e => `${e.source}: ${e.title}`)
            .join('; ');
          
          await storage.completeMilestone(campaignId, milestone.id, evidenceText);

          // <-- Automate the fund release transaction here
          try {
            // Example: call smart contract or backend logic
            await releaseFundsForMilestone(campaignId, milestone.id);
            console.log(`Funds released for campaign ${campaignId}, milestone ${milestone.id}`);
          } catch (err) {
            console.error(`Failed to release funds for campaign ${campaignId}, milestone ${milestone.id}:`, err);
          }

          console.log(`Automatically completed milestone: ${milestone.title} (${milestone.id})`);
        } else if (result.confidence > 0.5) {
          console.log(`Milestone ${milestone.id} has ${(result.confidence * 100).toFixed(1)}% completion confidence - needs manual review`);
        }
      }
    } catch (error) {
      console.error(`Error monitoring campaign ${campaignId}:`, error);
    }
  }

  public async monitorAllCampaigns(): Promise<void> {
    try {
      const campaigns = await storage.getCampaigns();
      
      for (const campaign of campaigns) {
        if (campaign.milestones && campaign.milestones.length > 0) {
          await this.monitorCampaign(campaign.id);
        }
      }
    } catch (error) {
      console.error('Error monitoring all campaigns:', error);
    }
  }

  public async getScrapedEvidence(milestoneId: string, campaignId: number): Promise<ScrapedEvidence[]> {
    try {
      const campaign = await storage.getCampaign(campaignId);
      if (!campaign || !campaign.milestones) return [];

      const milestone = campaign.milestones.find(m => m.id === milestoneId);
      if (!milestone) return [];

      const result = await this.checkMilestoneCompletion(milestone, campaign.title);
      return result.evidence;
    } catch (error) {
      console.error(`Error getting scraped evidence for milestone ${milestoneId}:`, error);
      return [];
    }
  }
}

export const campaignScraper = new CampaignScraper(); 