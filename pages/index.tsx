import dealTemplateAPI from '@client/infrastructure/api/DealTemplateAPI';
import { useAppContainer } from '@client/infrastructure/app';
import DealForm from '@client/infrastructure/views/DealForm';
import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const app = useAppContainer();
  useEffect(() => {
    const dealTemplateStore = app.dealTemplateStore;
    (async () => {
      if (!dealTemplateStore.isLoaded) {
        const dealTemplates = await dealTemplateAPI.getTemplates();
        dealTemplateStore.setDealTemplates(dealTemplates);
      }
    })();
  }, []);
  return (
    <>
      <DealForm />
    </>
  );
};

export default observer(Home);
