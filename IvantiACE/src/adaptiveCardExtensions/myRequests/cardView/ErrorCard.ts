import {
    BaseComponentsCardView,
    ComponentsCardViewParameters,
    PrimaryTextCardView
  } from '@microsoft/sp-adaptive-card-extension-base';
  import * as strings from 'MyRequestsAdaptiveCardExtensionStrings';
  import {
    IMyRequestsAdaptiveCardExtensionProps,
    IMyRequestsAdaptiveCardExtensionState,
    QUICK_VIEW_REGISTRY_ID
  } from '../MyRequestsAdaptiveCardExtension';
  
  export class ErrorCard extends BaseComponentsCardView<
    IMyRequestsAdaptiveCardExtensionProps,
    IMyRequestsAdaptiveCardExtensionState,
    ComponentsCardViewParameters
  > {
    public get cardViewParameters(): ComponentsCardViewParameters {
      return PrimaryTextCardView({
        cardBar: {
            componentName: 'cardBar',
            title: "Uh oh!",
            icon: {
                url: "Error"
            }
        },
        header: {
            componentName: 'text',
            text: "Error"
        },
        body: {
            componentName: 'text',
            text: this.state.errorMessage
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
  }
  