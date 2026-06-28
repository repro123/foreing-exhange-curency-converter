"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { getCurrencyFlag, shortenCurrencyName } from "@/lib/utils";

import ArrowDown from "@/components/SVGs/ArrowDown";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";

function CurrencySelect({
  currencies,
  popularCurrencies,
  otherCurrencies,
  paramKey,
}) {
  const { from, to, updateParams } = useCurrencyParams();

  const selectedCode = paramKey === "from" ? from : to;
  const disabledCode = paramKey === "from" ? to : from;

  const selected = currencies.find((c) => c.iso_code === selectedCode) ?? null;

  const handleChange = (isoCode) => {
    if (isoCode === disabledCode) return;

    updateParams({
      [paramKey]: isoCode,
    });
  };

  const allCurrencies = [
    {
      value: "Popular",
      items: popularCurrencies,
    },
    {
      value: "Other Currencies",
      items: otherCurrencies,
    },
  ];

  return (
    <Combobox
      items={allCurrencies}
      value={selectedCode}
      onValueChange={handleChange}
    >
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="w-fit justify-between font-normal bg-border border-border"
          >
            {" "}
            {selected ? (
              <span className="flex items-center gap-2">
                {/* eslint-disable @next/next/no-img-element  */}
                <img
                  src={`/flags/${getCurrencyFlag(selected.iso_code)}.webp`}
                  alt={`${selected.name} flag`}
                  width={12}
                  height={12}
                  loading="eager"
                />
                <span className="preset-4">{selected.iso_code}</span>
                <ArrowDown />
              </span>
            ) : (
              <span>Select currency</span>
            )}
          </Button>
        }
      />
      <ComboboxContent className="w-64">
        <ComboboxInput showTrigger={false} placeholder="Search currencies..." />
        <ComboboxEmpty>No currencies found.</ComboboxEmpty>
        <ComboboxList>
          {(group, index) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel className="flex items-center justify-between border-b">
                <span>{group.value}</span> <span>{group.items.length}</span>
              </ComboboxLabel>
              <ComboboxCollection>
                {(item) => {
                  const isDisabled = item.iso_code === disabledCode;

                  return (
                    <ComboboxItem
                      key={item.iso_code}
                      value={item.iso_code}
                      disabled={isDisabled}
                      aria-label={
                        isDisabled
                          ? `${item.iso_code} is already selected as the ${
                              paramKey === "from" ? "receive" : "send"
                            } currency`
                          : undefined
                      }
                    >
                      <img
                        src={`/flags/${getCurrencyFlag(item.iso_code)}.webp`}
                        alt={`${item.name} flag`}
                        width={12}
                        height={12}
                        loading="lazy"
                      />
                      <span className="preset-4">{item.iso_code}</span>{" "}
                      <span className="preset-5 text-nav">
                        {shortenCurrencyName(item.name)}
                      </span>
                      {isDisabled && (
                        <span className="preset-6 ml-auto text-nav">
                          Selected
                        </span>
                      )}
                    </ComboboxItem>
                  );
                }}
              </ComboboxCollection>
              {index < allCurrencies.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default CurrencySelect;
