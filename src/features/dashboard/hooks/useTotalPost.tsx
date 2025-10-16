
import { useQuery } from '@tanstack/react-query'
import { getTotalPost } from '../api'
import { useAuthUtils } from '@/hooks/useAuthUtils'

interface TotalPost {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    isLastPage: boolean;
    results: Array<any>;
}


const useTotalPost = () => {
    const { userId } = useAuthUtils()

    console.log("userId",userId)
    return useQuery<TotalPost>({
        queryKey: ['totalPosts', userId],
        queryFn: () => getTotalPost(userId || ''),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        refetchOnMount: false, // Don't refetch on component mount if data exists
        refetchOnReconnect: false, // Don't refetch on reconnect
    })
}

export default useTotalPost

