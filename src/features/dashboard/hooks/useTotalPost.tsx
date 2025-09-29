
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
    })
}

export default useTotalPost

