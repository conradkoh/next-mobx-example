export interface DealTemplate {
  id: string;
  discountAmountRewardBehavior?: {
    amount: number;
  };
  discountPercentageRewardBehavior?: {
    percentage: number;
  };
  rewardCriteria?: {
    minimumOrderValue: number;
  };
}
