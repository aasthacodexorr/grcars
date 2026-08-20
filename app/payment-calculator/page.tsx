'use client';
import { Footer, Header } from '@/components/layout';
import { useAppConfig } from '@/app/providers';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Car, DollarSign, Calendar, CreditCard, Plus } from 'lucide-react';
import pc1 from "@/assets/cars/PC1.jpg"
import pc2 from "@/assets/cars/PC2.jpg"
import pc3 from "@/assets/cars/PC3.jpg"
import { motion, AnimatePresence } from 'framer-motion';
import FaqAccordion from '@/components/common/FaqAccordion';

const steps = [
    {
        id: 1,
        icon: Car,
        title: 'Enter Vehicle Price',
        description: "Start by entering the price of the vehicle you're interested in to get a base estimate.",
    },
    {
        id: 2,
        icon: DollarSign,
        title: 'Add Down Payment & Trade-In',
        description: 'Include your down payment or trade-in amount to see how it affects your loan total.',
    },
    {
        id: 3,
        icon: Calendar,
        title: 'Select Loan Term & Interest Rate',
        description: 'Select your preferred loan duration and estimated rate to customize your payment plan.',
    },
    {
        id: 4,
        icon: CreditCard,
        title: 'View Your Estimated Monthly Payment',
        description: 'See your estimated monthly payment instantly and adjust details until it fits your budget.',
    },
];


const faqs = [
    {
        q: "What does the car payment calculator do?",
        a: "Our car payment calculator in Ontario helps you estimate your monthly car payments based on your vehicle price, down payment, loan term, and interest rate. It’s a quick way to plan your budget before applying for auto financing."
    },
    {
        q: "How accurate is the car payment calculator?",
        a: "The calculator gives a close estimate based on the details you enter. Actual payment amounts may vary depending on lender rates, credit profile, and additional costs such as taxes or warranty coverage. For exact figures, our finance team will confirm the details after reviewing your application."
    },
    {
        q: "Can I use the calculator for used cars?",
        a: "Yes. The calculator works for both used and select new vehicles in our inventory. Most customers use it to estimate payments for used car financing in Brampton and across Ontario."
    },
    {
        q: "Does using the payment calculator affect my credit score?",
        a: "No. Using the car payment calculator does not require a credit check. It’s a free tool designed to help you estimate payments without any impact on your credit score."
    },
    {
        q: "How do I apply once I know my estimated car payment?",
        a: "Once you’ve calculated your estimated payment, you can complete our Finance Application form online. Our finance experts will then contact you with real-time lender rates and approval options."
    },
    {
        q: "Do you offer financing for customers with bad credit or no credit?",
        a: "Yes. We work with multiple lenders who provide flexible solutions for every credit situation. Whether you have excellent, limited, or no credit history, our finance team will help you find an approval plan that fits your needs."
    }
];

const ESSENTIAL_PACKAGE_PRICES: Record<'A' | 'B', number> = {
    A: 1799,
    B: 2499,
};


