import { ITrackingService } from "src/infrastructure/interfaces/tracking-service.interface";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { TrackEvent } from "src/infrastructure/services/tracking/track-event";
import { container } from "tsyringe";

export function AppTrackEvent(event: TrackEvent) {
  return function <T = any>(
    target: T,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalFunctionExpression = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const originalFunctionExecution: Promise<unknown> =
        originalFunctionExpression.apply(this, args);

      const trackingService = container.resolve<ITrackingService>(
        SERVICE_KEYS.TRACKING_SERVICE
      );

      trackingService.trackEvent(event);

      return originalFunctionExecution;
    };

    return descriptor;
  };
}
