import { container } from "tsyringe";
import { v4 as uuid } from "uuid";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { IPendingRequestStore } from "src/infrastructure/stores/pending-request.store";

export function TrackRequest() {
  return function <T = any>(
    target: T,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalFunctionExpression = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const originalFunctionExecution: Promise<unknown> =
        originalFunctionExpression.apply(this, args);

      const isPromise = originalFunctionExecution instanceof Promise;
      if (!isPromise) throw new Error("Method is not a promise");

      const pendingRequestStore = container.resolve<IPendingRequestStore>(
        SERVICE_KEYS.PENDING_REQUEST_STORE
      );

      const promiseKey = uuid();

      try {
        pendingRequestStore.addRequest(promiseKey);
        return await originalFunctionExecution;
      } finally {
        pendingRequestStore.removeRequest(promiseKey);
      }
    };

    return descriptor;
  };
}
