import { ColorModeProvider } from "@/components/ui/color-mode";
export function UiProvider({ children }: { children: React.ReactNode }) {
  return <ColorModeProvider>{children}</ColorModeProvider>;
}
