import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../theme";
export function UiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
