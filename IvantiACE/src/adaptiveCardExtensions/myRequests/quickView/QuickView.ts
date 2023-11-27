import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyRequestsAdaptiveCardExtensionStrings';
import {
  IMyRequestsAdaptiveCardExtensionProps,
  IMyRequestsAdaptiveCardExtensionState
} from '../MyRequestsAdaptiveCardExtension';
import { IRequest } from '../../../common/models/IRequest';

export interface IQuickViewData {
  numberOfRequests: string;
  requests: IRequest[];
  strings: IMyRequestsAdaptiveCardExtensionStrings;
}

export class QuickView extends BaseAdaptiveCardQuickView<
  IMyRequestsAdaptiveCardExtensionProps,
  IMyRequestsAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {

    let numberOfRequests: string = strings.CardViewNoRequests;
    if (this.state.requests.length === 1) {
      numberOfRequests = `${this.state.requests.length.toString()} ${strings.CardViewTextSingular}`;
    } else {
      numberOfRequests = `${this.state.requests.length.toString()} ${strings.CardViewTextPlural}`;
    }
    
    return {
      numberOfRequests: numberOfRequests,
      requests: this.state.requests,
      strings: strings,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}
