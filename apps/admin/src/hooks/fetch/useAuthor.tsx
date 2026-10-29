import { useQuery, } from 'react-query';
import { getAuthors } from '../../api/author';

const authorsKey = 'auths';

export function useAuthors(options?: any) {
  const query = useQuery([authorsKey], getAuthors, {
    ...options,
  });
  return query;
}
