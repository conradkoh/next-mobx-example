import { Container } from '@client/infrastructure/app/Container';

const container = new Container();
container.init();
export function useAppContainer() {
  return container;
}
