import { Portal, Select, Span, createListCollection } from "@chakra-ui/react"

const SelectChannelDropdown = () => {
  return (
    <Select.Root collection={frameworks} size="md" width="100%">
      <Select.HiddenSelect />
      <Select.Label fontSize="lg" fontWeight="semibold" mb={3} color="#00325c">
        Category
        <Span color="red.500">*</Span>
      </Select.Label>
      <Select.Control
        height="44px"
        borderRadius={"6px"}
        backgroundColor={"#f7f7f7"}
        // border={"1px solid #e5e5e8"}
      >
        <Select.Trigger height="44px" px={3} border={"none"}>
          <Select.ValueText placeholder="Select a category " fontSize="14px" />
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
}

const frameworks = createListCollection({
  items: [
    { label: "Technology", value: "Technology" },
    { label: "Education", value: "Education" },
    { label: "Environment", value: "Environment" },
    { label: "Music", value: "Music" },
  ],
})

export default SelectChannelDropdown
