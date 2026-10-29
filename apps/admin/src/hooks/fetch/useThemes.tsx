import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  cloneTheme,
  createTheme,
  deleteTheme,
  getTheme,
  getThemes,
  updateTheme,
} from '../../api/theme';

const themesKey = 'themes';

export function useThemes() {
  const query = useQuery([themesKey], getThemes);
  return query;
}

export function useThemeDetail(id?: string, options?: any) {
  const query = useQuery([themesKey, id], () => getTheme(id!), {
    enabled: !!id,
    ...options,
  });

  return query;
}

export function useThemeAction() {
  const queryClient = useQueryClient();

  const clearThemeCache = () => {
    queryClient.invalidateQueries(themesKey);
  };

  const deleteMutation = useMutation((themeId: string) => deleteTheme(themeId), {
    onSuccess() {
      clearThemeCache();
    },
  });

  const cloneMutation = useMutation((themeId: string) => cloneTheme(themeId), {
    onSuccess() {
      clearThemeCache();
    },
  });

  const updateMutation = useMutation(
    (themeData: any) => updateTheme(themeData),
    {
      onSuccess() {
        clearThemeCache();
      },
    }
  );

  const createMutation = useMutation(
    (themeData: any) => createTheme(themeData),
    {
      onSuccess() {
        clearThemeCache();
      },
    }
  );

  return {
    cloneMutation,
    deleteMutation,
    updateMutation,
    createMutation,
  };
}
