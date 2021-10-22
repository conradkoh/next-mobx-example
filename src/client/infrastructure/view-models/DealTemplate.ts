import { DealTemplate } from '@common/domain/entities/DealTemplate';
export type DealTemplateViewModel = ReturnType<typeof dealTemplateViewModel>;
export const dealTemplateViewModel = (dealTemplate: DealTemplate) => ({
  get id() {
    return dealTemplate.id;
  },
  get amount() {
    return (
      dealTemplate.discountAmountRewardBehavior?.amount ||
      dealTemplate.discountPercentageRewardBehavior?.percentage ||
      0
    );
  },
  get minimumOrderValue() {
    return dealTemplate.rewardCriteria?.minimumOrderValue || 0;
  },
});
