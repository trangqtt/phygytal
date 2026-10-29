import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createOrg,
  deleteOrg,
  getOrgDetail,
  getOrgs,
  getOrgsForSelect,
  updateOrg,
} from '../../api/organization';
import { OrganizationModel } from '../../model/OrganizationModel';
import { SelectInputOption } from '../../model/general';

const organizationsKey = 'organizations';

export const transformOrgData = (orgsData: OrganizationModel[] | undefined) => {
  return (orgsData?.map((item) => {
    return {
      label: item.org_name,
      value: item.id,
    };
  }) || []) as SelectInputOption[];
};

export function useOrganizationsSelect() {
  const query = useQuery([organizationsKey], getOrgsForSelect);
  return query;
}

export function useOrganizations(options?: any) {
  const query = useQuery([organizationsKey], getOrgs, {
    ...options
  });
  return query;
}

export function useOrganizationDetail(id?: string, options?: any) {
  const query = useQuery([organizationsKey, id], () => getOrgDetail(id!), {
    enabled: !!id,
    ...options,
  });

  return query;
}

export function useOrganizationAction() {
  const queryClient = useQueryClient();

  const clearOrganizationCache = () => {
    queryClient.invalidateQueries(organizationsKey);
  };

  const deleteMutation = useMutation(
    (organizationId: string) => deleteOrg(organizationId),
    {
      onSuccess() {
        clearOrganizationCache();
      },
    }
  );

  const updateMutation = useMutation(
    (organizationData: any) => updateOrg(organizationData),
    {
      onSuccess() {
        clearOrganizationCache();
      },
    }
  );

  const createMutation = useMutation(
    (organizationData: any) => createOrg(organizationData),
    {
      onSuccess() {
        clearOrganizationCache();
      },
    }
  );

  return {
    deleteMutation,
    updateMutation,
    createMutation,
  };
}
