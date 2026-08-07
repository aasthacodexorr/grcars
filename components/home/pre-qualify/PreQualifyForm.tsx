"use client";

import React from "react";
import { APR_MAP, LOAN_TERMS } from "./constants";
import type { PreQualifyFormProps } from "./types";

const PreQualifyForm = ({
  vehiclePrice,
  downPayment,
  loanTerm,
  creditScore,
  includeTradeIn,
  tradeInValue,
  onVehiclePriceChange,
  onDownPaymentChange,
  onLoanTermChange,
  onCreditScoreChange,
  onIncludeTradeInToggle,
  onTradeInValueChange,
}: PreQualifyFormProps) => {
  const labelStyle = "block text-xs sm:text-sm font-semibold text-gray-700 mb-2";
  const inputStyle =
    "w-full h-11 px-3 text-sm sm:text-base border border-gray-900 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-all";

  return (
    <div className="space-y-6">
      {/* Row 1: 3 Column Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Vehicle Price */}
        <div>
          <label className={labelStyle}>Vehicle Price</label>
          <input
            type="number"
            value={vehiclePrice}
            onChange={(e) => onVehiclePriceChange(e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* Down Payment */}
        <div>
          <label className={labelStyle}>Down Payment</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => onDownPaymentChange(e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* Loan Term */}
        <div>
          <label className={labelStyle}>Loan Term</label>
          <select
            value={loanTerm}
            onChange={(e) => onLoanTermChange(e.target.value)}
            className={`${inputStyle} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_12px_center] bg-no-repeat pr-8`}
          >
            {LOAN_TERMS.map((m) => (
              <option key={m} value={m}>
                {m} Months
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Interest Rate (Full Width) */}
      <div>
        <label className={labelStyle}>Interest Rate (APR)</label>
        <select
          value={creditScore}
          onChange={(e) => onCreditScoreChange(e.target.value)}
          className={`${inputStyle} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_12px_center] bg-no-repeat pr-8`}
        >
          {Object.keys(APR_MAP).map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
      </div>

      {/* Row 3: Trade-In Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onIncludeTradeInToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            includeTradeIn ? "bg-[#00D084]" : "bg-gray-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              includeTradeIn ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm font-bold text-gray-900">Include Trade-In</span>
      </div>

      {/* Conditional Trade-In Input */}
      {includeTradeIn && (
        <div className="pt-2">
          <label className={labelStyle}>Trade-In Value</label>
          <input
            type="number"
            value={tradeInValue}
            onChange={(e) => onTradeInValueChange(e.target.value)}
            className={inputStyle}
          />
        </div>
      )}
    </div>
  );
};

export default PreQualifyForm;