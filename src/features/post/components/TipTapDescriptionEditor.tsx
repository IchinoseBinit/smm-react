// components/TiptapDescriptionEditor.jsx
import React, { useCallback } from "react"
import {
  Box,
  Text,
  HStack,
  Icon,
  Button,
  Flex,
  Span,
  ButtonGroup,
  VStack,
} from "@chakra-ui/react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { IoMdArrowDropup } from "react-icons/io"
import { IoMdArrowDropdown } from "react-icons/io"

import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import {
  FiSmile,
  FiHash,
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
import type { FormatType, TiptapDescriptionEditorProps, ToolbarButtonProps } from "../types"



export const TiptapDescriptionEditor: React.FC<TiptapDescriptionEditorProps> = ({
  placeholder = "Write something awesome",
  value = "",
  onChange,
  onEmojiClick,
  onHashtagClick,
  minHeight = "100px", // Increased from 200px to 400px
  maxHeight,
  fixedHeight = true,
}) => {
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
      onChange?.(text, html)
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  })

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
      {/* Label */}
      <Text fontSize="lg" fontWeight="semibold" mb={2} color="#00325c">
        Description <Span color="red.500">*</Span>
      </Text>

      {/* Editor container */}
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
        {/* Toolbar */}
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
            {/* Text formatting */}

            <Box display={"flex"} alignItems="center" gap={1}>
              <Text color={"#00325c"}>Font</Text>
              <VStack gap={0} paddingLeft={8} alignItems="center">
                <IoMdArrowDropup />
                <IoMdArrowDropdown />
              </VStack>
            </Box>
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

            {/* Vertical divider */}
            <Box w="1px" h="28px" bg="gray.300" mx={1} />

            {/* Lists */}
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

            {/* Vertical divider */}
            <Box w="1px" h="28px" bg="gray.300" mx={1} />

            {/* Text alignment */}
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

            {/* Vertical divider */}
            <Box w="1px" h="28px" bg="gray.300" mx={1} />

            {/* Clear formatting */}
            <ToolbarButton
              icon={MdFormatClear}
              tooltip="Clear Formatting"
              format="clearFormat"
            />
          </ButtonGroup>
        </Flex>

        {/* Editor content - Increased height for writing area */}
        <Box
          minH={minHeight} // Always use minimum height
          maxH={maxHeight} // Optional maximum height
          overflow="auto" // Enable scrolling when content exceeds height
          css={{
            ".tiptap-editor": {
              outline: "none",
              border: "none",
              padding: "16px",
              fontSize: "md",
              lineHeight: "1.6",
              minHeight: minHeight, // Force minimum height on the editor itself
              height: fixedHeight ? minHeight : "auto", // Use fixed height or auto
              "&:empty:before": {
                content: `"${placeholder}"`,
                color: "#a0aec0",
                pointerEvents: "none",
                position: "absolute",
              },
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
              "& em": {
                fontStyle: "italic",
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
          {/* Removed width, height, minLength props as they don't work on EditorContent */}
          <EditorContent height={160} rows={4} cols={50} editor={editor} />
        </Box>

        {/* Footer */}
        <HStack
          gap={4}
          px={4}
          py={2}
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <HStack gap={1} cursor="pointer" onClick={onEmojiClick}>
            <Icon as={FiSmile} color="black.700" />
            <Text fontSize="sm" color="black.700" fontWeight="medium">
              Emoji
            </Text>
          </HStack>

          {/* Custom vertical divider */}
          <Box w="1px" h="16px" bg="gray.200" />

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
          </HStack>
        </HStack>
      </Box>
    </Box>
  )
}
