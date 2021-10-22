import { DealTemplate } from '@common/domain/entities/DealTemplate';

export class DealTemplateAPI {
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

const dealTemplateAPI = new DealTemplateAPI();
export default dealTemplateAPI;