export default function PaymentCalculator() {
    const appConfig = useAppConfig();
    // Input States
    const [vehiclePrice, setVehiclePrice] = useState<number>(appConfig?.payment_calculator?.vehicle_price);
    const [downPayment, setDownPayment] = useState<number>(appConfig?.payment_calculator?.downpayment);
    const [additionalFees, setAdditionalFees] = useState<number>(appConfig?.payment_calculator?.additional_fees ?? 0);
    const [packageClass, setPackageClass] = useState<'A' | 'B' | null>('A');
    const [gapFee, setGapFee] = useState<number>(0);
    const [warrantyCost, setWarrantyCost] = useState<number>(0);
    const [term, setTerm] = useState<number>(84);
    const [tradeInValue, setTradeInValue] = useState<number>(0);
    const [loanBalance, setLoanBalance] = useState<number>(0);
    const [apr, setApr] = useState<number>(7.99);
    const [includeTax, setIncludeTax] = useState<boolean>(false);
    const [includeSecureGard, setIncludeSecureGard] = useState<boolean>(false);
    const [includeTireGard, setIncludeTireGard] = useState<boolean>(false);
    // Output State
    const [biWeeklyPayment, setBiWeeklyPayment] = useState<string>('0.00');
    const [desiredPayment, setDesiredPayment] = useState<string>('');

    // Loan Calculation Logic
    useEffect(() => {
        // Essential Package = Class A or Class B (if selected) + any manually entered additional fee
        const essentialPackageCost = (packageClass ? ESSENTIAL_PACKAGE_PRICES[packageClass] : 0) + additionalFees;

        const secureGardFee = includeSecureGard ? 499 : 0;
        const tireGardFee = includeTireGard ? 399 : 0;
        // Total Principal = Vehicle Price + Essential Package + Gap Protection + Extended Warranty + Existing Loan Balance - Down Payment - Trade-in
        const basePrincipal =
            vehiclePrice +
            essentialPackageCost +
            gapFee +
            warrantyCost +
            secureGardFee +
            tireGardFee +
            loanBalance -
            downPayment -
            tradeInValue;

        // Simulate simple 13% tax add-on if checked (adjust rate as per your specific region)
        const totalPrincipal = includeTax ? basePrincipal * 1.13 : basePrincipal;

        if (totalPrincipal <= 0 || term <= 0) {
            setBiWeeklyPayment('0.00');
            return;
        }

        // Convert Annual APR to a Bi-Weekly Interest Rate
        // There are 26 bi-weekly periods in a year
        const annualRate = apr / 100;
        const biWeeklyRate = annualRate / 26;

        // Convert Month term to total number of bi-weekly payments
        // Approximation: (Months * 12) / 26 periods a year -> or roughly Months * 2.166
        const totalPayments = (term / 12) * 26;

        let payment = 0;
        if (biWeeklyRate === 0) {
            payment = totalPrincipal / totalPayments;
        } else {
            // Standard Amortization Formula: P * (r(1+r)^n) / ((1+r)^n - 1)
            payment =
                (totalPrincipal * biWeeklyRate * Math.pow(1 + biWeeklyRate, totalPayments)) /
                (Math.pow(1 + biWeeklyRate, totalPayments) - 1);
        }

        setBiWeeklyPayment(payment.toFixed(2));
    }, [vehiclePrice, downPayment, additionalFees, packageClass, gapFee, warrantyCost, term, tradeInValue, loanBalance, apr, includeTax, includeSecureGard, includeTireGard]);


    return (
        <>
            <Header />
            <div className='bg-gray-400/20 lg:px-44 mt-36 lg:mt-10'>
                <div className="lg:mt-20 mx-auto px-5 lg:px-0 py-8 lg:py-12 font-sans text-gray-700">
                    <h1 className="text-3xl md:text-5xl font-bold mb-8 text-black">Payment Calculator</h1>

                    <div className=' bg-white'>
                        <div className="grid grid-cols-1 md:grid-cols-3">

                            {/* Left Form Column (Spans 2 columns) */}
                            <div className="md:col-span-2 bg-white px-6 py-10 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-x-7 border-r border-slate-200">

                                <div>
                                    <label className="block text-black  text-base font-lg mb-1">Vehicle Price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-[12px] text-xl font-light text-input-text">$</span>
                                        <input
                                            type="number"
                                            value={vehiclePrice || ''}
                                            onChange={(e) => setVehiclePrice(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-3 rounded-xl border border-border-lightGray transition-all duration-200 outline-none  focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-black text-base font-lg mb-1">Down Payment</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-[12px] text-xl font-light text-input-text">$</span>
                                        <input
                                            type="number"
                                            value={downPayment || ''}
                                            onChange={(e) => setDownPayment(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-3 rounded-xl border border-border-lightGray focus:outline-none focus:ring-1  focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Essential Package - Class A / Class B toggle */}
                                <div>
                                    <label className="block text-black text-base font-lg mb-2">Essential Package</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {(['A', 'B'] as const).map((cls) => (
                                            <button
                                                key={cls}
                                                type="button"
                                                onClick={() => setPackageClass(packageClass === cls ? null : cls)}
                                                className={`flex items-center justify-between gap-5 min-w-[130px] px-4 lg:px-3 py-3 border rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${packageClass === cls
                                                    ? 'text-white border-none bg-brand-gradient'
                                                    : 'bg-white text-gray-700 border-slate-300 hover:bg-brand-gradient hover:text-white hover:border-transparent'
                                                    }`}
                                            >
                                                <span>Class {cls}</span>
                                                <span>$ {ESSENTIAL_PACKAGE_PRICES[cls].toLocaleString()}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-black text-base font-lg mb-1">Additional Package</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-[12px] text-xl font-light text-input-text">$</span>
                                        <input
                                            type="number"
                                            value={additionalFees || ''}
                                            placeholder="0.00"
                                            onChange={(e) => setAdditionalFees(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-3 rounded-xl border border-border-lightGray focus:outline-none focus:ring-1  focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-black text-base font-lg mb-1">Gap Protection</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-[12px] text-xl font-light text-input-text">$</span>
                                        <input
                                            type="number"
                                            value={gapFee || ''}
                                            onChange={(e) => setGapFee(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-3 rounded-xl border border-border-lightGray focus:outline-none focus:ring-1  focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-black text-base font-lg mb-1">Extended Warranty</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-[12px] text-xl font-light text-input-text">$</span>
                                        <input
                                            type="number"
                                            value={warrantyCost || ''}
                                            onChange={(e) => setWarrantyCost(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-3 rounded-xl border border-border-lightGray focus:outline-none focus:ring-1  focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-black text-base font-lg mb-1">Estimated APR</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={apr}
                                            onChange={(e) => setApr(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-3 rounded-xl border border-border-lightGray focus:outline-none focus:ring-1  focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-[12px] text-input-text">%</span>
                                    </div>
                                </div>

                                {/* Term Radio Toggle Buttons */}
                                <div className="sm:col-span-2">
                                    <label className="block text-black text-base font-medium mb-3 text-black">Term (Months)</label>
                                    <div className="flex flex-wrap gap-1 p-1">
                                        {[12, 24, 36, 48, 60, 72, 84, 96].map((m) => {
                                            return (
                                                <button
                                                    key={m}
                                                    type="button"
                                                    onClick={() => setTerm(m)}
                                                    className={`px-7 py-3 text-sm font-medium rounded-xl cursor-pointer border transition-colors duration-200 ${term === m
                                                        ? 'text-white border-brand bg-brand-gradient'
                                                        : 'border-slate-300 text-gray-700 hover:bg-brand-gradient hover:text-white hover:border-transparent'
                                                        }`}
                                                >
                                                    {m}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-black text-base font-lg mb-1">Trade-In Value</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-[12px] text-xl font-light text-input-text">$</span>
                                        <input
                                            type="number"
                                            value={tradeInValue || ''}
                                            onChange={(e) => setTradeInValue(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-3 rounded-xl border border-border-lightGray focus:outline-none focus:ring-1 focus: -blue-400 focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-black text-base font-lg mb-1">Existing vehicle loan balance</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-[12px] text-xl font-light text-input-text">$</span>
                                        <input
                                            type="number"
                                            value={loanBalance || ''}
                                            onChange={(e) => setLoanBalance(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-3 rounded-xl border border-border-lightGray focus:outline-none focus:ring-1  focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 flex items-center mt-2 gap-3">
                                    <div className='flex justify-center items-center'>
                                        <input
                                        id="sales-tax"
                                        type="checkbox"
                                        checked={includeTax}
                                        onChange={(e) => setIncludeTax(e.target.checked)}
                                        className="h-4 w-4 text-emerald-600 "
                                    />
                                    <label htmlFor="sales-tax" className="ml-2 text-base font-medium text-gray-700 select-none">
                                        Include Sales Tax
                                    </label>
                                    </div>

                                    <div className='flex justify-center items-center'>
                                        <input
                                        id="secure-gard"
                                        type="checkbox"
                                        checked={includeSecureGard}
                                        onChange={(e) => setIncludeSecureGard(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                    />
                                    <label htmlFor="secure-gard" className="ml-2 text-base font-medium text-gray-700 select-none cursor-pointer">
                                        Include Secure-Gard
                                    </label>
                                    </div>

                                    <div className='flex justify-center items-center'>
                                        <input
                                        id="tire-gard"
                                        type="checkbox"
                                        checked={includeTireGard}
                                        onChange={(e) => setIncludeTireGard(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                    />
                                    <label htmlFor="tire-gard" className="ml-2 text-base font-medium text-gray-700 select-none cursor-pointer">
                                        Include Tire-Gard
                                    </label>
                                    </div>

                                </div>

                            </div>

                            {/* Right Output Sidebar Box */}
                            <div className="bg-white px-2 lg:px-6 lg:py-9 flex flex-col justify-between h-fit text-center">
                                <div>
                                    <p className="text-xl lg:text-sm tracking-wider mb-4">
                                        Based on your input, your estimated payment:
                                    </p>
                                    <h4 className="text-md font-semibold text-gray-600 my-8">Bi-Weekly Payment</h4>
                                    <h3 className="text-4xl font-bold text-gray-900 mb-8">${biWeeklyPayment}</h3>

                                    <Link href={"/finance"}>

                                        <button className="w-full cursor-pointer text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm mb-6 hover:brightness-95 bg-brand-gradient">
                                            Get pre-approved
                                        </button>


                                    </Link>
                                </div>

                                <div className=" ">
                                    <label className="block text-base mb-2 text-left">Desired Bi-Weekly Payment</label>
                                    <div className="relative mb-3">
                                        <span className="absolute left-3 top-[9px] text-input-text">$</span>
                                        <input
                                            type="number"
                                            value={desiredPayment}
                                            onChange={(e) => setDesiredPayment(e.target.value)}
                                            className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1  focus:ring-4 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className=" bg-black hover:bg-gray-800 text-white text-xs font-bold py-4 px-4 rounded-xl cursor-pointer uppercase tracking-wider transition-colors"
                                    >
                                        Adjust Bi-Weekly
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Disclosures Section */}
                        <div className="px-6 pt-4 lg:pt-6 pb-14">
                            <p className="font-semibold mb-1 text-gray-700 text-base">Finance disclosures</p>
                            <p className='text-sm leading-relaxed'>
                                The payment estimator is not an advertisement or offer for specific terms of credit and actual terms may vary. Payment amounts presented are for illustrative purposes only and may not be available. Actual vehicle price may vary by Dealer. The Estimated Monthly Payment amount calculated is based on the variables entered, the price of the vehicle you entered, the term you select, the down payment you enter, the Annual Percentage Rate (APR) you select, and any net trade-in amount. The payment estimate displayed does not include taxes, title, license and/or registration fees. Payment amount is for illustrative purposes only. Actual prices may vary by Dealer. Payment amounts may be different due to various factors such as fees, specials, rebates, term, down payment, APR, net trade-in, and applicable tax rate. Actual APR is based on available finance programs and the creditworthiness of the customer. Not all customers will qualify for credit or for the lowest rate. Please contact an authorized dealer for actual rates, program details and actual terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* New Sections */}
            <div className="mt-16 max-w-[1400px] mx-auto space-y-20 bg-white p-6 md:p-12 text-gray-800 ">

                {/* Section 1: How Our Car Payment Calculator Works */}
                <section className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                        How Our Car Payment Calculator Works
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => {
                            const IconComponent = step.icon;
                            return (
                                <Link
                                    href={"/inventory"}
                                    key={idx}
                                    className={`bg-white rounded-xl p-8 text-center transition-all duration-200 cursor-pointer hover:border-2 hover:border-blue-500 shadow-sm border border-gray-200/80 hover:shadow-md`}
                                >
                                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-base md:text-xl text-slate-900 mb-3 px-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-base text-gray-500 leading-relaxed">
                                        {step.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Section 2: Your Financing Options */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-36">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Your Financing Options</h2>
                        <p className="text-base text-black leading-relaxed mb-4">
                            We make financing simple for every customer. As an OMVIC-licensed dealer and proud UCDA member, we provide flexible solutions across Ontario, including Brampton, Mississauga, Toronto, Caledon, and Oakville.
                        </p>
                        <p className="text-base text-black leading-relaxed mb-4">
                            Our finance experts work with multiple lenders to offer:
                        </p>
                        <ul className="space-y-3 mb-6">
                            {[
                                'Approvals for all credit types',
                                'Quick application processing',
                                'Personalized payment terms',
                                'Transparent communication at every step',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center space-x-3 text-base text-black font-medium">
                                    <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                        ✓
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-base text-black">
                            You can calculate your payment first, then apply online for pre-approval through our{' '}
                            <Link href="/finance" className="text-blue-600 font-medium">
                                Finance Application
                            </Link>
                            .
                        </p>
                    </div>

                    <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={pc1?.src}
                            alt="Car Keys and Cash"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </section>

                {/* Section 3: Plan Ahead With Confidence */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1 relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={pc2?.src}
                            alt="Man working on laptop near car"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold text-black mb-4">Plan Ahead With Confidence</h2>
                        <p className="text-base leading-relaxed mb-4">
                            The car payment calculator is designed to help you make informed decisions before you visit our indoor showroom.
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            By comparing different down payments, loan terms, and rates, you&apos;ll see how each choice affects your monthly payment. It&apos;s a simple way to budget for your next car and explore financing that fits your lifestyle.
                        </p>
                        <p className="text-base leading-relaxed">
                            If you already have a vehicle to trade in, include its estimated value in the calculator for a more accurate result.
                        </p>
                    </div>
                </section>

                {/* Section 4: Explore Vehicles to Calculate Payments On */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Explore Vehicles to Calculate Payments On
                        </h2>
                        <p className="text-base text-black leading-relaxed mb-6">
                            Use our calculator to plan financing for any car in our{' '}
                            <Link href="/inventory" className="text-blue-600 hover:text-blue-700">
                                current inventory
                            </Link>
                            . With more than 300 vehicles to choose from, there&apos;s something for every driver and every budget, including:
                        </p>

                        <ul className="space-y-4">
                            {[
                                { title: 'Sedans', desc: 'great for daily commuting' },
                                { title: 'SUVs and crossovers', desc: 'practical and family-friendly' },
                                { title: 'Trucks and vans', desc: 'ideal for work and heavy-duty needs' },
                                { title: 'Coupes and hatchbacks', desc: 'stylish and compact options' },
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-3 text-base text-black">
                                    <span className="w-6 h-6 bg-green-600 text-white p-1 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                                        ✓
                                    </span>
                                    <span>
                                        <strong className="text-black">{item.title}</strong> – {item.desc}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={pc3?.src}
                            alt="Man next to car using tablet"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </section>





            </div>

            {/* 6. FAQ Accordion Section */}
            <section className="bg-[#F0F4FA] py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-900 mb-12">
                        Frequently Asked Questions About the Car Payment Calculator in Ontario
                    </h2>
                    <div className="space-y-2">
                        <FaqAccordion faqs={faqs} />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}