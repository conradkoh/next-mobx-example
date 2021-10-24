import { useAppContainer } from '@client/infrastructure/app/container';
import DealForm from '@client/infrastructure/components/organisms/DealForm';
import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
interface PageProps {}
const Home: NextPage<PageProps> = (props) => {
  const { dealTemplateStore, dealTemplateAPI } = useAppContainer();
  useEffect(() => {
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
