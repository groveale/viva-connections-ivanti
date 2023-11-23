import {
  BaseComponentsCardView,
  ComponentsCardViewParameters,
  PrimaryTextCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyRequestsAdaptiveCardExtensionStrings';
import {
  IMyRequestsAdaptiveCardExtensionProps,
  IMyRequestsAdaptiveCardExtensionState,
  QUICK_VIEW_REGISTRY_ID
} from '../MyRequestsAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
  IMyRequestsAdaptiveCardExtensionProps,
  IMyRequestsAdaptiveCardExtensionState,
  ComponentsCardViewParameters
> {
  public get cardViewParameters(): ComponentsCardViewParameters {

    let primaryText: string = strings.CardViewNoRequests;
    if (this.state.requests.length === 1) {
      primaryText = `${this.state.requests.length.toString()} ${strings.CardViewTextSingular}`;
    } else {
      primaryText = `${this.state.requests.length.toString()} ${strings.CardViewTextPlural}`;
    }

    return PrimaryTextCardView({
      cardBar: {
        componentName: 'cardBar',
        title: this.properties.title
      },
      header: {
        componentName: 'text',
        text: primaryText
      },
      body: {
        componentName: 'text',
        text: strings.CardViewDescription
      },
      footer: {
        componentName: 'cardButton',
        title: strings.QuickViewButtonText,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    });
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
