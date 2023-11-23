import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'CreateRequestAdaptiveCardExtensionStrings';
import {
  ICreateRequestAdaptiveCardExtensionProps,
  ICreateRequestAdaptiveCardExtensionState,
  QUICK_VIEW_REGISTRY_ID
} from '../CreateRequestAdaptiveCardExtension';

export class CardView extends BaseImageCardView<
  ICreateRequestAdaptiveCardExtensionProps,
  ICreateRequestAdaptiveCardExtensionState
> {
  /**
   * Buttons will not be visible if card size is 'Medium' with Image Card View.
   * It will support up to two buttons for 'Large' card size.
   */

  public get data(): IImageCardParameters {
    return {
      primaryText: strings.CardViewText,
      imageUrl: strings.ImageUrl,
      title: this.properties.title
    };
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
