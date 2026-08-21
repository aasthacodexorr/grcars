"use client"
import { GetInTouch } from '@/components/common';
import { Footer, Header } from '@/components/layout';
import supportImg from "@/assets/cars/supportContact.jpg"
import { useAppConfig } from '../providers';
import { getConstants } from '@/constants';
import { useEffect, useState } from 'react';

export default function ContactUs() {
    const appConfig = useAppConfig();
    const SITE_CONFIG = getConstants(appConfig).SITE_CONFIG;
    const [iframeHeight, setIframeHeight] = useState(640);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== "https://gediroute.zopsoftware.com") {
                return;
            }

            const data = event.data;

            if (
                data &&
                typeof data === "object" &&
                data.type === "css" &&
                data.element_id === "contact_us" &&
                typeof data.value === "number"
            ) {
                setIframeHeight(Math.ceil(data.value));
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const locations = [
        {
            id: 'Brampton',
            name: 'Brampton',
            address: '316 Orenda Rd\nBrampton, ON\nL6T 1G1',
            phone: '1-855-895-9800',
            mapSrc:
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.4300984651895!2d-79.70557192332906!3d43.70161014929783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3e7bd56f8457%3A0xcf19d3086ece63bf!2s316%20Orenda%20Rd%2C%20Brampton%2C%20ON%20L6T%201G1%2C%20Canada!5e0!3m2!1sen!2sin!4v1713623875572!5m2!1sen!2sin',
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Smooth scroll to element by ID
    const scrollToLocation = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-white text-gray-800 font-sans lg:mt-32 mt-36">
                {/* Locations Header Nav */}
                {/* <div id="top-back" className="py-8 text-center border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2 mb-4 text-xl font-semibold tracking-wide uppercase text-black">
                        <span className="text-red-600">📍</span>
                        <span>5 Locations To Serve You Better</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto px-4">
                        {locations.map((loc) => (
                            <a
                                key={loc.id}
                                href={`#${loc.id}`}
                                onClick={(e) => scrollToLocation(e, loc.id)}
                                className="px-10 py-2 border border-black text-md uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors duration-200 rounded-full cursor-pointer"
                            >
                                {loc.name}
                            </a>
                        ))}
                    </div>
                </div> */}

                {/* Hero / Contact Overview */}
                <section className="max-w-[1280px] mx-auto px-6 lg:px-2 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                        <div>
                            <span className="text-base lg:text-xl font-bold uppercase text-gray-400 block mb-2">
                                CONTACT US
                            </span>
                            <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
                                Got a question? We’re
                                <br />
                                here to help.
                            </h1>
                        </div>
                        <div>
                            <img
                                src={supportImg?.src}
                                alt="Support Representative"
                                className="w-full object-cover shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Contact Methods & Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-b pb-12 border-gray-100 pt-12">
                        {/* Left Column: Call / Text & Chat */}
                        <div className="space-y-10">
                            {/* Call Section */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-gray-900">Call or text us</h3>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Our Customer Support team is available via telephone 7 days a week. You can also check out our{' '}
                                    <a href="#" className="underline font-medium hover:text-black">
                                        FAQ Page
                                    </a>{' '}
                                    for more information.
                                </p>
                                <ul className="text-lg text-gray-600 space-y-1 py-1">
                                    <li>
                                        <strong className="text-gray-800">Monday – Friday:</strong> 10am – 8pm
                                    </li>
                                    <li>
                                        <strong className="text-gray-800">Saturday:</strong> 10am – 7pm
                                    </li>
                                    <li>
                                        <strong className="text-gray-800">Sunday:</strong> 11am – 6pm
                                    </li>
                                </ul>
                                <a
                                    href="tel:9052478040"
                                    className="inline-block bg-black text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    (905) 247-8040
                                </a>
                            </div>

                            {/* Chat Section */}
                            {/* <div className="space-y-3 pt-6 border-t border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900">Chat with us</h3>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    We’re here for you in real time. Chat with our Customer Support team, or send in your question overnight and we’ll get back to you the next day.
                                </p>
                                <ul className="text-lg text-gray-600 space-y-1 py-1">
                                    <li>
                                        <strong className="text-gray-800">Monday – Friday:</strong> 10am – 8pm
                                    </li>
                                    <li>
                                        <strong className="text-gray-800">Saturday:</strong> 10am – 7pm
                                    </li>
                                    <li>
                                        <strong className="text-gray-800">Sunday:</strong> 11am – 6pm
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    className="inline-block bg-black text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    Start live chat
                                </a>
                            </div> */}
                        </div>

                        {/* Right Column: Contact Form Iframe Container */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Submit a question</h3>
                            <p className="text-xl text-black mb-6">
                                Submit a question through our contact form below and we’ll get back to you as soon as possible.
                            </p>
                            <div
                                className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                                style={{ height: `${iframeHeight}px` }}
                            >
                                <iframe
                                    id="contact_us"
                                    src={`${SITE_CONFIG?.urls.contactUsBaseUrl}`}
                                    name="iframe_a"
                                    className="w-full h-full border-none block"
                                    title="Contact Form"
                                    scrolling="no"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location Sections with Embedded Maps */}
                <section className="mb-10">
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            id={loc.id}
                            className="scroll-mt-36" /* Offsets sticky headers during scroll */
                        >
                            <div className="max-w-[1280px] pb-12 border-b border-gray-200 mx-auto px-6 lg:px-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-extrabold text-gray-900">{loc.name}</h3>
                                    <p className="text-xl text-gray-600 whitespace-pre-line leading-relaxed">
                                        {loc.address}
                                    </p>
                                    <p className="text-xl text-gray-800">
                                        phone:{' '}
                                        <a
                                            href={`tel:${loc.phone}`}
                                            className="font-bold hover:underline"
                                        >
                                            {loc.phone}
                                        </a>
                                    </p>
                                    <button
                                        onClick={scrollToTop}
                                        className="inline-block bg-black text-white cursor-pointer text-lg font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors mt-2"
                                    >
                                        Back to top
                                    </button>
                                </div>
                                <div className="w-full h-[350px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                    <iframe
                                        src={loc.mapSrc}
                                        className="w-full h-full border-none"
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`${loc.name} Location Map`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
            <Footer />
        </>
    );
}