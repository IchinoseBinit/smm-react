// components/AccountSection.tsx
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";

interface AccountSectionProps {
  type: AccountType;
  data: unknown[];
  Component: React.FC<any>;
  label?: string;
  setvalue?: any;
  ItemArr?: any;
  setItemArr?: any;
}

export const AccountSection = ({
  type,
  data,
  Component,
  label,
  setvalue,
}: AccountSectionProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const filtered = data.filter((d: any) => d.account_type === type);

  if (!data || !filtered.length) return null; // or loading/skeleton if needed

  return (
    <Box>
      {label && (
        <Text
          mt={5}
          fontWeight="bold"
          fontSize="md"
          color={{ base: "primary.700", _dark: "white" }}
        >
          {label?.toLowerCase()} account connected
        </Text>
      )}
      <SimpleGrid columns={{ base: 1, md: 3 }} gridGap={10} mt={5}>
        {filtered.map((d: any) => (
          <Box
            key={d.id}
            onClick={() => {
              if (selectedId === d.id) return; // prevent re-selection

              setvalue("platform_statuses", [
                {
                  accountType: d.account_type,
                  social_account_id: d.id,
                },
              ]);
              setSelectedId(d.id); // mark selected
            }}
            pointerEvents={selectedId === d.id ? "none" : "auto"}
            opacity={selectedId === d.id ? 0.6 : 1}
          >
            <Component {...d} setvalue={setvalue} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export const PostAccountSection = ({
  type,
  data,
  Component,
  setvalue,
  setItemArr,
}: AccountSectionProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const filtered = data.filter((d: any) => d.account_type === type);

  if (!data || !filtered.length) return null;

  return (
    <>
      {filtered.map((d: any) => {
        const isSelected = selectedId === d.id;
        return (
          <Box
            key={d.id}
            borderRadius="md"
            cursor="pointer"
            onClick={() => {
              const item = {
                accountType: d.account_type,
                social_account_id: d.id,
              };

              setItemArr((prev: any[]) => {
                const isAlreadySelected = prev.some(
                  (i) =>
                    i.social_account_id === d.id &&
                    i.accountType === d.account_type,
                );

                const next = isAlreadySelected
                  ? prev.filter(
                      (i) =>
                        i.social_account_id !== d.id ||
                        i.accountType !== d.account_type,
                    ) // remove
                  : [...prev, item]; // add

                return next;
              });

              setSelectedId((prev) => (prev === d.id ? null : d.id));
            }}
          >
            <Component {...d} setvalue={setvalue} selected={isSelected} />
          </Box>
        );
      })}
    </>
  );
};
