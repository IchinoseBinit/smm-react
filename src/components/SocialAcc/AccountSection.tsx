import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

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
        <Heading size="md" mt={4}>
          Connect to {label.charAt(0) + label.slice(1).toLowerCase()}
        </Heading>
      )}
      <SimpleGrid>
        {filtered.map((d: any) => (
          <Box key={d.id}>
            <Component {...d} pagesPath={pagesPath} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
