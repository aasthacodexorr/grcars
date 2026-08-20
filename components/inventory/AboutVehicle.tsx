"use client";

import { Fuel, PaintBucket, Palette, Radiation } from "lucide-react";
import { motion, Variants } from "framer-motion"; // Imported

const AboutVehicle = ({ vehicle }: any) => {
  // Animation rules for items container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  // Animation rules for individual cards
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };


  console.log(vehicle, "Vvvvvvvvvvvvv");

  return (
    <div id="vehicle-details-section" className="bg-card border-none rounded-xl p-0 w-full -mt-3">
      <motion.h2
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-[30px] font-semibold text-black text-center mb-[2px]"
      >
        Vehicle Details
      </motion.h2>
      <div className="max-w-4xl mx-auto py-8 px-4">


        {/* Details Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6"
        >
          {/* MPG */}
          {vehicle?.mpg && (
            <motion.div variants={itemVariants} className="border-b border-gray-200  pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-[#228be6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" aria-hidden="true">
                    <path fill="currentColor" d="M13 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-2h1a1 1 0 1 0 0-2h-1V7h2a1 1 0 1 0 0-2zM24.5 5a1 1 0 1 0 0 2c2.826 0 5.625.544 8.235 1.602a21.5 21.5 0 0 1 6.976 4.557 21 21 0 0 1 4.656 6.812A20.6 20.6 0 0 1 46 28c0 2.755-.555 5.483-1.633 8.029a21 21 0 0 1-4.656 6.812 21.5 21.5 0 0 1-6.976 4.557A21.95 21.95 0 0 1 24.5 49a1 1 0 1 0 0 2c3.083 0 6.136-.594 8.986-1.748a23.5 23.5 0 0 0 7.623-4.98 a23 23 0 0 0 5.1-7.463A22.6 22.6 0 0 0 48 28c0-3.024-.61-6.017-1.792-8.81a23 23 0 0 0-5.099-7.461 23.5 23.5 0 0 0-7.623-4.981A23.95 23.95 0 0 0 24.5 5"></path>
                    <path fill="currentColor" d="M24 10a1 1 0 0 1 1-1 19 19 0 0 1 0 38 1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v2.97a17 17 0 0 0 4.527-.894l-.797-1.792a1 1 0 1 1 1.828-.813l.812 1.828.007.017a17 17 0 0 0 4.435-3.09l-2.52-2.519a1 1 0 0 1 1.415-1.414l2.46 2.46a17 17 0 0 0 2.119-3.313l-1.809-.708a1 1 0 0 1 .73-1.862l1.847.723A17 17 0 0 0 41.97 29H39a1 1 0 1 1 0-2h2.97a17 17 0 0 0-.906-4.563l-1.846.757a1 1 0 0 1-.759-1.85l1.84-.755a17 17 0 0 0-2.21-3.436l-2.382 2.383a1 1 0 0 1-1.414-1.415l2.431-2.431a17 17 0 0 0-4.314-2.99l-.762 1.82a1 1 0 0 1-1.845-.773l.76-1.811A17 17 0 0 0 26 11.029V14a1 1 0 1 1-2 0zM11 43a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-2v1h1a1 1 0 1 1 0 2h-1v1h2a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1z"></path>
                    <path fill="currentColor" d="M33.88 23.634a1 1 0 1 0-1-1.732l-6.613 3.818a3 3 0 0 0-4.9 2.829l-.867.5a1 1 0 1 0 1 1.732l.868-.5a3 3 0 0 0 4.9-2.829z"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">MPG</span>
                  <span className="font-bold text-[18px] text-[#0B2545] leading-snug">
                    {vehicle?.mpg}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Drivetrain */}
          {vehicle?.drivetrain && (
            <motion.div variants={itemVariants} className="border-b border-gray-200 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-[#228be6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" aria-hidden="true">
                    <path fill="currentColor" d="M52 11.249A3.25 3.25 0 0 0 48.75 8h-3.503A3.25 3.25 0 0 0 42 11.25v1.503A3.25 3.25 0 0 0 45.248 16h3.503A3.25 3.25 0 0 0 52 12.752zM10.751 8A3.25 3.25 0 0 1 14 11.25v1.503A3.25 3.25 0 0 1 10.75 16H7.248A3.25 3.25 0 0 1 4 12.752v-1.503A3.25 3.25 0 0 1 7.248 8zM10.751 40A3.25 3.25 0 0 1 14 43.25v1.503A3.25 3.25 0 0 1 10.75 48H7.248A3.25 3.25 0 0 1 4 44.752v-1.503A3.25 3.25 0 0 1 7.248 40zM48.751 48A3.25 3.25 0 0 0 52 44.752v-1.503A3.25 3.25 0 0 0 48.75 40h-3.503A3.25 3.25 0 0 0 42 43.25v1.503A3.25 3.25 0 0 0 45.248 48z"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M10 19a1 1 0 1 0-2 0v5.126a4.002 4.002 0 0 0 0 7.748V37a1 1 0 1 0 2 0v-5.126A4.01 4.01 0 0 0 12.874 29h30.252A4.01 4.01 0 0 0 46 31.874V37a1 1 0 0 0 2 0v-5.126a4.002 4.002 0 0 0 0-7.748V19a1 1 0 1 0-2 0v5.126A4.01 4.01 0 0 0 43.126 27H12.874A4.01 4.01 0 0 0 10 24.126zm37 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-36 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0" clipRule="evenodd"></path>
                    <path fill="currentColor" d="M37 24a1 1 0 0 1-1 1H20a1 1 0 0 1 0-2h16a1 1 0 0 1 1 1M36 33a1 1 0 1 0 0-2H20a1 1 0 0 0 0 2z"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">Drivetrain</span>
                  <span className="font-bold text-[15px] text-[#0B2545] leading-snug">
                    {vehicle?.drivetrain}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Exterior Color */}
          {vehicle?.exterior_color && (
            <motion.div variants={itemVariants} className="border-b border-gray-200  pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-[#228be6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="M14.5 3a3.45 3.45 0 0 0-3.107 1.945L5.046 18.022A10.4 10.4 0 0 0 4 22.575C4 28.343 8.752 33 14.5 33S25 28.343 25 22.575c0-1.578-.358-3.134-1.046-4.553L17.607 4.945A3.45 3.45 0 0 0 14.5 3m-1.307 2.819a1.453 1.453 0 0 1 2.614 0l6.347 13.077A8.4 8.4 0 0 1 23 22.574C23 27.219 19.164 31 14.5 31S6 27.218 6 22.575c0-1.275.29-2.533.846-3.68z" clipRule="evenodd"></path>
                    <path fill="currentColor" d="M28.816 12c-.57 0-1.105.28-1.43.748l-2.208 3.182a1 1 0 0 0 1.644 1.14l1.95-2.811 6.423 13.66c.53 1.127.805 2.359.805 3.605v.208a8.268 8.268 0 0 1-15.891 3.2l-.187-.444a1 1 0 0 0-1.844.774l.187.445A10.27 10.27 0 0 0 27.732 42C33.402 42 38 37.403 38 31.732v-.208c0-1.54-.34-3.062-.995-4.457L30.39 13c-.287-.61-.9-1-1.575-1"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">Exterior color</span>
                  <span className="font-bold text-[18px] text-[#0B2545] leading-snug">
                    {vehicle?.exterior_color}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Interior Color */}
          {vehicle?.interior_color && (
            <motion.div variants={itemVariants} className="border-b border-gray-200  pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-[#228be6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" aria-hidden="true">
                    <path stroke="currentColor" d="M17.066 8.577a4.32 4.32 0 0 0-6.056 0l-2.327 2.29a4.29 4.29 0 0 0 0 6.116 2.29 2.29 0 0 1 0 3.267 4.29 4.29 0 0 0 0 6.117 2.29 2.29 0 0 1 0 3.266 4.29 4.29 0 0 0 0 6.117 2.29 2.29 0 0 1 0 3.267 4.29 4.29 0 0 0 0 6.117l2.327 2.289a4.32 4.32 0 0 0 6.056 0 2.32 2.32 0 0 1 3.251 0 4.32 4.32 0 0 0 6.057 0 2.32 2.32 0 0 1 3.252 0 4.32 4.32 0 0 0 6.057 0 2.32 2.32 0 0 1 3.25 0 4.32 4.32 0 0 0 6.057 0l2.327-2.29a4.29 4.29 0 0 0 0-6.117 2.29 2.29 0 0 1 0-3.266 4.29 4.29 0 0 0 0-6.117 2.29 2.29 0 0 1 0-3.266 4.29 4.29 0 0 0 0-6.117 2.29 2.29 0 0 1 0-3.267 4.29 4.29 0 0 0 0-6.117L44.99 8.577a4.32 4.32 0 0 0-6.056 0 2.32 2.32 0 0 1-3.251 0 4.32 4.32 0 0 0-6.057 0 2.32 2.32 0 0 1-3.252 0 4.32 4.32 0 0 0-6.057 0 2.32 2.32 0 0 1-3.25 0"></path>
                    <path stroke="currentColor" d="M25.879 17.393a1 1 0 1 1 1.414 1.415l-8.485 8.485a1 1 0 0 1-1.415-1.415zM36.293 18.293a1 1 0 0 1 1.414 1.414l-18 18a1 1 0 0 1-1.414-1.414zM37.192 28.707a1 1 0 0 1 1.415 1.414l-8.486 8.485a1 1 0 0 1-1.414-1.414z"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">Interior</span>
                  <span className="font-bold text-[18px] text-[#0B2545] leading-snug">
                    {vehicle?.interior_color}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Seating */}
          {vehicle?.passengers && (
            <motion.div variants={itemVariants} className="border-b border-gray-200  pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-[#228be6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" aria-hidden="true">
                    <path fill="currentColor" d="M25 41.752a.75.75 0 0 0-.752-.752h-3.42c-.39 0-.773.09-1.121.265l-.52.26a4.5 4.5 0 0 1-2.014.475h-4.346c-.7 0-1.39-.163-2.014-.476l-.52-.26A2.5 2.5 0 0 0 9.173 41H5.752a.75.75 0 0 0-.752.752v3.496c0 .415.337.752.752.752h18.496a.75.75 0 0 0 .752-.752zm26 0a.75.75 0 0 0-.752-.752h-3.42c-.39 0-.773.09-1.121.265l-.52.26a4.5 4.5 0 0 1-2.014.475h-4.346c-.7 0-1.39-.163-2.014-.476l-.52-.26a2.5 2.5 0 0 0-1.12-.264h-3.421a.75.75 0 0 0-.752.752v3.496c0 .415.337.752.752.752h18.496a.75.75 0 0 0 .752-.752zM10.6 21.084a1 1 0 0 1 1.316.516l7 15a1 1 0 1 1-1.832.8l-7-15a1 1 0 0 1 .516-1.316m33.484.516a1 1 0 1 1 1.832.8l-7 15a1 1 0 1 1-1.832-.8zM18 10.752a.75.75 0 0 0-.752-.752h-4.496a.75.75 0 0 0-.752.752v.496c0 .415.337.752.752.752h4.496a.75.75 0 0 0 .752-.752zm26 0a.75.75 0 0 0-.752-.752h-4.496a.75.75 0 0 0-.752.752v.496c0 .415.337.752.752.752h4.496a.75.75 0 0 0 .752-.752zm-22 9.752A2.504 2.504 0 0 0 19.496 18h-8.992A2.504 2.504 0 0 0 8 20.504V39h1.173c.7 0 1.39.163 2.015.476l.519.26c.348.173.731.264 1.12.264h4.346c.389 0 .772-.09 1.12-.265l.52-.26A4.5 4.5 0 0 1 20.827 39H22zm26 0A2.504 2.504 0 0 0 45.496 18h-8.992A2.504 2.504 0 0 0 34 20.504V39h1.173c.7 0 1.39.163 2.014.476l.52.26c.348.173.731.264 1.12.264h4.346c.389 0 .772-.09 1.12-.265l.52-.26A4.5 4.5 0 0 1 46.827 39H48zM24 39h.248A2.75 2.75 0 0 1 27 41.752v3.496A2.75 2.75 0 0 1 24.248 48H5.752A2.75 2.75 0 0 1 3 45.248v-3.496A2.75 2.75 0 0 1 5.752 39H6V20.504A4.504 4.504 0 0 1 10.504 16h8.992A4.504 4.504 0 0 1 24 20.504zm26 0h.248A2.75 2.75 0 0 1 53 41.752v3.496A2.75 2.75 0 0 1 50.248 48H31.752A2.75 2.75 0 0 1 29 45.248v-3.496A2.75 2.75 0 0 1 31.752 39H32V20.504A4.504 4.504 0 0 1 36.504 16h8.992A4.504 4.504 0 0 1 50 20.504zM20 11.248A2.75 2.75 0 0 1 17.248 14h-4.496A2.75 2.75 0 0 1 10 11.248v-.496A2.75 2.75 0 0 1 12.752 8h4.496A2.75 2.75 0 0 1 20 10.752zm26 0A2.75 2.75 0 0 1 43.248 14h-4.496A2.75 2.75 0 0 1 36 11.248v-.496A2.75 2.75 0 0 1 38.752 8h4.496A2.75 2.75 0 0 1 46 10.752z"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">Seating</span>
                  <span className="font-bold text-[18px] text-[#0B2545] leading-snug">
                    {vehicle?.passengers}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Engine */}
          {vehicle?.engine && (
            <motion.div variants={itemVariants} className="border-b border-gray-200  pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-[#228be6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" aria-hidden="true">
                    <path fill="currentColor" d="M17 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1M25 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1M33 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M24.228 27.918c-.863 0-1.321-1.02-.748-1.665l5.665-6.37c.363-.408 1.026-.02.845.498l-1.637 4.701h3.42c.863 0 1.32 1.02.747 1.665l-5.664 6.37c-.364.409-1.026.02-.846-.497l1.638-4.702zm2.227-2 .054-.06.026.06zm3.036 1.225-.026-.06h.08z" clipRule="evenodd"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M10 33a6 6 0 0 0 6 6h12.417a3 3 0 0 1 2.458 1.28l1.709 2.44A3 3 0 0 0 35.04 44H43a1 1 0 0 0 .97-.758l.48-1.917c.305.12.623.18.92.202 1.074.083 2.367-.26 3.426-.596.265-.084.633-.207.972-.407.354-.21.733-.538.943-1.058.405-.997.721-2.75.935-4.247.216-1.512.354-2.968.354-3.433V30a3 3 0 0 0-3-3h-3v-4h-.303c.184-.581.303-1.323.303-2.273C46 16.94 42.98 14 39.273 14H15a5 5 0 0 0-5 5v1c0 1.178.303 2.129.808 2.874q.044.064.09.126H10v2H9v-6.5a2.5 2.5 0 0 0-5 0v17a2.5 2.5 0 0 0 5 0V29h1zm2-8h7a1 1 0 1 0 0-2h-3.944l-.092-.005a4 4 0 0 1-.37-.044 4 4 0 0 1-1.118-.348 2.56 2.56 0 0 1-1.013-.852c-.257-.38-.463-.93-.463-1.751v-1a3 3 0 0 1 3-3h24.273C41.89 16 44 18.06 44 20.727c0 1.457-.337 2.047-.486 2.245l-.01.014-.012.014H39a1 1 0 1 0 0 2h5v5h-5a1 1 0 1 0 0 2h5v.917l-.98 5.88-.8 3.203H35.04a1 1 0 0 1-.819-.426l-1.709-2.441A5 5 0 0 0 28.418 37H16a4 4 0 0 1-4-4v-1h7a1 1 0 1 0 0-2h-7zm34 8.083V29h3a1 1 0 0 1 1 1v1.786c0 .308-.118 1.637-.334 3.15-.218 1.529-.51 3.042-.808 3.778q.002.003-.013.018a.5.5 0 0 1-.096.071c-.123.073-.296.138-.559.222-1.07.34-2.024.558-2.665.508-.304-.023-.408-.099-.433-.123-.007-.007-.079-.072-.09-.336zM7 23.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0M6.5 33q-.257 0-.5-.05v2.55a.5.5 0 0 0 1 0v-2.55q-.243.05-.5.05m0-12q-.257 0-.5.05V18.5a.5.5 0 0 1 1 0v2.55a2.5 2.5 0 0 0-.5-.05" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">Engine</span>
                  <span className="font-bold text-[18px] text-[#0B2545] leading-snug">
                    {vehicle?.engine}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Transmission */}
          {vehicle?.transmission && (
            <motion.div variants={itemVariants} className="border-b border-gray-200  pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-[#228be6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0m5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6" clipRule="evenodd"></path>
                    <path fill="currentColor" d="M45 20a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H29v-7a1 1 0 1 0-2 0v7H13v-7a1 1 0 1 0-2 0v16a1 1 0 1 0 2 0v-7h14v7a1 1 0 1 0 2 0v-7h13a3 3 0 0 0 3-3z"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M44 31a1 1 0 0 1 1 1v7.1a5.002 5.002 0 0 1-1 9.9 5 5 0 0 1-1-9.9V32a1 1 0 0 1 1-1m0 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6M28 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m-3 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0M39 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0m5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6M23 44a5 5 0 1 1 10 0 5 5 0 0 1-10 0m5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6M12 39a5 5 0 1 0 0 10 5 5 0 0 0 0-10m-3 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">Transmission</span>
                  <span className="font-bold text-[18px] text-[#0B2545] leading-snug">
                    {vehicle?.transmission}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Fuel Type */}
          {vehicle?.fuel_type && (
            <motion.div variants={itemVariants} className="border-b border-gray-200  pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-[#228be6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="M28.969 11C30.549 11 32 12.185 32 13.845v7.31C32 22.815 30.55 24 28.969 24H18.03C16.451 24 15 22.815 15 21.155v-7.31C15 12.185 16.45 11 18.031 11zM18.03 13c-.662 0-1.031.467-1.031.845v7.31c0 .378.369.845 1.031.845H28.97c.662 0 1.031-.467 1.031-.845v-7.31c0-.378-.369-.845-1.031-.845z" clipRule="evenodd"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M29.236 5C33.485 5 37 8.335 37 12.518V23.66h1.88c1.03 0 2.036.412 2.789 1.059.755.649 1.331 1.606 1.331 2.731V38c0 1.2.844 2.05 2 2.05s2-.85 2-2.05V21.463a4 4 0 1 1-2.395-7.444l-5.312-5.312a1 1 0 1 1 1.414-1.414l7.414 7.414c.56.56.879 1.312.879 2.112V38c0 2.26-1.696 4.05-4 4.05s-4-1.79-4-4.05V27.45c0-.414-.215-.852-.635-1.214-.422-.363-.974-.576-1.485-.576H37V48h1a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h1V12.379C10 8.284 13.43 5.013 17.598 5L17.609 5zM17.62 7C14.48 7 12 9.448 12 12.379V48h23V12.518C35 9.509 32.45 7 29.236 7zM45 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">Fuel type</span>
                  <span className="font-bold text-[18px] text-[#0B2545] leading-snug">
                    {vehicle?.fuel_type}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Number of Keys */}
          {vehicle?.door && (
            <motion.div variants={itemVariants} className="border-b border-gray-200 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eaf5ff] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-[#228be6]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 18V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                    <path d="M14 12h2" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 leading-tight">Number of doors</span>
                  <span className="font-bold text-[18px] text-[#0B2545] leading-snug">
                    {vehicle?.door}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default AboutVehicle;