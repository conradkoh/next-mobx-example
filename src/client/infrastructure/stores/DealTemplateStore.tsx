import { DealTemplate } from '@common/domain/entities/DealTemplate';
import { makeAutoObservable } from 'mobx';

export class DealTemplateStore {
  public dealTemplates: DealTemplate[] = [];
  isLoaded: boolean = false;
  constructor() {
    this.dealTemplates = [];
    makeAutoObservable(this);
  }
  public setDealTemplates(dealTemplates: DealTemplate[]) {
    this.dealTemplates = dealTemplates;
  }
  public setLoaded(loaded: boolean) {
    this.isLoaded = loaded;
  }
}
