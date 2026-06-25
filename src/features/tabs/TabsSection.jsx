"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";

import LogPanel from "@/features/logs/LogPanel";
import FavoritesPanel from "@/features/favorites/FavoritesPanel";

import { useLogsStore } from "@/store/useLogsStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import ComparePanel from "@/features/compare/ComparePanel";

function TabsSection() {
  const urlParams = useSearchParams();
  const router = useRouter();

  const logs = useLogsStore((state) => state.logs);
  const logsHydrated = useLogsStore((state) => state.hydrated);

  const favorites = useFavoritesStore((state) => state.favorites);
  const favoritesHydrated = useFavoritesStore((state) => state.hydrated);

  const items = [
    { label: "History", value: "history" },
    { label: "Compare", value: "compare" },
    {
      label: "Favorites",
      value: "favorites",
      count: favoritesHydrated ? favorites.length : null,
    },
    {
      label: "Logs",
      value: "logs",
      count: logsHydrated ? logs.length : null,
    },
  ];

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

  const selectedItem = items.find((item) => item.value === activeTab);

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
              <span className="flex items-center gap-2">
                <span>{selectedItem?.label}</span>
                {selectedItem?.count != null && selectedItem?.count > 0 && (
                  <span className="preset-6 bg-primary/20 text-primary rounded-full p-1">
                    {selectedItem.count}
                  </span>
                )}
              </span>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="preset-3"
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.count != null && item.count > 0 && (
                        <span className="preset-6 text-nav">{item.count}</span>
                      )}
                    </span>
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
                <span className="flex items-center gap-1">
                  {item.label}
                  {item.count != null && item.count > 0 && (
                    <span className="preset-6 bg-primary/20 text-primary rounded-full p-1">
                      {item.count}
                    </span>
                  )}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="history" className="mt-4">
          History
        </TabsContent>

        <TabsContent value="compare" className="mt-4">
          <ComparePanel />
        </TabsContent>

        <TabsContent value="favorites" className="mt-4">
          <FavoritesPanel />
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <LogPanel />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default TabsSection;
