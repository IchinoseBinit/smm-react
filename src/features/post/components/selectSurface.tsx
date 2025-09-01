"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { useContentTypeStore } from "../lib/store/sufaceType";

export const SelectSurface = () => {
  const { surfaceType, setSurfaceType } = useContentTypeStore();

  return (
    <Select.Root
      collection={frameworks}
      value={surfaceType}
      defaultValue={["POST"]}
      size="sm"
      width="120px"
      borderRadius={7}
      backgroundColor={"#f7f7f7"}
      onValueChange={
        (val) => setSurfaceType(val.value.map((str) => str)) // ✅ update store
      }
    >
      <Select.HiddenSelect />
      <Select.Control borderRadius={7}>
        <Select.Trigger borderRadius={7} border={"1px solid #ebebeb"}>
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
  )
};

const frameworks = createListCollection({
  items: [
    { label: "Post", value: "POST" },
    { label: "Story", value: "STORY" },
  ],
});
