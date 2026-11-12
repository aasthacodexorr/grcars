import type { LocationPageConfig } from "@/lib/locationPages";

export interface LocationSEOContentProps {
  data: LocationPageConfig;
}

export default function LocationSEOContent({ data }: LocationSEOContentProps) {
  const seo = data.seoContent;
  if (!seo) return null;

  return (
    <section
      aria-labelledby="location-guide-heading"
      className="w-full bg-light-gray border-t border-gray-200/50 max-w-[1550px] mx-auto px-3 lg:px-14 py-8"
    >
      <div className="bg-white rounded-2xl border border-border-standard p-6 sm:p-8 lg:p-12 shadow-2xs">
        {/* Guide Section (H2) */}
        <h2
          id="location-guide-heading"
          className="font-bold text-gray-900 tracking-tight mb-4"
        >
          {seo.guideHeading}
        </h2>

        {/* Quick Answer box (part of Guide Section H2, speakable target) */}
        {seo.quickAnswer && (
          <div className="quick-answer p-5 rounded-xl bg-blue-50/70 border border-blue-100 my-6">
            <p className="text-gray-800 leading-relaxed font-medium">
              {seo.quickAnswer}
            </p>
          </div>
        )}

        {/* Overview Section */}
        {seo.overview && (
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">
              {seo.overview.heading}
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {seo.overview.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Optional Table Lead */}
            {seo.overview.tableLead && (
              <p className="text-gray-700 mt-4 mb-2 leading-relaxed font-medium">
                {seo.overview.tableLead}
              </p>
            )}

            {/* Overview Table (e.g. Toronto lifestyle table) */}
            {seo.overview.table && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      {seo.overview.table.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-semibold text-gray-900">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {seo.overview.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Structured Sections (Benefits, Trade-offs, Inspection checklist, Sell My Car, etc.) */}
        {seo.sections && seo.sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-8 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">
              {section.heading}
            </h3>
            {section.leadText && (
              <p className="text-gray-700 mb-4 leading-relaxed">
                {section.leadText}
              </p>
            )}
            {section.paragraphs && section.paragraphs.length > 0 && (
              <div className="space-y-4 text-gray-700 leading-relaxed mb-4">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            )}
            {section.items && section.items.length > 0 && (
              <ul className="space-y-3.5 text-gray-700 leading-relaxed mb-4">
                {section.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand mt-2 mr-2.5 shrink-0" />
                    <div>
                      <strong className="text-gray-900 font-semibold">
                        {item.title}{item.title.endsWith("?") ? " " : ": "}
                      </strong>
                      <span>{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {section.table && (
              <div className="my-4 overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      {section.table.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-semibold text-gray-900">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {section.closingNote && (
              <p className="text-gray-700 mt-4 leading-relaxed font-medium">
                {section.closingNote}
              </p>
            )}
          </div>
        ))}

        {/* FAQ Section (H2) */}
        {seo.faqs && seo.faqs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200/70">
            <h2 className="font-semibold text-gray-900 tracking-tight mb-6">
              {seo.faqHeading || "Frequently Asked Questions"}
            </h2>
            <div className="space-y-6">
              {seo.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
