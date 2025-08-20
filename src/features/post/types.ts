type FileMeta = {
  filename: string;
  type: string;
  file: File;
};

type FilesPayload = {
  files: FileMeta[];
};
interface AccountSectionProps {
  type: AccountType;
  data: unknown[];
  label?: string;
  selectedPlatforms?: any;
  setvalue?: any;
  ItemArr?: any;
  setItemArr?: any;
  clearSelectedAcc?: boolean;
  onClearSelectComplete?: () => void;

}



interface ToolbarButtonProps {
  icon: React.ComponentType
  tooltip: string
  format: FormatType
  [key: string]: any // for ...props
}

interface TiptapDescriptionEditorProps {
  placeholder?: string
  value?: string
  onChange?: (text: string, html: string) => void
  onEmojiClick?: () => void
  onHashtagClick?: () => void
  minHeight?: string // Add option to control minimum height
  maxHeight?: string // Add option to control maximum height
  fixedHeight?: boolean // Add option for fixed height
}

type FormatType =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "bulletList"
  | "orderedList"
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "clearFormat"
export type { FileMeta, FilesPayload, AccountSectionProps, ToolbarButtonProps, TiptapDescriptionEditorProps, FormatType };
