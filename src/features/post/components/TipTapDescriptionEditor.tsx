import React, { useCallback, useState, useEffect } from "react"
import {
  Box,
  Text,
  HStack,
  Icon,
  Flex,
  Span,
  ButtonGroup,
  Button,
  Menu,
  Portal,
  Popover,
} from "@chakra-ui/react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import FontFamily from "@tiptap/extension-font-family"
import { TextStyle } from "@tiptap/extension-text-style"
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import {
  FiSmile,
  // FiHash,
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiList,
} from "react-icons/fi"
import {
  MdFormatListNumbered,
  MdFormatStrikethrough,
  MdFormatClear,
} from "react-icons/md"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import type {
  FormatType,
  TiptapDescriptionEditorProps,
  ToolbarButtonProps,
} from "../types"

const fonts = [
  { value: "Arial", label: "Arial", category: "sans-serif" },
  { value: "Helvetica", label: "Helvetica", category: "sans-serif" },
  { value: "Times New Roman", label: "Times New Roman", category: "serif" },
  { value: "Calibri", label: "Calibri", category: "sans-serif" },
  { value: "Georgia", label: "Georgia", category: "serif" },
]

export const TiptapDescriptionEditor: React.FC<
  TiptapDescriptionEditorProps
> = ({
  placeholder = "Write something awesome",
  value = "",
  onChange,
  onEmojiClick,
  // onHashtagClick,
  maxHeight = "300px",
}) => {
  const [selectedFont, setSelectedFont] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        italic: {},
      }),
      TextStyle,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const text = editor.getText()
      setIsEmpty(text.trim() === "")
      onChange?.(text, html)
    },
    onCreate: ({ editor }) => {
      const text = editor.getText()
      setIsEmpty(text.trim() === "")
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  })

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (editor && value !== editor.getText()) {
      editor.commands.setContent(value)
      setIsEmpty(value.trim() === "")
    }
  }, [editor, value])

  const toggleFormat = useCallback(
    (format: FormatType) => {
      if (!editor) return

      switch (format) {
        case "bold":
          editor.chain().focus().toggleBold().run()
          break
        case "italic":
          editor.chain().focus().toggleItalic().run()
          break
        case "underline":
          editor.chain().focus().toggleUnderline().run()
          break
        case "strike":
          editor.chain().focus().toggleStrike().run()
          break
        case "bulletList":
          editor.chain().focus().toggleBulletList().run()
          break
        case "orderedList":
          editor.chain().focus().toggleOrderedList().run()
          break
        case "alignLeft":
          editor.chain().focus().setTextAlign("left").run()
          break
        case "alignCenter":
          editor.chain().focus().setTextAlign("center").run()
          break
        case "alignRight":
          editor.chain().focus().setTextAlign("right").run()
          break
        case "clearFormat":
          editor.chain().focus().clearNodes().unsetAllMarks().run()
          break
      }
    },
    [editor]
  )

  const handleFontChange = useCallback(
    (fontFamily: string) => {
      if (!editor) return

      setSelectedFont(fontFamily)
      editor.chain().focus().setFontFamily(fontFamily).run()
    },
    [editor]
  )

  const getCurrentFont = useCallback(() => {
    if (!editor) return "Arial"

    const { fontFamily } = editor.getAttributes("textStyle")
    return fontFamily || selectedFont || "Arial"
  }, [editor, selectedFont])

  const handleEmojiSelect = useCallback(
    (emojiData: EmojiClickData) => {
      if (!editor) return

      // Insert emoji at current cursor position
      editor.chain().focus().insertContent(emojiData.emoji).run()

      // Close the emoji picker
      setIsEmojiPickerOpen(false)

      // Call the optional onEmojiClick callback
      onEmojiClick?.()
    },
    [editor, onEmojiClick]
  )

  const isActive = useCallback(
    (format: FormatType) => {
      if (!editor) return false

      switch (format) {
        case "bold":
          return editor.isActive("bold")
        case "italic":
          return editor.isActive("italic")
        case "underline":
          return editor.isActive("underline")
        case "strike":
          return editor.isActive("strike")
        case "bulletList":
          return editor.isActive("bulletList")
        case "orderedList":
          return editor.isActive("orderedList")
        case "alignLeft":
          return editor.isActive({ textAlign: "left" })
        case "alignCenter":
          return editor.isActive({ textAlign: "center" })
        case "alignRight":
          return editor.isActive({ textAlign: "right" })
        default:
          return false
      }
    },
    [editor]
  )

  const ToolbarButton = ({
    icon,
    tooltip,
    format,
    ...props
  }: ToolbarButtonProps) => (
    <Button
      size="sm"
      variant={isActive(format) ? "solid" : "ghost"}
      colorScheme={isActive(format) ? "blue" : "gray"}
      onClick={() => toggleFormat(format)}
      minW="32px"
      h="32px"
      p={0}
      title={tooltip}
      {...props}
    >
      <Icon as={icon} />
    </Button>
  )

  if (!editor) {
    return null
  }

  return (
    <Box maxW="40rem">
      {/* Add the italic CSS as a style tag */}
      <style>
        {`
          .tiptap-editor em,
          .tiptap-editor i,
          .ProseMirror em,
          .ProseMirror i {
            font-style: italic !important;
          }
          
          .tiptap-editor strong em,
          .tiptap-editor em strong,
          .tiptap-editor strong i,
          .tiptap-editor i strong {
            font-weight: bold !important;
            font-style: italic !important;
          }
        `}
      </style>

      <Text fontSize="lg" fontWeight="semibold" mb={2} color="#00325c">
        Description <Span color="red.500">*</Span>
      </Text>

      <Box
        border="1px solid"
        borderColor="gray.200"
        rounded="lg"
        overflow="hidden"
        bg="white"
        _focusWithin={{
          borderColor: "gray.200",
          boxShadow: "0 0 0 1px gray.200",
        }}
      >
        <Flex
          px={3}
          py={2}
          borderBottom="1px solid"
          borderColor="gray.200"
          bg="gray.50"
          wrap="wrap"
          gap={1}
        >
          <ButtonGroup size="sm" variant="ghost" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <Menu.Root onOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu.Trigger asChild>
                  <Button
                    size="sm"
                    minW="70px"
                    maxW="70px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={1}
                  >
                    <Text fontSize="xs">
                      {selectedFont.length > 6
                        ? selectedFont.slice(0, 6) + ".."
                        : selectedFont || "Font"}
                    </Text>
                    {isMenuOpen ? (
                      <IoMdArrowDropup size={10} />
                    ) : (
                      <IoMdArrowDropdown size={10} />
                    )}
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content maxH="200px" overflowY="auto">
                      {fonts.map((font) => (
                        <Menu.Item
                          key={font.value}
                          value={font.value}
                          onClick={() => handleFontChange(font.value)}
                          fontFamily={font.value}
                          bg={
                            getCurrentFont() === font.value
                              ? "blue.50"
                              : "transparent"
                          }
                          _hover={{ bg: "gray.50" }}
                        >
                          <Text fontFamily={font.value}>{font.label}</Text>
                          <Text fontSize="xs" color="gray.500" ml={2}>
                            {font.category}
                          </Text>
                        </Menu.Item>
                      ))}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>

            <Box w="1px" h="28px" bg="gray.300" mx={1} />

            <ToolbarButton icon={FiBold} tooltip="Bold" format="bold" />
            <ToolbarButton icon={FiItalic} tooltip="Italic" format="italic" />
            <ToolbarButton
              icon={FiUnderline}
              tooltip="Underline"
              format="underline"
            />
            <ToolbarButton
              icon={MdFormatStrikethrough}
              tooltip="Strikethrough"
              format="strike"
            />

            <Box w="1px" h="28px" bg="gray.300" mx={1} />

            <ToolbarButton
              icon={FiList}
              tooltip="Bullet List"
              format="bulletList"
            />
            <ToolbarButton
              icon={MdFormatListNumbered}
              tooltip="Numbered List"
              format="orderedList"
            />

            <Box w="1px" h="28px" bg="gray.300" mx={1} />

            <ToolbarButton
              icon={FiAlignLeft}
              tooltip="Align Left"
              format="alignLeft"
            />
            <ToolbarButton
              icon={FiAlignCenter}
              tooltip="Align Center"
              format="alignCenter"
            />
            <ToolbarButton
              icon={FiAlignRight}
              tooltip="Align Right"
              format="alignRight"
            />

            <Box w="1px" h="28px" bg="gray.300" mx={1} />

            <ToolbarButton
              icon={MdFormatClear}
              tooltip="Clear Formatting"
              format="clearFormat"
            />
          </ButtonGroup>
        </Flex>

        <Box minH="150px" maxH={maxHeight} overflow="auto" position="relative">
          {isEmpty && (
            <Text
              position="absolute"
              top="16px"
              left="16px"
              color="gray.400"
              pointerEvents="none"
              zIndex={1}
              fontSize="md"
              lineHeight="1.6"
            >
              {placeholder}
            </Text>
          )}

          <Box
            css={{
              "& .ProseMirror": {
                minHeight: "150px !important",
                height: "auto",
                padding: "16px",
                outline: "none",
                border: "none",
                position: "relative",
                zIndex: 2,
              },

              ".tiptap-editor": {
                outline: "none",
                border: "none",
                fontSize: "md",
                lineHeight: "1.6",
                minHeight: "150px !important",
                height: "auto",
                width: "100%",

                "& p": {
                  margin: "0 0 8px 0",
                  "&:last-child": {
                    marginBottom: 0,
                  },
                },
                "& ul, & ol": {
                  paddingLeft: "20px",
                  margin: "8px 0",
                },
                "& li": {
                  marginBottom: "4px",
                },
                "& strong": {
                  fontWeight: "bold",
                },
                "& u": {
                  textDecoration: "underline",
                },
                "& s": {
                  textDecoration: "line-through",
                },
              },
            }}
          >
            <EditorContent editor={editor} />
          </Box>
        </Box>

        <HStack
          gap={4}
          px={4}
          py={2}
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Popover.Root
            open={isEmojiPickerOpen}
            onOpenChange={(e) => setIsEmojiPickerOpen(e.open)}
          >
            <Popover.Trigger asChild>
              <HStack
                gap={1}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                p={2}
                borderRadius="md"
                transition="background 0.2s"
              >
                <Icon as={FiSmile} color="black.700" />
                <Text fontSize="sm" color="black.700" fontWeight="medium">
                  Emoji
                </Text>
              </HStack>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content
                  p={0}
                  borderRadius="md"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  overflow="hidden"
                  width="auto"
                >
                  <EmojiPicker
                    onEmojiClick={handleEmojiSelect}
                    width={350}
                    height={400}
                  />
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>

          {/* <Box w="1px" h="16px" bg="gray.200" />

          <HStack gap={1} cursor="pointer" onClick={onHashtagClick}>
            <Icon
              as={FiHash}
              color="black.700"
              border="1.5px solid"
              borderColor="gray.200"
              borderRadius="md"
              p={1}
            />
            <Text fontSize="sm" color="#00325c" fontWeight="medium">
              Hashtag Suggestion
            </Text>
          </HStack> */}
        </HStack>
      </Box>
    </Box>
  )
}
