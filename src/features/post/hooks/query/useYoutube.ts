// wirte a hook inzustand to get youtube categories
import { useQuery } from '@tanstack/react-query';
import { getYoutubeCategories } from '../../api';


const useGetYoutubeCategories = () => {
    return useQuery({
    queryKey: ['youtubeCategories'],
    queryFn: getYoutubeCategories,
  });

}


export default useGetYoutubeCategories;