import { DealTemplateAPI } from '@client/infrastructure/api/DealTemplateAPI';
import { DataDogService } from '@client/infrastructure/services/DatadogService';
import { GoogleAnalyticsService } from '@client/infrastructure/services/GoogleAnalyticsService';
import { TranslationService } from '@client/infrastructure/services/TranslationService';
import { DealTemplateStore } from '@client/infrastructure/stores/DealTemplateStore';
import { action, makeAutoObservable } from 'mobx';

export class Container {
  isReady: boolean = false;
  dealTemplateStore: DealTemplateStore = new DealTemplateStore();
  dealTemplateAPI: DealTemplateAPI = new DealTemplateAPI();
  translationService: TranslationService = new TranslationService();
  googleAnalyticsService: GoogleAnalyticsService = new GoogleAnalyticsService();
  datadogService: DataDogService = new DataDogService();
  constructor() {
    makeAutoObservable(this, { init: action });
  }
  async init() {
    await Promise.all([this.translationService.load()]);
    this.isReady = true;
  }
}
