import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { getDigitalAssets } from '../../api/digital';
import { useOrganizations } from '../../hooks/fetch/useOrganizations';
import BackdropLoader from '../common/BackdropLoader';
import TableData from '../common/TableData';
import Typo from '../common/Typo';

const columns: any[] = [
  { label: 'Id' },
  { label: 'Image' },
  { label: 'Name' },
  { label: 'Collection' },
  { label: 'Chain Info' },
  { label: 'Standard' },
];

function DigitalAsset() {
  const [selectedOrg, setSelectedOrg] = useState<string>('');

  const { data: orgsData, isLoading } = useOrganizations({
    onSuccess(data: any) {
      if (data) {
        setSelectedOrg(data[0].org_tag_name!);
      }
    },
  });

  const { data, isLoading: isLoadingDigitalAsset } = useQuery(
    ['digital-assets', selectedOrg],
    () => getDigitalAssets(selectedOrg),
    {
      enabled: !!selectedOrg,
    }
  );

  const onSelectOrg = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    setSelectedOrg(value);
  };

  return (
    <>
      <BackdropLoader open={isLoading || isLoadingDigitalAsset} />
      <div className="flex flex-col w-full h-full gap-[20px]">
        <div className="flex justify-between">
          <Typo variants='h6'>Digital Assets</Typo>
        </div>

        <select
          className="w-full border rounded p-[12px]"
          onChange={onSelectOrg}
          value={selectedOrg}
        >
          <option value={''}>Chưa chọn</option>
          {orgsData?.map((item, index: number) => (
            <option key={item.org_tag_name} value={item.org_tag_name}>
              {item.org_name}
            </option>
          ))}
        </select>

        <TableData
          hasIndex={false}
          columns={columns}
          data={data}
          renders={[
            {
              field: 'token_id',
            },
            {
              field: ['metadata', 'name'],
            },
            {
              field: 'collection_name',
            },
            {
              field: 'chain',
            },
            {
              field: 'standard',
            },
          ]}
        />
      </div>
    </>
  );
}

export default DigitalAsset;
