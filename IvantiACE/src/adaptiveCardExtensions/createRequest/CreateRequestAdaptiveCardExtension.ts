import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { CreateRequestPropertyPane } from './CreateRequestPropertyPane';
import { IRequest, Request } from '../../common/models/IRequest';
import { random } from '@microsoft/sp-lodash-subset';
import { ConfirmView } from './quickView/ConfrimView';

export interface ICreateRequestAdaptiveCardExtensionProps {
  title: string;
}

export interface ICreateRequestAdaptiveCardExtensionState {
  request: IRequest;
  lastCreatedRequestId: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'CreateRequest_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'CreateRequest_QUICK_VIEW';
export const CONFIRM_VIEW_REGISTRY_ID: string = 'CreateRequest_CONFIRM_VIEW'

export default class CreateRequestAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  ICreateRequestAdaptiveCardExtensionProps,
  ICreateRequestAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: CreateRequestPropertyPane;

  public onInit(): Promise<void> {

    let request: Request = new Request();
    request.number = "REQ00" + random(11111, 99999, false).toString();
    request.lastUpdatedString = "just now";
    this.state = {
      request: request,
      lastCreatedRequestId: ""
    };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
    this.quickViewNavigator.register(CONFIRM_VIEW_REGISTRY_ID, () => new ConfirmView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'CreateRequest-property-pane'*/
      './CreateRequestPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.CreateRequestPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
