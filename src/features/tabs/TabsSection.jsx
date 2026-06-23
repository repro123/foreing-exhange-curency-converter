"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

function TabsSection() {
  const urlParams = useSearchParams();
  const router = useRouter();

  const activeTab = urlParams.get("tab") || "history";
  const handleTabChange = (value) => {
    const params = new URLSearchParams(urlParams.toString());

    if (value === "history") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="mt-8 pb-8">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="md:hidden">
          <Select
            items={items}
            value={activeTab}
            onValueChange={handleTabChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="History" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="preset-3"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="hidden md:block">
          <TabsList variant="line">
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="preset-3"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="history" className="mt-8">
          History
        </TabsContent>
        <TabsContent value="compare" className="mt-8">
          Compare
        </TabsContent>
        <TabsContent value="favorites" className="mt-8">
          Fvorites
        </TabsContent>
        <TabsContent value="logs" className="mt-8">
          Logs
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default TabsSection;
