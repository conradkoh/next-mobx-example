import { DealTemplateAPI } from '@client/infrastructure/services/api/DealTemplateAPI';
import { DataDogService } from '@client/infrastructure/services/DatadogService';
import { GoogleAnalyticsService } from '@client/infrastructure/services/GoogleAnalyticsService';
import { TranslationService } from '@client/infrastructure/services/TranslationService';
import { DealTemplateStore } from '@client/infrastructure/stores/DealTemplateStore';

export interface AppContainer {
  isReady: boolean;
  dealTemplateStore: DealTemplateStore;
  dealTemplateAPI: DealTemplateAPI;
  translationService: TranslationService;
  googleAnalyticsService: GoogleAnalyticsService;
  datadogService: DataDogService;
  init(): Promise<void>;
}
