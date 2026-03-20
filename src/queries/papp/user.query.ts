import { useQuery } from '@tanstack/react-query';
import PAppClient from 'src/api/papp';

export function useGetUsers() {
  return useQuery({
    queryKey: ['papp', 'users'],
    queryFn: () => PAppClient.user.findListUsers(),
  });
}
