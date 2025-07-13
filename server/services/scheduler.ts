import { campaignScraper } from './scraper';

class CampaignScheduler {
  private monitoringInterval: NodeJS.Timeout | null =null;
  private isRunning = false;

  constructor() {
    // Handle graceful shutdown
    process.on('SIGINT', () => this.stop());
    process.on('SIGTERM', () => this.stop());
  }

  public start(intervalMinutes: number = 30): void {
    if (this.isRunning) {
      console.log('Campaign scheduler is already running');
      return;
    }

    console.log(`Starting campaign scheduler with ${intervalMinutes} minute intervals`);
    this.isRunning = true;

    // Run immediately on start
    this.runMonitoringCycle();

    // Set up periodic monitoring
    this.monitoringInterval = setInterval(() => {
      this.runMonitoringCycle();
    }, intervalMinutes * 60 * 1000);
  }

  public stop(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isRunning = false;
    console.log('Campaign scheduler stopped');
  }

  public async runMonitoringCycle(): Promise<void> {
    if (!this.isRunning) return;

    console.log('Starting monitoring cycle...');
    const startTime = Date.now();

    try {
      await campaignScraper.monitorAllCampaigns();
      
      const duration = Date.now() - startTime;
      console.log(`Monitoring cycle completed in ${duration}ms`);
    } catch (error) {
      console.error('Error during monitoring cycle:', error);
    }
  }

  public async monitorSpecificCampaign(campaignId: number): Promise<void> {
    console.log(`Manually monitoring campaign ${campaignId}`);
    await campaignScraper.monitorCampaign(campaignId);
  }

  public getStatus(): { isRunning: boolean; intervalMinutes?: number } {
    return {
      isRunning: this.isRunning,
      intervalMinutes: this.monitoringInterval ? 30 : undefined
    };
  }
}

export const campaignScheduler = new CampaignScheduler(); 