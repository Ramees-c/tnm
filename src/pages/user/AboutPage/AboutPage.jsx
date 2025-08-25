import React from "react";
import PlatformOverview from "../../../components/common/PlatformOverview/PlatformOverview";

import aboutImg from "../../../assets/images/about-img.jpg";
import CEOSection from "../../../components/common/CEOSection/CEOSection";
import VisionMission from "../../../components/common/VisionMission/VisionMission";
import PageHeader from "../../../components/common/PageHeader/PageHeader";

function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Us"
        headerBg="https://plus.unsplash.com/premium_photo-1681842143575-03bf1be4c11c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
      />
      <div className="container">
        <section className="w-full pt-16" data-aos="fade-up">
          <div className="mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10 items-center  lg:px-12">
            {/* Left Image */}
            <div className="flex justify-center xl:justify-center">
              <img
                src={aboutImg}
                alt="Students"
                className="w-full max-w-[500px] lg:max-w-[600px] rounded-2xl shadow-xl object-cover transform transition duration-500"
              />
            </div>

            {/* Right Content */}
            <div className="">
              <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-6 leading-snug">
                Our commitment to{" "}
                <span className="text-green-600">diversity leadership.</span>
              </h2>

              <p className="text-gray-600 text-base 2xl:text-lg leading-relaxed mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                quaerat facere nobis iste porro inventore velit a magni
                molestias doloribus sapiente, nam delectus? Nostrum inventore
                cupiditate dignissimos ratione, alias ducimus odit deserunt
                libero veritatis exercitationem natus, repudiandae quidem veniam
                minima consequuntur!
                <br />
                Explicabo illo consectetur sed ipsa fuga impedit consequatur
                beatae, minus quam quibusdam optio ipsum. Sed ad iusto fugiat
                labore ullam atque soluta fugit, blanditiis exercitationem
                mollitia totam expedita ab ratione repellendus.
                <br />
                Explicabo illo consectetur sed ipsa fuga impedit consequatur
                beatae, minus quam quibusdam optio ipsum. Sed ad iusto fugiat
                labore ullam atque soluta fugit, blanditiis exercitationem
                mollitia totam expedita ab ratione repellendus.
                <br />
                Explicabo illo consectetur sed ipsa fuga impedit consequatur
                beatae, minus quam quibusdam optio ipsum. Sed ad iusto fugiat
                labore ullam atque soluta fugit, blanditiis exercitationem
                mollitia totam expedita ab ratione repellendus.
              </p>
            </div>
          </div>
        </section>

        <div className="" data-aos="fade-up">
          <PlatformOverview />
        </div>
        <div data-aos="fade-up">
          <VisionMission />
        </div>
        <div className="py-16" data-aos="fade-up">
          <CEOSection />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
