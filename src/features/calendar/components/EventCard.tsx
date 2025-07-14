import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa6";
import { format } from "date-fns";
import type { CalendarEvent, Post } from "../types";
import { usePostModalStore } from "../lib/store/postModel.store";

interface EventCardProps {
  event: CalendarEvent;
  style?: React.CSSProperties;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  style,
}: EventCardProps) => {
  // Group by accountType + time string
  const { openModal } = usePostModalStore();
  const uniqueMap = new Map<
    string,
    { posts: Post[]; platform: string; icon: React.ReactElement; time: string }
  >();

  event?.platform?.forEach((p) => {
    const time = format(new Date(event.start), "h:mm a");
    const key = `${p.accountType}-${time}`;
    const platform = p.accountType;
    const posts = p.posts;

    if (!uniqueMap.has(key)) {
      let icon = null;
      if (p.accountType === "YOUTUBE") icon = <FaYoutube color="red" />;
      else if (p.accountType === "FACEBOOK") icon = <FaFacebook color="blue" />;
      else if (p.accountType === "TIKTOK") icon = <FaTiktok color="black" />;

      if (icon) uniqueMap.set(key, { posts, platform, icon, time });
    }
  });

  return (
    <Box
      style={style}
      p={3}
      fontSize="sm"
      minH="24px"
      display="flex"
      alignItems="center"
      zIndex={100}
    >
      <Flex direction="column" gap={2}>
        {[...uniqueMap.values()].map((item, i) => {
          return (
            <Box
              key={i}
              bg="gray.100"
              minW="8rem"
              p={1}
              shadow="sm"
              display="flex"
              alignItems="center"
              gap={2}
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "md",
              }}
              onClick={() => openModal(item)}
            >
              {item.icon}
              <Text fontSize="sm">{item.time}</Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
