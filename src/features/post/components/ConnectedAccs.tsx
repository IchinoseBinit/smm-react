import { useEffect } from "react";
import {
  useClearSelectedAccStore,
  useSelectedStore,
} from "../lib/store/selectedAcc";
import type { AccountSectionProps } from "../types";
import { Box } from "@chakra-ui/react";
import SocialAccountCard from "./SocialAccCard";
import { useContentTypeStore } from "../lib/store/sufaceType";

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
  const { toggleId, clear } = useSelectedStore();

  const { surfaceType } = useContentTypeStore();
  const filtered = data?.filter((d: any) => {
    const isStory = surfaceType[0] === "STORY";
    const isFbOrInsta =
      d.account_type === "FACEBOOK" || d.account_type === "INSTAGRAM";
    return d.account_type === type && (!isStory || isFbOrInsta);
  });

  useEffect(() => {
    if (!clearSelectedAcc) return;
    clear();
    setItemArr([]);
    setClearSelectedAcc(false);
  }, [clearSelectedAcc, setClearSelectedAcc, setItemArr, clear]);

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

              if (d.id) toggleId(d.id);
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
