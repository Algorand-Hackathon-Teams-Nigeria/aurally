import { Metadata } from "next";
import Page from "@atoms/a-page";

import Landing from "@page-sections/landing";

export const metadata: Metadata = {
	title: "Fans | Aurally",
};

const FansPage = () => {
	return (
		<Page className="mt-0 px-0 lg:px-0 p-0 lg:py-0 gap-0 lg:gap-0">
			<div className="flex flex-col items-center lg:mt-[0px] mt-[120px]">
				<Landing.HomePage />
				<Landing.AppStatistics />

				<div className="w-full h-auto mx-auto flex flex-col space-y-16 sm:space-y-32 md:space-y-36">
					<div className="max-w-screen-lg mx-auto pt-[20px]">
						<Landing.AboutUsNew />
					</div>

					<div className="w-full flex justify-center sm:mt-[0px] mt-[40px]">
						<Landing.LandingSection />
					</div>

					<div className="max-w-screen-lg mx-auto pt-[20px]">
						<Landing.ForCreatorsNew />
					</div>
					<Landing.SupportText />
					<Landing.How_it_works />
					<Landing.NewCommunity />
				</div>
			</div>
		</Page>
	);
};

export default FansPage;
