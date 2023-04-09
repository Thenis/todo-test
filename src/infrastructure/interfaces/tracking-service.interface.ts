import { TrackEvent } from "../services/tracking/track-event";
import { TrackPage } from "../services/tracking/track-page";

export interface ITrackingService {
  trackEvent(event: TrackEvent): void;
  trackPageView(event: TrackPage): void;
}
