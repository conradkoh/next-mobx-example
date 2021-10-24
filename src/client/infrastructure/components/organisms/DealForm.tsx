import { useAppContainer } from '@client/infrastructure/app/container';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useState } from 'react';
import { FunctionComponent } from 'react';
import { Button } from '@mui/material';
import {
  dealTemplateViewModel,
  DealTemplateViewModel,
} from '@client/infrastructure/view-models/DealTemplate';
import { TranslateFunc } from '@client/infrastructure/services/TranslationService';
import { inject } from '@client/infrastructure/app/inject';
import { CreateDealParams } from '@common/domain/entities/Deal';
interface DealFormProps {
  dealTemplates: DealTemplateViewModel[];
  onSubmit: (params: CreateDealParams) => void;
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
  const [formState, setFormState] = useState<Partial<CreateDealParams>>({});
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
        <Button
          onClick={() => {
            //TODO: Implement validation
            props.onSubmit(formState as CreateDealParams);
          }}
        >
          {translate('deal_form_submit_button_label')}
        </Button>
      </div>
    </>
  );
};
export default observer(
  inject<{ onSubmit?: (params: CreateDealParams) => void }, DealFormProps>(
    DealForm,
    (app, props) => {
      //it is ok to call hooks within this
      const translate = useCallback<TranslateFunc>(
        (...p) => {
          return app.translationService.translate(...p);
        },
        [app.translationService.isReady]
      );
      const onSubmit = useCallback(
        (params) => {
          app.googleAnalyticsService.pushGtmEvent(
            'deal_form_submit_button',
            'clicked',
            {}
          );
          props?.onSubmit?.(params); //we can optionally forward the props to the parent if we want
          app.dealAPI.createDeal(params); //we can also directly call the API if we want to
        },
        [
          app.googleAnalyticsService.pushGtmEvent,
          props?.onSubmit,
          app.dealAPI.createDeal,
        ]
      );
      const dealTemplates = useMemo(
        () =>
          app.dealTemplateStore.dealTemplates.map((d) =>
            //Interactions with the deal view model can be done in the inject callback
            dealTemplateViewModel(d)
          ),
        [app.dealTemplateStore.dealTemplates]
      );

      return {
        dealTemplates,
        onSubmit,
        translate,
      };
    }
  )
);
