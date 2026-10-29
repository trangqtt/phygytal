import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useOrganizationAction,
  useOrganizationDetail,
} from '../../hooks/fetch/useOrganizations';
import { OrganizationModel } from '../../model/OrganizationModel';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import OrganizationForm from './OrganizationForm';

export default function EditOrganization() {
  const methods = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useOrganizationDetail(id);
  const { updateMutation } = useOrganizationAction();

  const onSubmit = async (data: OrganizationModel) => {
    await updateMutation.mutateAsync(data);
    methods.reset();
  };

  const goBack = () => {
    navigate('/organizations');
  };

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data]);

  return (
    <>
      <BackdropLoader open={updateMutation.isLoading || isLoading} />
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Edit Organization</h2>
      </div>

      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div className="pt-[10px]  border-b-[1px] border-b-solid border-b-black pb-[60px]">
          <OrganizationForm methods={methods} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
