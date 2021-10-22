import { useAppContainer } from '@client/infrastructure/app';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import { FunctionComponent } from 'react';
import { Button } from '@mui/material';
import { TranslateFunc } from '@client/infrastructure/translations';
import {
  dealTemplateViewModel,
  DealTemplateViewModel,
} from '@client/infrastructure/view-models/DealTemplate';
interface DealFormProps {
  dealTemplates: DealTemplateViewModel[];
  onSubmit: () => void;
  translate: TranslateFunc;
}
/**
 * The component is only responsible for view related responsibilities
 * - Styling
 * - Text (and translations)
 * - Component behaviors (visibility of fields, rendering logic)
 * @param props
 * @returns
 */
const DealForm: FunctionComponent<DealFormProps> = (props) => {
  const { dealTemplates, translate } = props;
  return (
    <>
      <h1>{translate('deal_form_title')}</h1>
      <h2>{translate('deal_template_title')}</h2>
      {dealTemplates.map((d) => {
        return (
          <div key={d.id} id={d.id}>
            {translate('deal_reward_and_criteria_percentage', {
              amount: d.amount,
              minimumOrderValue: d.minimumOrderValue || 0,
            })}
          </div>
        );
      })}
      <div>
        <Button onClick={() => props.onSubmit()}>
          {translate('deal_form_submit_button_label')}
        </Button>
      </div>
    </>
  );
};
/**
 * The provide function is responsible for linking the component to the application state / lifecycle
 * @param Component
 * @returns
 */
const provide = (Component: typeof DealForm) => {
  const Wrapper: FunctionComponent = () => {
    const app = useAppContainer();
    const translate = useCallback<TranslateFunc>(
      (...p) => {
        return app.translationService.translate(...p);
      },
      [app.translationService.isReady]
    );

    return (
      <>
        <Component
          translate={translate}
          dealTemplates={app.dealTemplateStore.dealTemplates.map((d) =>
            dealTemplateViewModel(d)
          )}
          onSubmit={() => {
            app.googleAnalyticsService.pushGtmEvent(
              'deal_form_submit_button',
              'clicked',
              {}
            );
          }}
        />
      </>
    );
  };
  return Wrapper;
};
export default observer(provide(DealForm));
