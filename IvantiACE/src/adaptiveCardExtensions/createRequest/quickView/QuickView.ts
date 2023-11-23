import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'CreateRequestAdaptiveCardExtensionStrings';
import {
  CONFIRM_VIEW_REGISTRY_ID,
  ICreateRequestAdaptiveCardExtensionProps,
  ICreateRequestAdaptiveCardExtensionState
} from '../CreateRequestAdaptiveCardExtension';
import { IRequest, Request } from '../../../common/models/IRequest';

export interface IQuickViewData {
  request: IRequest;
  strings: ICreateRequestAdaptiveCardExtensionStrings;
  username: string;
  lastCreatedRequestId: string;
  showLastCreatedMessage: boolean;
}

export class QuickView extends BaseAdaptiveCardQuickView<
  ICreateRequestAdaptiveCardExtensionProps,
  ICreateRequestAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {

    var showLastCreatedMessage: boolean = false;
    if (this.state.lastCreatedRequestId !== "") {
      showLastCreatedMessage = true;
    }

    return {
      showLastCreatedMessage: showLastCreatedMessage,
      lastCreatedRequestId: this.state.lastCreatedRequestId,
      request: this.state.request,
      username: this.context.pageContext.user.displayName,
      strings: strings
    };
  }

  public async onAction(action: ISubmitActionArguments): Promise<void> {
    if (action.type === 'Submit') {
      const { id } = action.data;
      if (id === 'confirm') {
        const newRequest: IRequest = new Request(this.state.request.number, action.data?.description, "", this.state.request.sysUpdatedOn, action.data?.category, action.data?.urgency, this.state.request.lastUpdatedString);
        this.setState({ request: newRequest });
        this.quickViewNavigator.push(CONFIRM_VIEW_REGISTRY_ID, false);
      } else {
        this.quickViewNavigator.pop();
      }
    }
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}

