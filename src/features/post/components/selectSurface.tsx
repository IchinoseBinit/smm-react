"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { useContentTypeStore } from "../lib/store/Sufaceselect";

export const SelectSurface = () => {
  const { type, setType } = useContentTypeStore();

  return (
    <Select.Root
      collection={frameworks}
      value={type}
      defaultValue={["POST"]}
      size="sm"
      width="120px"
      onValueChange={
        (val) => setType(val.value.map((str) => str)) // ✅ update store
      }
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "Post", value: "POST" },
    { label: "Story", value: "STORY" },
  ],
});
