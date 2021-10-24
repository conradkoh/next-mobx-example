import { DealAPI } from '@client/infrastructure/services/api/DealAPI';
import { DealTemplateAPI } from '@client/infrastructure/services/api/DealTemplateAPI';
import { DataDogService } from '@client/infrastructure/services/DatadogService';
import { GoogleAnalyticsService } from '@client/infrastructure/services/GoogleAnalyticsService';
import { TranslationService } from '@client/infrastructure/services/TranslationService';
import { DealTemplateStore } from '@client/infrastructure/stores/DealTemplateStore';
import { action, makeAutoObservable } from 'mobx';
import { createContext, FunctionComponent, useContext, useMemo } from 'react';

export class AppContainer {
  isReady: boolean = false;
  dealTemplateStore: DealTemplateStore = new DealTemplateStore();
  dealTemplateAPI: DealTemplateAPI = new DealTemplateAPI();
  dealAPI: DealAPI = new DealAPI();
  translationService: TranslationService = new TranslationService();
  googleAnalyticsService: GoogleAnalyticsService = new GoogleAnalyticsService();
  datadogService: DataDogService = new DataDogService();
  constructor() {
    makeAutoObservable(this, { init: action });
  }
  /**
   * Call the init function on all services that should be initializable
   */
  async init() {
    await Promise.all([this.translationService.load()]);
    this.isReady = true;
  }
}

const AppContainerContext = createContext<AppContainer | null>(null);
export const AppContainerProvider: FunctionComponent = (props) => {
  const container = useMemo(() => {
    //Create and init the app container
    const val = new AppContainer();
    val.init();
    return val;
  }, []);
  return (
    <AppContainerContext.Provider value={container}>
      {props.children}
    </AppContainerContext.Provider>
  );
};
export const useAppContainer = (): AppContainer => {
  const container = useContext(AppContainerContext);
  if (!container) {
    throw new Error('Failed to get app container');
  }
  return container;
};
