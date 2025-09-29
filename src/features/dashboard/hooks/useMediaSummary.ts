import { useQuery } from "@tanstack/react-query"
import {getMediaSummary} from "../api"

export type MediaSummary = {
    total_posts: number
    scheduled_posts: number
    failed_posts: number
    connected_accounts: Record<string, number>
    recent_scheduled: Array<{ id: number; title: string | null; scheduled_time: string | null }>
    recent_posts: Array<{ id: number; title: string | null; posted_time: string | null }>     
}

const useMediaSummary = () => {
    return useQuery<MediaSummary>({
        queryKey: ["mediaSummary"],
        queryFn: getMediaSummary,
    })
}

export default useMediaSummary
