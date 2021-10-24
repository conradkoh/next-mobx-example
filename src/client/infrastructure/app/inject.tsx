import {
  AppContainer,
  useAppContainer,
} from '@client/infrastructure/app/container';
import { FunctionComponent, ComponentType } from 'react';
/**
 * Inject external dependencies from the app container into a given component
 * @param Component
 * @param selector
 * @returns
 */
export function inject<OuterComponentProps, InjectedProps>(
  Component: ComponentType<OuterComponentProps & InjectedProps>,
  selector: (
    container: AppContainer,
    outerProps: OuterComponentProps
  ) => InjectedProps
) {
  const Wrapper: FunctionComponent<OuterComponentProps> = (props) => {
    const appContainer = useAppContainer();
    const selected = selector(appContainer, props);
    return <Component {...props} {...selected} />;
  };
  return Wrapper;
}
