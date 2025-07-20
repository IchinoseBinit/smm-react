import { useEffect } from "react";
import { useClearSelectedAccStore } from "../lib/store/selectedAcc";
import type { AccountSectionProps } from "../types";
import { Box } from "@chakra-ui/react";
import SocialAccountCard from "./SocialAccCard";

export const PostConnectedAccsSection = ({
  type,
  data,
  setvalue,
  setItemArr,
  icon,
  iconColor,
  selectedPlatforms,
}: AccountSectionProps & { icon: any; iconColor: any }) => {
  const { clearSelectedAcc, setClearSelectedAcc } = useClearSelectedAccStore();
  const filtered = data.filter((d: any) => d.account_type === type);

  useEffect(() => {
    if (!clearSelectedAcc) return;
    setItemArr([]);
    setClearSelectedAcc(false);
  }, [clearSelectedAcc, setClearSelectedAcc, setItemArr]);

  if (!filtered.length) return null;
  return (
    <>
      {filtered.map((d: any) => {
        const isSelected = selectedPlatforms.includes(d.id);
        return (
          <Box
            key={d.id}
            onClick={() => {
              const item = {
                accountType: d.account_type,
                social_account_id: d.id,
              };
              setItemArr((prev: any[]) => {
                const exists = prev.some(
                  (i) =>
                    i.social_account_id === d.id &&
                    i.accountType === d.account_type,
                );
                return exists
                  ? prev.filter(
                      (i) =>
                        i.social_account_id !== d.id ||
                        i.accountType !== d.account_type,
                    )
                  : [...prev, item];
              });
            }}
          >
            <SocialAccountCard
              id={d.id}
              account_type={d.account_type}
              social_name={d.social_name}
              thumbnail_url={d.thumbnail_url}
              selected={isSelected}
              setvalue={setvalue}
              setItemArr={setItemArr}
              icon={icon}
              iconColor={iconColor}
            />
          </Box>
        );
      })}
    </>
  );
};
