import { singleton } from "tsyringe";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

import { ITrackingService } from "src/infrastructure/interfaces/tracking-service.interface";
import { TrackPage } from "./track-page";
import { TrackEvent } from "./track-event";

@singleton()
export class TrackingService implements ITrackingService {
  private trackInstance: ApplicationInsights;

  constructor() {
    this.trackInstance = new ApplicationInsights({
      config: {
        instrumentationKey:
          process.env.REACT_APP_APPINSIGHTS_INSTRUMENTATIONKEY,
        disableFetchTracking: true,
        disableAjaxTracking: true,
      },
    });
    this.trackInstance.loadAppInsights();
  }

  trackPageView(pageView: TrackPage): void {
    this.trackInstance.trackPageView(pageView);
  }

  trackEvent(event: TrackEvent): void {
    this.trackInstance.trackEvent(event);
  }
}
