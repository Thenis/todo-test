import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { SummaryService } from "src/infrastructure/services/summary/summary.service";
import { container } from "tsyringe";

const SummaryContext = createContext<{ summaryService: SummaryService }>(
  {} as any
);

export const SummaryProvider = ({ children }: PropsWithChildren) => {
  const summaryService = useRef(
    container.resolve<SummaryService>(SERVICE_KEYS.SUMMARY_SERVICE)
  );

  return (
    <SummaryContext.Provider
      value={{
        summaryService: summaryService.current,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummaryContext = () => {
  return useContext(SummaryContext);
};
