"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PreQualifyForm from "./PreQualifyForm";
import { APR_MAP } from "./constants";
import carImg from "@/assets/cars/buying.avif"


const PreQualify = () => {
  const [vehiclePrice, setVehiclePrice] = useState("25000");
  const [downPayment, setDownPayment] = useState("0");
  const [loanTerm, setLoanTerm] = useState("96");
  const [creditScore, setCreditScore] = useState("Good");
  const [includeTradeIn, setIncludeTradeIn] = useState(false);
  const [tradeInValue, setTradeInValue] = useState("0");

  // Derived values
  const rate = APR_MAP[creditScore] ?? 7.99;
  const price = parseFloat(vehiclePrice) || 0;
  const down = parseFloat(downPayment) || 0;
  const tradeIn = includeTradeIn ? parseFloat(tradeInValue) || 0 : 0;
  const loanAmount = Math.max(0, price - down - tradeIn);

  // Bi-weekly amortization calculation (26 periods per year)
  const termPeriods = ((parseInt(loanTerm) || 0) / 12) * 26;
  const periodRate = rate / 100 / 26;

  let biWeeklyPayment = 0;
  if (loanAmount > 0 && periodRate > 0 && termPeriods > 0) {
    biWeeklyPayment =
      (loanAmount * periodRate * Math.pow(1 + periodRate, termPeriods)) /
      (Math.pow(1 + periodRate, termPeriods) - 1);
  }

  return (
    <section className="w-full bg-[#f8f9fa] py-12 md:py-12 px-5 sm:px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Heading, Subtitle & Car Image */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-black tracking-tight leading-tight">
            Know your buying power
          </h2>
          <p className="text-black text-base leading-relaxed">
            At Gedi Route Cars, we go above and beyond for our customers — and that’s why we’re recognized as one of the best used car dealerships in Brampton.
          </p>

          <div className="relative w-full max-w-[440px] pt-4">
            <Image
              src={carImg?.src}
              alt="Car Preview"
              width={500}
              height={260}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Column: Calculator Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
          <PreQualifyForm
            vehiclePrice={vehiclePrice}
            downPayment={downPayment}
            loanTerm={loanTerm}
            creditScore={creditScore}
            includeTradeIn={includeTradeIn}
            tradeInValue={tradeInValue}
            onVehiclePriceChange={setVehiclePrice}
            onDownPaymentChange={setDownPayment}
            onLoanTermChange={setLoanTerm}
            onCreditScoreChange={setCreditScore}
            onIncludeTradeInToggle={() => setIncludeTradeIn(!includeTradeIn)}
            onTradeInValueChange={setTradeInValue}
          />

          {/* Payment Result Section */}
          <div className="mt-8 pt-4 flex flex-col md:items-end md:text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-4xl font-light lg:text-[42px] font-black text-slate-900 leading-7">
                ${biWeeklyPayment.toFixed(2)}
              </span>
              <span className="text-base text-black">
                at {rate.toFixed(2)}% APR
              </span>
            </div>

            <p className="text-base mt-2">
              Not ready to pre-qualify?{" "}
              <Link href="/inventory" className="text-[#0088FF] font-medium hover:underline">
                Shop by estimated budget
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PreQualify;