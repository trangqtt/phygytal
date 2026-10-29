import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTagAction, useTagDetail } from '../../hooks/fetch/useTag';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import TagForm from './TagForm';

export type Props = {};

export default function EditTag({}: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const goBack = () => {
    navigate('/tags');
  };

  const { updateMutation } = useTagAction();
  const { data, isLoading } = useTagDetail(id);
  const methods = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data: any) => {
    data.scan_counter = Number(data.scan_counter);
    await updateMutation.mutateAsync(data);
  };

  useEffect(
    function () {
      if (!!data) {
        methods.reset(data);
      }
    },
    [data]
  );

  return (
    <>
      <BackdropLoader open={updateMutation.isLoading || isLoading} />
      <div className="w-full flex flex-col justify-end p-2 sticky bg-white z-10 top-0">
        <div>
          <Button onClick={goBack}>Back</Button>
          <h2 className="text-[30px] mb-8 font-bold">Edit Tag Item</h2>
        </div>
        <div className="pt-2">
          <TagForm tabType="Type" methods={methods} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
