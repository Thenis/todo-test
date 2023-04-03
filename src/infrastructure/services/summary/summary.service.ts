import { SummaryRepository } from "src/infrastructure/repositories/summary.repository";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { inject, singleton } from "tsyringe";

@singleton()
export class SummaryService {
  constructor(
    @inject(SERVICE_KEYS.SUMMARY_REPOSITORY)
    private summaryRepository: SummaryRepository
  ) {}

  async getSummary(): Promise<any> {
    return await this.summaryRepository
      .get(`Central bankers who spent past weeks puzzling over how financial turmoil will impact their outlook now have a jolt in the form of higher oil prices to consider.

The surprise production cut announced by OPEC+ on Sunday and the danger of another surge in crude costs complicates the debate in Frankfurt, London and Washington about where inflation is headed and how much further interest rates should rise to control it.

“We began to see some signs of inflation normalizing, and here we go again — another problem,” Marija Veitmane, a strategist at State Street, told Bloomberg Television. “We have strong labor markets, we have consumers who can spend, and now oil prices are coming up. So it’s increasingly challenging for central banks.”`);
  }
}
