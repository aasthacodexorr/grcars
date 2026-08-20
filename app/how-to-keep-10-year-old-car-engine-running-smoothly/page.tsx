import FaqAccordion from "@/components/common/FaqAccordion";
import { Footer, Header } from "@/components/layout";
import Image from "next/image";
import Link from "next/link";

export default function BlogPost() {
  const faqData = [
    {
      q: "Is a 10-year-old car too old to keep?",
      a: "Not necessarily. A vehicle’s condition, mileage, maintenance history, corrosion, and reliability are generally more useful indicators than age alone. A properly maintained 10-year-old vehicle can still have substantial useful life remaining.",
    },
    {
      q: "How often should I change the oil in a 10-year-old car?",
      a: "Follow the oil-change interval specified in your vehicle’s owner’s manual rather than choosing an interval based solely on age. Driving conditions, engine design, mileage, and the specified oil can all affect the appropriate interval. Check the oil level regularly between services.",
    },
    {
      q: "What maintenance is most important for an older engine?",
      a: "Engine oil, coolant, belts and hoses, spark plugs, filters, leaks, and the battery/charging system deserve regular attention. The manufacturer’s maintenance schedule should remain your primary guide because requirements vary by vehicle.",
    },
    {
      q: "Is it worth repairing a 10-year-old car?",
      a: "It can be. Compare the repair cost with the vehicle’s overall condition, market value, reliability, upcoming maintenance, and the cost of replacing it. A single repair doesn’t necessarily justify replacing an otherwise dependable vehicle, while repeated major repairs may make upgrading more practical.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Top Header */}
      <Header/>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 mt-32 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Blog Article Main Section */}
        <article className="lg:col-span-2">
          {/* Header Meta */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
            How to Keep a 10-Year-Old Car Engine Running Smoothly
          </h1>
          <p className="text-base text-gray-500 mb-6">
            by <span className="text-gray-900">Web Admin</span> | Aug 10, 2026 |{" "}
            <span className="text-gray-900">Maintenance</span> | 0 comments
          </p>

          {/* Hero Image */}
          <div className="mb-6 relative h-[380px] w-full">
            <Image
              src="https://grcars.b-cdn.net/wp-content/uploads/2026/08/Gloved-Hands-Service-Technician-Engine1.jpg"
              alt="Gloved Hands Service Technician Engine"
              fill
              className="object-cover rounded"
              priority
            />
          </div>

          {/* Keywords / Tags */}
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">
            10-year-old car maintenance, older car engine maintenance, high-mileage car maintenance, extend car engine life, used car maintenance tips
          </p>

          {/* Intro */}
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              A 10-year-old car does not automatically mean an unreliable car. With consistent maintenance and attention to early warning signs, many modern vehicles can remain dependable well beyond the 10-year mark.
            </p>
            <p>
              The key is understanding that an older engine may need closer monitoring than it did when the vehicle was new. Components age, rubber parts deteriorate, fluids become contaminated, and minor leaks can turn into expensive problems when ignored.
            </p>
            <p>
              If you want to get more years out of your vehicle, here is how to keep a 10-year-old car engine running smoothly.
            </p>
          </div>

          {/* 1 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Follow the Manufacturer’s Maintenance Schedule</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">The best starting point is your vehicle’s owner’s manual.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Maintenance requirements vary considerably between makes, models, engines, and driving conditions. Instead of relying on a generic service interval, check the manufacturer’s recommendations for oil changes, coolant, spark plugs, transmission service, timing belts, and other important components.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">This becomes particularly important as a vehicle approaches or passes 100,000 miles (about 160,000 km), when components such as spark plugs, water pumps, timing belts, and coolant hoses may require attention depending on the vehicle.</p>
            <p className="text-base text-gray-700 leading-relaxed">Keeping maintenance records is also worthwhile. A detailed service history helps you know exactly what has already been replaced and what may be coming due.</p>
          </section>

          {/* 2 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Never Neglect Engine Oil Changes</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Engine oil is one of the most important factors affecting engine longevity.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-4">Oil lubricates moving engine components, reduces friction, assists with cooling, and helps keep contaminants under control. As oil ages, its ability to perform these jobs declines.</p>
            <p className="text-base font-semibold mb-2">For a 10-year-old vehicle:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-4">
              <li>Check the engine oil level regularly.</li>
              <li>Follow the manufacturer’s oil-change interval.</li>
              <li>Use the oil viscosity and specification recommended for your engine.</li>
              <li>Watch for unexplained drops in the oil level.</li>
              <li>Inspect your parking area for oil spots or leaks.</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Older engines may consume or leak more oil than newer ones, making regular oil-level checks especially valuable.</p>
            <p className="text-base text-gray-700 leading-relaxed">Avoid automatically switching to thicker oil simply because the vehicle is old. Use the manufacturer’s recommended specification unless a qualified technician advises otherwise for your particular engine.</p>
          </section>

          {/* 3 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Pay Close Attention to the Cooling System</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Overheating can cause severe engine damage, so maintaining the cooling system should be a priority on an older vehicle.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-4">Check the coolant reservoir periodically when the engine is cold. If the coolant level repeatedly drops after being topped up, have the system inspected for leaks.</p>
            <p className="text-base font-semibold mb-2">Also inspect the:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-4">
              <li>Radiator</li>
              <li>Coolant hoses</li>
              <li>Water pump</li>
              <li>Thermostat</li>
              <li>Radiator cap</li>
              <li>Cooling fans</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Rubber hoses deteriorate due to heat, age, pressure, and contamination. Cracked, swollen, brittle, leaking, or unusually soft hoses should be inspected by a technician.</p>
            <p className="text-base text-gray-700 leading-relaxed bg-amber-50 p-3 border-l-4 border-amber-400">
              <strong>Safety note:</strong> Never remove a radiator cap while the engine is hot because the cooling system may be under pressure.
            </p>
          </section>

          {/* 4 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Inspect Belts Before They Fail</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Drive belts operate important accessories such as the alternator and, on some vehicles, the water pump and power-steering system.</p>
            <p className="text-base font-semibold mb-2">Look for warning signs such as:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-4">
              <li>Cracking</li>
              <li>Fraying</li>
              <li>Missing pieces</li>
              <li>Glazing</li>
              <li>Squealing or chirping noises</li>
              <li>Oil contamination</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mb-3">A broken belt can quickly leave you stranded and, depending on what it drives, may contribute to overheating.</p>
            <p className="text-base text-gray-700 leading-relaxed">If your engine uses a <strong>timing belt</strong>, its replacement interval deserves special attention. Timing belts have manufacturer-specific mileage and age limits. A failed timing belt can cause major engine damage in certain engine designs. Check your owner’s manual or maintenance records if you are unsure whether yours has already been replaced.</p>
          </section>

          {/* 5 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Replace Spark Plugs When Required</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Spark plugs are responsible for igniting the air-fuel mixture inside a gasoline engine.</p>
            <p className="text-base font-semibold mb-2">As plugs wear, you might notice symptoms including:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-4">
              <li>Rough idling</li>
              <li>Difficult starting</li>
              <li>Engine misfires</li>
              <li>Hesitation during acceleration</li>
              <li>Increased fuel consumption</li>
              <li>Check-engine warning lights</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Do not assume that every rough-running engine simply needs new spark plugs, however. Fuel, ignition, sensor, compression, and air-intake problems can produce similar symptoms.</p>
            <p className="text-base text-gray-700 leading-relaxed">A proper diagnosis can prevent unnecessary repairs.</p>
          </section>

          {/* 6 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Keep the Engine Air Filter Clean</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Your engine needs a steady supply of clean air.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">A dirty or heavily restricted engine air filter can affect engine performance. Inspect and replace it according to the manufacturer’s recommendations, with additional attention if the vehicle regularly operates in dusty environments.</p>
            <p className="text-base text-gray-700 leading-relaxed">Air filters are relatively inexpensive, making this one of the simpler preventive-maintenance items to stay on top of.</p>
          </section>

          {/* 7 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Check for Fluid Leaks Regularly</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">A few drops underneath a 10-year-old car shouldn’t automatically be dismissed as “normal.”</p>
            <p className="text-base font-semibold mb-2">Leaks can originate from several systems, including:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-4">
              <li>Engine oil</li>
              <li>Engine coolant</li>
              <li>Transmission fluid</li>
              <li>Power-steering fluid on applicable vehicles</li>
              <li>Brake fluid</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Look underneath your usual parking spot occasionally.</p>
            <p className="text-base text-gray-700 leading-relaxed">You can also inspect the engine compartment for wet areas, stains, residue, or unusual smells. Finding a small leak early can sometimes prevent a much more expensive repair later.</p>
          </section>

          {/* 8 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Don’t Ignore the Check Engine Light</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Modern vehicles continuously monitor numerous engine and emissions-related systems. When the check engine light appears, the vehicle has detected a fault that should be diagnosed.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">A steady check-engine light may indicate anything from a relatively minor emissions problem to a developing engine issue. A <strong>flashing check-engine light generally requires more urgent attention</strong>, as it can indicate a severe misfire that may damage the catalytic converter.</p>
            <p className="text-base text-gray-700 leading-relaxed">Rather than replacing parts based on guesses, have the diagnostic trouble codes read and the underlying problem properly diagnosed.</p>
          </section>

          {/* 9 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Maintain the Battery and Charging System</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Your battery doesn’t directly lubricate or cool the engine, but a healthy electrical system is essential for reliable starting and modern engine management.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Inspect battery terminals for corrosion and make sure connections remain secure.</p>
            <p className="text-base font-semibold mb-2">If your car:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-4">
              <li>Cranks slowly,</li>
              <li>Frequently needs a boost,</li>
              <li>Has dim or flickering lights, or</li>
              <li>Displays battery/charging warnings,</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mb-3">have the battery and charging system tested.</p>
            <p className="text-base text-gray-700 leading-relaxed">Older vehicles can also develop grounding and electrical-connection problems, so diagnosing repeated battery issues is better than simply replacing batteries.</p>
          </section>

          {/* 10 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Let the Engine Warm Up Through Gentle Driving</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">You generally don’t need to leave a modern gasoline vehicle idling for a long time before driving.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">After starting, allow the engine to settle briefly and drive gently until it reaches normal operating temperature. Avoid hard acceleration and high engine speeds immediately after a cold start.</p>
            <p className="text-base text-gray-700 leading-relaxed">Gentle operation allows the engine oil and other components to reach their normal operating conditions without unnecessary stress.</p>
          </section>

          {/* 11 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Fix Strange Noises Early</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">One advantage of owning the same vehicle for years is that you become familiar with how it normally sounds and feels. Pay attention when something changes.</p>
            <p className="text-base font-semibold mb-2">Potential warning signs include:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-4">
              <li>Knocking or tapping</li>
              <li>Squealing</li>
              <li>Grinding</li>
              <li>Rattling</li>
              <li>Rough idle</li>
              <li>Excessive vibration</li>
              <li>Loss of power</li>
              <li>Unusual exhaust smoke</li>
              <li>Burning smells</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed">A new noise doesn’t necessarily mean catastrophic engine failure, but delaying an inspection can allow a relatively manageable issue to become a costly repair.</p>
          </section>

          {/* 12 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Avoid Repeatedly Driving With Very Low Fuel</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Making a habit of driving until the tank is nearly empty isn’t ideal. Maintaining a reasonable fuel level reduces the chances of unexpectedly running out and helps ensure the fuel system has a consistent supply.</p>
            <p className="text-base text-gray-700 leading-relaxed">More importantly, if your older vehicle suddenly develops hard starting, hesitation, poor acceleration, or unusual fuel consumption, don’t automatically blame its age. Have the fuel and engine-management systems properly diagnosed.</p>
          </section>

          {/* 13 */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Give Your Older Car Regular Professional Inspections</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Routine inspections become increasingly valuable as vehicles age.</p>
            <p className="text-base font-semibold mb-2">Ask a qualified technician to periodically check areas such as:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-4">
              <li>Engine and transmission leaks</li>
              <li>Cooling system</li>
              <li>Belts and hoses</li>
              <li>Battery and charging system</li>
              <li>Ignition components</li>
              <li>Suspension</li>
              <li>Steering</li>
              <li>Brakes</li>
              <li>Exhaust</li>
              <li>Tires</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed">Preventive inspections can uncover worn components before they result in roadside breakdowns.</p>
          </section>

          {/* How Long */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How Long Can a 10-Year-Old Car Last?</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">There is no universal expiration date for a vehicle.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Age matters, but mileage, maintenance history, climate, driving conditions, corrosion, previous repairs, and the reliability of the particular model can matter just as much.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">A well-maintained 10-year-old vehicle may still have considerable useful life remaining, while a poorly maintained younger vehicle can develop expensive problems much sooner.</p>
            <p className="text-base text-gray-900 font-bold mb-1">The better question is:</p>
            <p className="text-base text-gray-800 font-semibold italic mb-3">Does the vehicle’s condition justify the cost of keeping it on the road?</p>
            <p className="text-base text-gray-700 leading-relaxed">Consider its reliability, safety, upcoming maintenance requirements, repair costs, market value, and how well it meets your current needs.</p>
          </section>

          {/* Replacing */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">When Does Replacing an Older Car Make More Sense?</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Good maintenance can extend a vehicle’s life, but there comes a point when repairs may no longer make financial or practical sense.</p>
            <p className="text-base font-semibold mb-2">You may want to consider another vehicle when:</p>
            <ul className="list-disc pl-5 text-base text-gray-700 space-y-1 mb-6">
              <li>Major repairs repeatedly occur.</li>
              <li>Engine or transmission repairs approach the vehicle’s value.</li>
              <li>Rust or structural deterioration becomes significant.</li>
              <li>Reliability is interfering with work or daily life.</li>
              <li>The vehicle no longer meets your space or transportation needs.</li>
              <li>Safety concerns become difficult or expensive to address.</li>
            </ul>

            <div className="space-y-3 text-base text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
              <p>
                If you’ve reached that stage, you can{" "}
                <Link href="https://www.grcars.ca/inventory/" className="text-gray-900 underline font-medium">
                  explore the latest inventory
                </Link>{" "}
                to compare available vehicles and determine whether upgrading makes more sense than continuing to repair your current car.
              </p>
              <p>
                If purchasing another vehicle would require financing, you can also{" "}
                <Link href="https://www.grcars.ca/finance/" className="text-gray-900 underline font-medium">
                  apply for car financing
                </Link>{" "}
                and review potential options.
              </p>
              <p>
                Before deciding on a budget, use the{" "}
                <Link href="https://www.grcars.ca/payment-calculator/" className="text-gray-900 underline font-medium">
                  car payment calculator
                </Link>{" "}
                to estimate payments based on the vehicle price and financing details.
              </p>
              <p>
                And if you’re ready to replace your current 10-year-old vehicle, you can{" "}
                <Link href="https://www.grcars.ca/trade-in-appraisal/" className="text-gray-900 underline font-medium">
                  sell your car the smart way
                </Link>{" "}
                by requesting a trade-in appraisal.
              </p>
            </div>
          </section>

          {/* Final Thoughts */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Final Thoughts</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Keeping a 10-year-old car engine running smoothly is less about finding a secret maintenance trick and more about consistency.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Follow your manufacturer’s maintenance schedule, check the oil and fluids regularly, maintain the cooling system, inspect aging belts and hoses, address warning lights promptly, and investigate new noises or leaks before they become larger problems.</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">Most importantly, don’t assume a car needs replacing simply because it has reached its tenth birthday. Evaluate its actual mechanical condition and maintenance history.</p>
            <p className="text-base text-gray-700 leading-relaxed">With appropriate preventive care, an older vehicle can remain a reliable and economical part of your daily routine for years to come.</p>
          </section>

          {/* Accordion FAQs */}
          <section className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FaqAccordion faqs={faqData}/>
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-100 p-6 rounded-md sticky top-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-base uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-base text-gray-900">
              <li><Link href="#">Auto News</Link></li>
              <li><Link href="#">Car Buying Guide</Link></li>
              <li><Link href="#">Financing</Link></li>
              <li><Link href="#">Maintenance</Link></li>
              <li><Link href="#">Uncategorized</Link></li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}