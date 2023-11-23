declare interface IMyRequestsAdaptiveCardExtensionStrings {
  PropertyPaneDescription: string;
  GroupName: string;
  TitleFieldLabel: string;
  IconPropertyFieldLabel: string;
  QuickViewButtonText: string;
  CardViewTextSingular: string;
  CardViewTextPlural: string;
  CardViewNoRequests: string;
  CardViewDescription: string;
  QuickViewDescription: string;
  OpenedLabel: string;
  OverdueLabel: string;
}

declare module 'MyRequestsAdaptiveCardExtensionStrings' {
  const strings: IMyRequestsAdaptiveCardExtensionStrings;
  export = strings;
}
