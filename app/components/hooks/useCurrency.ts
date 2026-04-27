"use client";

import { useEffect, useState } from "react";

export type CurrencyInfo = {
  symbol: string;
  code: string;
  locale: string;
};

type CurrencyState = CurrencyInfo & {
  isLoading: boolean;
};

const USD_DEFAULT: CurrencyInfo = {
  symbol: "$",
  code: "USD",
  locale: "en-US",
};

export const conversionRates: Record<string, number> = {
  USD: 1,
  INR: 83,
  GBP: 0.79,
};

function getCurrencyByCountry(countryCode?: string): CurrencyInfo {
  switch (countryCode) {
    case "IN":
      return { symbol: "₹", code: "INR", locale: "en-IN" };
    case "GB":
      return { symbol: "£", code: "GBP", locale: "en-GB" };
    default:
      return USD_DEFAULT;
  }
}

export function formatPrice(usdAmount: number, currency: CurrencyInfo): string {
  const rate = conversionRates[currency.code] ?? 1;
  const convertedAmount = usdAmount * rate;

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(convertedAmount);
}

export function useCurrency(): CurrencyState {
  const [currency, setCurrency] = useState<CurrencyInfo>(USD_DEFAULT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCurrency = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          throw new Error("Unable to detect country");
        }

        const data = (await response.json()) as { country_code?: string };
        if (isMounted) {
          setCurrency(getCurrencyByCountry(data.country_code));
        }
      } catch {
        if (isMounted) {
          setCurrency(USD_DEFAULT);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCurrency();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    ...currency,
    isLoading,
  };
}
