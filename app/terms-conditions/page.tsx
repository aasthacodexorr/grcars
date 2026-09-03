import { Footer, Header } from '@/components/layout';
import { getAppConfig } from '@/lib/appConfig';
import { generateMetadata as generateMetadataHelper } from '@/lib/metadataHelper';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const appConfig = await getAppConfig();
  return generateMetadataHelper({
    title: appConfig.site.terms_and_conditions_page_title,
    description: appConfig.site.terms_and_conditions_page_description,
    canonicalPath: "/terms-conditions",
  });
}

export default async function TermsOfService() {
  const config = await getAppConfig();
  const { dealership_name, full_address_1, city_1, province_1, sales_number_1 } = config.dealership;

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen font-sans antialiased text-gray-800 selection:bg-gray-200 mt-40 lg:mt-20">
        <main className="w-full flex justify-center mx-auto px-6 sm:px-12 py-12 lg:py-16">
          <div className="max-w-6xl">

            <h2 className="text-3xl tracking-tight text-gray-900 mb-8 font-semibold">
              TERMS AND CONDITIONS
            </h2>

            {/* Introduction */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h3>
              <p className="text-[15px] leading-relaxed text-gray-600">
                Welcome to {dealership_name}. By accessing and using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should discontinue use of our services immediately.
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Definitions</h3>
              <p className="text-[15px] leading-relaxed text-gray-600">
                “Company,” “we,” “our,” and “us” refer to {dealership_name}.<br />
                “User,” “you,” and “your” refer to any person accessing our website.<br />
                “Services” refer to vehicle sales, financing, and any other offerings available on our platform.
              </p>
            </section>

            {/* Use of Website */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Use of Website</h3>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-gray-600">
                <li>You must be at least 18 years old to use our website.</li>
                <li>You agree not to use our site for any unlawful or prohibited activities.</li>
                <li>We reserve the right to modify or discontinue any part of our services without notice.</li>
              </ul>
            </section>

            {/* Vehicle Listings and Pricing */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Listings and Pricing</h3>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-gray-600">
                <li>All vehicle listings are for informational purposes only and do not constitute a binding offer.</li>
                <li>Prices are subject to change without notice.</li>
                <li>We strive to provide accurate information, but we do not guarantee the accuracy of listings.</li>
              </ul>
            </section>

            {/* Payment and Financing */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment and Financing</h3>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-gray-600">
                <li>Payments for purchases must be made as per the agreed terms.</li>
                <li>Financing options are subject to approval from third-party lenders.</li>
                <li>We are not responsible for financing decisions made by lenders.</li>
              </ul>
            </section>

            {/* Warranties and Disclaimers */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Warranties and Disclaimers</h3>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-gray-600">
                <li>Vehicles are sold “as is,” unless otherwise specified.</li>
                <li>We make no warranties, express or implied, regarding the condition, performance, or longevity of any vehicle.</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-gray-600">
                <li>{dealership_name} shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or services.</li>
                <li>We do not guarantee uninterrupted or error-free operation of our site.</li>
                <li>Zop Dealer, as the website maintainer, is not liable for any technical issues, downtimes, or security breaches affecting the site.</li>
              </ul>
            </section>

            {/* Privacy Policy */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy Policy</h3>
              <p className="text-[15px] leading-relaxed text-gray-600">
                By using our website, you agree to our Privacy Policy, which governs how we collect, use, and protect your personal data.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Intellectual Property</h3>
              <p className="text-[15px] leading-relaxed text-gray-600">
                All content on this website, including text, images, logos, and designs, is owned by {dealership_name} and protected by copyright laws. You may not use, reproduce, or distribute our content without prior written permission.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dispute Resolution</h3>
              <p className="text-[15px] leading-relaxed text-gray-600">
                Any disputes arising out of these Terms shall be resolved through negotiation first. If unresolved, disputes shall be subject to arbitration or legal action in the appropriate jurisdiction.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Changes to Terms</h3>
              <p className="text-[15px] leading-relaxed text-gray-600">
                We reserve the right to update or modify these Terms and Conditions at any time. Continued use of our website after changes are posted constitutes acceptance of the revised terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h3>
              <p className="text-[15px] leading-relaxed text-gray-600 mb-4">
                For any questions regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="text-[15px] text-gray-900">
                <h5 className="text-[17px] font-bold text-gray-900 mb-1">
                  {dealership_name}
                </h5>
                <p className="font-medium">
                  {full_address_1}, {city_1}, {province_1}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Sales: </span>
                  <a href={`tel:${sales_number_1}`} className="text-blue-600 hover:underline">
                    {sales_number_1}
                  </a>
                </p>
              </div>
            </section>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}