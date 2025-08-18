import { VStack , Text, HStack, Image, Button} from '@chakra-ui/react'
import { MdOutlineFacebook } from "react-icons/md"
import { AiFillTikTok } from "react-icons/ai"
import { IoLogoLinkedin } from "react-icons/io5"
import { LuCalendar } from "react-icons/lu"

import womenimg from "@/assets/womenimg.png"

const socialMedia = [
  {
    name: "Facebook",
    icon: <MdOutlineFacebook color="blue.500" />,
  },

  {
    name: "LinkedIn",
    icon: <IoLogoLinkedin color="#0077B5" />,
  },
  {
    name: "Tiktok",
    icon: <AiFillTikTok color="blue.500" />,
  },
]

const PostcardDemo = () => {
  return (
    <HStack
      border="1px solid"
      borderColor="gray.300"
      borderRadius={12}
      justifyContent={"space-between"}
      padding={3}
    >
      <HStack>
        <Image src={womenimg} alt="Postcard 1" />
        <VStack alignItems={"flex-start"}>
          <Text> Title</Text>
          <Text>Caption</Text>
          <HStack>
            <LuCalendar />
            <Text>09/04/2023,9:30pm</Text>
          </HStack>
          <HStack gap={2}>
            {socialMedia.map((platform) => (
              <>{platform.icon}</>
            ))}
          </HStack>
        </VStack>
      </HStack>
      <VStack>
        <Button color={"red.700"} backgroundColor={"red.300"}>
          Failed
        </Button>
        <Text color={"red.700"}>Connection Error</Text>
        <Button color={"white"} backgroundColor={"red.700"}>
          Retry
        </Button>
      </VStack>
    </HStack>
  )
}
const ScheduleCardDemo = () => {
  return (
    <HStack
      border="1px solid"
      borderColor="gray.300"
      borderRadius={12}
      justifyContent={"space-between"}
      padding={3}
    >
      <HStack>
        <Image src={womenimg} alt="Postcard 1" />
        <VStack alignItems={"flex-start"}>
          <Text> Title</Text>
          <Text>Caption</Text>

          <HStack gap={2}>
            {socialMedia.map((platform) => (
              <>{platform.icon}</>
            ))}
          </HStack>
        </VStack>
      </HStack>
      <VStack
        alignItems="flex-end"
        gap={3}
        minWidth="fit-content"
        flexShrink={0}
      >
        <Button color={"#003a6b"} backgroundColor={"#f2f6fa"}>
          Scheduled
        </Button>
        <HStack>
          <LuCalendar />
          <Text>09/04/2023,9:30pm</Text>
        </HStack>
      </VStack>
    </HStack>
  )
}
const PostedCardDemo = () => {
  return (
    <HStack
      border="1px solid"
      borderColor="gray.300"
      borderRadius={12}
      justifyContent={"space-between"}
      padding={3}
    >
      <HStack>
        <Image src={womenimg} alt="Postcard 1" />
        <VStack alignItems={"flex-start"}>
          <Text> Title</Text>
          <Text>Caption</Text>

          <HStack gap={2}>
            {socialMedia.map((platform) => (
              <>{platform.icon}</>
            ))}
          </HStack>
        </VStack>
      </HStack>
      <VStack
        alignItems="flex-end"
        gap={3}
        minWidth="fit-content"
        flexShrink={0}
      >
        <Button color={"green.700"} backgroundColor={"green.200"}>
          Posted
        </Button>
        <HStack>
          <LuCalendar />
          <Text>09/04/2023,9:30pm</Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

export { PostcardDemo, ScheduleCardDemo, PostedCardDemo }


