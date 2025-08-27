import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/configs/constance';
import { LocationApiType, OptionalQueryType } from 'src/global';
import LocationApi from 'src/services/api-query/location.api';

export function useLocation(name: string, query?: OptionalQueryType<LocationApiType>) {
  return useQuery({
    enabled: name.length > 0,
    ...query,
    queryKey: [QUERY_KEY.location, name],
    queryFn: () => LocationApi.getLocation(name),
  });
}
