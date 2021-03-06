import { DealTemplate } from '@common/domain/entities/DealTemplate';

export class DealTemplateAPI {
  async createDeal() {}
  async getTemplates(): Promise<DealTemplate[]> {
    return [
      {
        id: 'deal-template-id',
        'discountAmountRewardBehavior': {
          amount: 10,
        },
      },
    ];
  }
}
