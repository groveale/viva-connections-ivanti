import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyRequestsPropertyPane } from './MyRequestsPropertyPane';
import { IRequest } from '../../common/models/IRequest';
import { IRequestService } from '../../common/services/IRequestService';
import { RequestService } from '../../common/services/RequestService';
import { ErrorCard } from './cardView/ErrorCard';

export interface IMyRequestsAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyRequestsAdaptiveCardExtensionState {
  requests: IRequest[];
  error: boolean
  errorMessage: string
}

const CARD_VIEW_REGISTRY_ID: string = 'MyRequests_CARD_VIEW';
const ERROR_VIEW_REGISTRY_ID: string = 'MyRequests_ERROR_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyRequests_QUICK_VIEW';

export default class MyRequestsAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyRequestsAdaptiveCardExtensionProps,
  IMyRequestsAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyRequestsPropertyPane;
  private _client: IRequestService;

  public onInit(): Promise<void> {
    this.state = { 
      requests: [],
      error: false,
      errorMessage: '',
    };

    this._client = this.context.serviceScope.consume(RequestService.serviceKey);

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.cardNavigator.register(ERROR_VIEW_REGISTRY_ID, () => new ErrorCard());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return this._fetchData();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyRequests-property-pane'*/
      './MyRequestsPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyRequestsPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    if (this.state.error) {
      return ERROR_VIEW_REGISTRY_ID;
    } 
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }

  private _fetchData(): Promise<void> {
    return this._client.getActiveRequestsForUser(this.context.pageContext.user.email)
      .then((response) => {
        this.setState({
          requests: response.requests
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMessage: error.message
        });
      }
    );
  }
}
