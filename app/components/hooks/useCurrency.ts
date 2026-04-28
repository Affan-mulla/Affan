"use client";

import { useEffect, useState } from "react";

export type CurrencyInfo = {
  symbol: string;
  code: "USD" | "GBP" | "INR";
  locale: string;
};

type CurrencyState = CurrencyInfo & { isLoading: boolean };

const USD: CurrencyInfo = { symbol: "$", code: "USD", locale: "en-US" };
const GBP: CurrencyInfo = { symbol: "£", code: "GBP", locale: "en-GB" };
const INR: CurrencyInfo = { symbol: "₹", code: "INR", locale: "en-IN" };

const EUROPEAN_COUNTRIES = new Set([
  "GB",
  "IE",
  "FR",
  "DE",
  "IT",
  "ES",
  "NL",
  "BE",
  "CH",
  "AT",
  "SE",
  "NO",
  "DK",
  "FI",
  "PT",
  "PL",
  "CZ",
  "HU",
  "RO",
  "GR",
  "HR",
  "SK",
  "SI",
  "EE",
  "LV",
  "LT",
  "BG",
  "CY",
  "LU",
  "MT",
]);

function getCurrency(countryCode: string): CurrencyInfo {
  if (countryCode === "IN") return INR;
  if (EUROPEAN_COUNTRIES.has(countryCode)) return GBP;
  return USD;
}

export function useCurrency(): CurrencyState {
  const [state, setState] = useState<CurrencyState>({ ...USD, isLoading: true });

  useEffect(() => {
    let cancelled = false;

    const detect = async () => {
      try {
        // Try ipapi.co first (free, reliable)
        const res = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(4000),
        });
        if (!res.ok) throw new Error("ipapi failed");
        const data = (await res.json()) as { country_code?: string };
        if (cancelled) return;
        const currency = getCurrency(data.country_code ?? "US");
        setState({ ...currency, isLoading: false });
      } catch {
        // Fallback: try ip-api.com
        try {
          const res2 = await fetch("http://ip-api.com/json/?fields=countryCode", {
            signal: AbortSignal.timeout(3000),
          });
          const data2 = (await res2.json()) as { countryCode?: string };
          if (cancelled) return;
          const currency = getCurrency(data2.countryCode ?? "US");
          setState({ ...currency, isLoading: false });
        } catch {
          // Both failed — default to USD
          if (!cancelled) setState({ ...USD, isLoading: false });
        }
      }
    };

    detect();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
