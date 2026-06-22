"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const items = [
  { label: "History", value: "history" },
  { label: "Compare", value: "compare" },
  { label: "Favorites", value: "favorites" },
  { label: "Logs", value: "logs" },
];

function TabsSection({ searchParams }) {
  const activeTab = searchParams?.tab || "history";

  const urlParams = useSearchParams();
  const router = useRouter();
  console.log(urlParams);

  const handleTabChange = (value) => {
    console.log(value);
    const params = new URLSearchParams(urlParams.toString());

    params.set("tab", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <section className="mt-8 pb-8">
      <div className="md:hidden">
        <Select items={items} value={activeTab} onValueChange={handleTabChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="History" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:block">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList variant="line">
            {items.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}

export default TabsSection;
