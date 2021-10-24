export class GoogleAnalyticsService {
  pushGtmEvent(
    label: string,
    action: 'clicked' | 'opened' | 'closed',
    additionalParams: Record<string, any>
  ) {
    console.log('pushing gtm event: ', { label, action, additionalParams });
  }
}
