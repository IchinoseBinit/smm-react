import { Portal, Select, Span, createListCollection } from "@chakra-ui/react"

const SelectChannelDropdown = () => {
  return (
    <Select.Root collection={frameworks} size="md" width="100%">
      <Select.HiddenSelect />
      <Select.Label fontSize="lg" fontWeight="semibold" mb={3} color="#00325c">
        Channels
        <Span color="red.500">*</Span>
      </Select.Label>
      <Select.Control
        height="44px"
        borderRadius={"6px"}
        border={"1px solid #e5e5e8"}
      >
        <Select.Trigger height="44px" px={3} border={"none"}>
          <Select.ValueText
            placeholder="Select an account to post to"
            fontSize="14px"
          />
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
    { label: "Dhenga YT", value: "Dhenga YT" },
    { label: "Thaquree Vlogs", value: "Thaquree Vlogs" },
    { label: "MRB Vlogs", value: "MRB Vlogs" },
  ],
})

export default SelectChannelDropdown
