import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'CreateRequestAdaptiveCardExtensionStrings';
import {
  ICreateRequestAdaptiveCardExtensionProps,
  ICreateRequestAdaptiveCardExtensionState
} from '../CreateRequestAdaptiveCardExtension';
import { IRequest } from '../../../common/models/IRequest';
import { RequestService } from '../../../common/services/RequestService';
import { random } from '@microsoft/sp-lodash-subset';

export interface IConfirmViewData {
  request: IRequest;
  strings: ICreateRequestAdaptiveCardExtensionStrings;
  confirmLink: string;
  username: string;
}

export class ConfirmView extends BaseAdaptiveCardQuickView<
    ICreateRequestAdaptiveCardExtensionProps,
    ICreateRequestAdaptiveCardExtensionState,
  IConfirmViewData
> {
  public get data(): IConfirmViewData {
    return {
      request: this.state.request,
      strings: strings,
      username: this.context.pageContext.user.displayName,
      confirmLink: ""
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/ConfirmView.json');
  }

  public async onAction(action: ISubmitActionArguments): Promise<void> {



      if (action.type === 'Submit') {
        const { id } = action.data;
        if (id === 'cancel') {
          this.quickViewNavigator.pop();
        } else {

          try {
            // send to new request to api
            const client = this.context.serviceScope.consume(RequestService.serviceKey);
            client.postNewRequestForUser(this.state.request, this.context.pageContext.user.email)
            .then((response) => {
                console.log(response);
                if (response) {
                    this.setState({
                        lastCreatedRequestId: this.state.request.number,
                        request: {
                            ...this.state.request,
                            number: "REQ00" + random(11111, 99999, false).toString(),
                      }
                    });
                  }

            })

          }
          catch (e){
            console.log(`Error: ${e.message}`)
          } finally {
          // close the dialog
          // Workaround: needed to cast to QuickViewNavigator to access close() method
          //(<QuickViewNavigator<BaseQuickView<ICreateRequestAdaptiveCardExtensionProps,ICreateRequestAdaptiveCardExtensionState>>>this.quickViewNavigator).close();
          this.quickViewNavigator.pop();
          }
        }
      }
    }
}