import { FC, useState } from 'react';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import UploadFile from '../common/form-ui-kit/UploadFile';
import ManageProductProcessForm from './ManageProductProcessForm';
import SelectInput from '../common/form-ui-kit/SelectInput';
import { getAuthors } from '../../api/author';
import { useQuery } from 'react-query';
import { generateAuthOptions } from '../../utils/helper';

import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateAuthorModal from './CreateAuthorModal';
import { useFormContext } from 'react-hook-form';
import BackdropLoader from '../common/BackdropLoader';
import UploadVideo from '../common/form-ui-kit/UploadVideo';
import Upload3D from '../common/form-ui-kit/Upload3d';
import ManageHistory from '../Webpages/PageForm/CraftVillageFormFields/ManageHistory';
import ManageCulture from '../Webpages/PageForm/CraftVillageFormFields/ManageCulture';

interface TitleProps {
  title: string;
}

function AccordionTitle({ title }: TitleProps) {
  return <p className="text-lg font-bold">{title}</p>;
}

const SculptureAtributesForm: FC = () => {
  const { data: authsData, isFetching } = useQuery(['auths'], getAuthors);
  const [openCreateAuthorModal, setOpenCreateAuthorModal] = useState(false);
  const { setValue } = useFormContext();

  const handleClickCreateAuthor = () => {
    setOpenCreateAuthorModal(true);
  };

  const handleCreateNewAuthor = (data: any) => {
    setOpenCreateAuthorModal(false);
    setTimeout(function () {
      setValue('author_id', data.id);
    }, 1000);
  };

  return (
    <>
      <BackdropLoader open={isFetching} />
      <FormRow>
        <div className="flex gap-2 w-1/2">
          <SelectInput
            name="author_id"
            options={generateAuthOptions(authsData ?? [])}
            title="Author"
          />
          <div
            className="flex items-end pb-[10px] cursor-pointer"
            onClick={handleClickCreateAuthor}
          >
            <AddIcon />
          </div>
        </div>
        <TextInput name="attribute.sculpture_rank" title="Rank" className="w-1/2" />
      </FormRow>

      <div className="mb-8">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <AccordionTitle title="Histories (Lịch sử hình thành)" />
          </AccordionSummary>
          <AccordionDetails>
            <ManageHistory />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <AccordionTitle title="Cultures (Giao thoa văn hoá)" />
          </AccordionSummary>
          <AccordionDetails>
            <ManageCulture />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <AccordionTitle title="Process (Quá trình làm sản phẩm)" />
          </AccordionSummary>
          <AccordionDetails>
            <ManageProductProcessForm />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="sculpture-content"
            id="sculpture"
          >
            <AccordionTitle title="Sculpture (Tượng)" />
          </AccordionSummary>
          <AccordionDetails>
            <FormRow>
              <TextInput name="attribute.sculpture_time" title="Sculpture time" />
              <TextInput name="attribute.sculpture_weight" title="Sculpture weight" />
            </FormRow>
            <FormRow>
              <TextInput name="attribute.sculpture_size" title="Sculpture size" />
            </FormRow>
            <FormRow>
              <TextInput
                name="attribute.sculpture_pedestal_size"
                title="Sculpture pedestal size"
              />
            </FormRow>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="village-content"
            id="village-header"
          >
            <AccordionTitle title="Village (Làng nghề)" />
          </AccordionSummary>
          <AccordionDetails>
            <FormRow>
              <UploadVideo
                name="attribute.village.location_video"
                title="Village video"
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="attribute.village.translation.vi.name"
                title="Village name (Vi)"
              />
              <TextInput
                name="attribute.village.translation.en.name"
                title="Village name (En)"
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="attribute.village.translation.vi.village_location"
                title="Village location (Vi)"
              />
              <TextInput
                name="attribute.village.translation.en.village_location"
                title="Village location (En)"
              />
            </FormRow>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="stone-content"
            id="stone-header"
          >
            <AccordionTitle title="Stone (Thông tin về đá)" />
          </AccordionSummary>
          <AccordionDetails>
            <FormRow>
              <TextInput name="attribute.stone.origin" title="Stone origin" />
            </FormRow>
            <FormRow>
              <TextInput
                name="attribute.stone.translation.vi.name"
                title="Stone name (Vi)"
              />
              <TextInput
                name="attribute.stone.translation.en.name"
                title="Stone name (En)"
              />
            </FormRow>
            <FormRow>
              <UploadFile name="attribute.stone.image.url" title="Stone image" />
            </FormRow>
            <FormRow>
              <TextInput
                name="attribute.stone.translation.vi.clarity"
                title="Stone clarity (Vi)"
              />
              <TextInput
                name="attribute.stone.translation.en.clarity"
                title="Stone clarity (En)"
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="attribute.stone.translation.vi.rarity"
                title="Stone rarity (Vi)"
              />
              <TextInput
                name="attribute.stone.translation.en.rarity"
                title="Stone rarity (En)"
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="attribute.stone.translation.vi.properties"
                title="Stone characteristic (Vi)"
              />
              <TextInput
                name="attribute.stone.translation.en.properties"
                title="Stone characteristic (En)"
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="attribute.stone.translation.vi.color"
                title="Stone color (Vi)"
              />
              <TextInput
                name="attribute.stone.translation.en.color"
                title="Stone color (En)"
              />
            </FormRow>
          </AccordionDetails>
        </Accordion>
      </div>

      <CreateAuthorModal
        open={openCreateAuthorModal}
        handleCloseModal={() => setOpenCreateAuthorModal(false)}
        onCreateNewAuthor={handleCreateNewAuthor}
      />
    </>
  );
};

export default SculptureAtributesForm;
