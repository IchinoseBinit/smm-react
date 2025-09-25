import { Portal, Select, Span, createListCollection } from "@chakra-ui/react"
import useGetYoutubeCategories from "../hooks/query/useYoutube"
import { useMemo } from "react"

const SelectChannelDropdown = () => {
  const { data: youtubeCategories } = useGetYoutubeCategories()

  const categoriesCollection = useMemo(() => {
    if (!youtubeCategories?.items) {
      return createListCollection<{ label: string; value: string }>({ items: [] })
    }

    const items = youtubeCategories.items.map((category) => ({
      label: category.title,
      value: category.id,
    }))

    return createListCollection<{ label: string; value: string }>({ items })
  }, [youtubeCategories])

  return (
    <Select.Root collection={categoriesCollection} size="md" width="100%">
      <Select.HiddenSelect />
      <Select.Label fontSize="lg" fontWeight="semibold" mb={3} color="#00325c">
        Category
        <Span fontSize="sm" color={"gray.500"}>
          (For Youtube Only )
        </Span>{" "}
        <Span color="red.500">*</Span>{" "}
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
            {categoriesCollection.items.map((category) => (
              <Select.Item item={category} key={category.value}>
                {category.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default SelectChannelDropdown
