import { FC, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useOrganizationAction,
  useOrganizations,
} from '../../hooks/fetch/useOrganizations';
import BackdropLoader from '../common/BackdropLoader';
import TableData from '../common/TableData';
import { Button } from '../common/shadcn-ui-kit/button';
import Typo from '../common/Typo';

const columns = [
  { label: 'Organization Name' },
  {
    label: 'Name Tag',
  },
  {
    label: 'Logo',
  },
];

const ListOrganization: FC = (): ReactElement => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const navigate = useNavigate();

  const { deleteMutation } = useOrganizationAction();

  const { data: orgsData, isLoading } = useOrganizations();

  const onClickCreateOrg = (): void => {
    navigate(`/organizations/create`);
  };

  const handleEditOrg = (organization_tag_name: string) => {
    navigate(`/organizations/edit/${organization_tag_name}`);
  };

  const handleDeleteOrg = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    toast.info('Delete successful');
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <div className="flex flex-col gap-[40px]">
        <div className="flex justify-between">
          <Typo variants='h6'>List Organization</Typo>
          <Button onClick={onClickCreateOrg}>Create new organization</Button>
        </div>

        <TableData
          columns={columns}
          data={orgsData || []}
          renders={[
            { field: 'org_name' },
            {
              field: 'org_tag_name',
            },
            {
              field: ['logo', 'url'],
              type: 'image',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item) => handleEditOrg(item['org_tag_name']),
            },
          ]}
        />
      </div>
    </>
  );
};

export default ListOrganization;
