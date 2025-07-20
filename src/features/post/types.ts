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
export type { FileMeta, FilesPayload, AccountSectionProps };
