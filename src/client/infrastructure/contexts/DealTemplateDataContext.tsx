import { DealTemplateStore } from '@client/infrastructure/stores/DealTemplateStore';
import React, { createContext } from 'react';
interface DealTemplateData {
  dealTemplateStore: DealTemplateStore;
}
const DealTemplateDataContext = createContext<DealTemplateData>({
  dealTemplateStore: new DealTemplateStore(),
});
export const DealTemplateDataProvider: React.FC<{
  dealTemplateStore: DealTemplateStore;
}> = (props) => {
  return (
    <DealTemplateDataContext.Provider
      value={{
        dealTemplateStore: props.dealTemplateStore,
      }}
    >
      {props.children}
    </DealTemplateDataContext.Provider>
  );
};
