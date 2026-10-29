import { Pagination as MuiPagination, Stack } from '@mui/material';

interface PaginationProps {
  count: number;
  size: 'small' | 'medium' | 'large';
  page: number;
  variant?: 'text' | 'outlined' | 'contained';
  shape?: 'circular' | 'rounded';
  onChange: (event: any, p: number) => void;
}

export default function Pagination({ count, page, onChange }: PaginationProps) {
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', marginTop: '1rem' }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        sx={{ justifyContent: 'center' }}
      />
    </Stack>
  );
}
