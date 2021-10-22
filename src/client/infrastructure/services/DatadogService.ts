export class DataDogService {
  reportMetric(name: string, tags: Record<string, any>) {
    console.log('reporting metric: ', { name, tags });
  }
}
