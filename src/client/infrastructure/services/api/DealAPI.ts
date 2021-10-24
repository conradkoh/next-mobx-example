import { CreateDealParams } from '@common/domain/entities/Deal';

export class DealAPI {
  async createDeal(params: CreateDealParams) {
    console.log('creating deal...', { params });
  }
}
