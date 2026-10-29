import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useOrganizationAction } from '../../hooks/fetch/useOrganizations';
import { OrganizationModel } from '../../model/OrganizationModel';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import OrganizationForm from './OrganizationForm';

export default function CreateOrganizationModal() {
  const methods = useForm();
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/organizations');
  };

  const { createMutation } = useOrganizationAction();

  const onSubmit = async (data: OrganizationModel) => {
    await createMutation.mutateAsync(data);
    goBack();
    methods.reset();
  };

  return (
    <>
      <BackdropLoader open={createMutation.isLoading} />
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Create Organization</h2>
      </div>

      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div className="pt-[10px]  border-b-[1px] border-b-solid border-b-black pb-[60px]">
          <OrganizationForm methods={methods} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
