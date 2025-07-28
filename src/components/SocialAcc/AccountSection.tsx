import { Box, Heading } from "@chakra-ui/react";

type AccountSectionProps = {
  type: AccountType;
  data: unknown[];
  Component: React.FC<any>;
  label?: string;
  pagesPath?: string;
};

export const AccountSection = ({
  type,
  data,
  Component,
  label,
  pagesPath,
}: AccountSectionProps & { pagesPath?: string }) => {
  const filtered = data.filter((d: any) => d.account_type === type);

  if (!filtered.length) return null;

  return (
    <Box>
      {label && (
        <Heading size="lg" mt={4}>
          Connect to {label.charAt(0) + label.slice(1).toLowerCase()}
        </Heading>
      )}

      {filtered.map((d: any) => (
        <Box key={d.id} w={{ base: "100%", sm: "48%", md: "31%", lg: "23%" }}>
          <Component {...d} pagesPath={pagesPath} />
        </Box>
      ))}
    </Box>
  );
};
