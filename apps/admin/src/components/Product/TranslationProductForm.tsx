import { useFormContext } from 'react-hook-form';
import FormRow from '../common/form-ui-kit/FormRow';
import SelectInput from '../common/form-ui-kit/SelectInput';
import { FC, useEffect } from 'react';
import TextInput from '../common/form-ui-kit/TextInput';
import RichTextEditor from '../common/form-ui-kit/RichTextEditor';
import DynamicTextInput from '../common/form-ui-kit/DynamicTextInput';
import { useProductModelDetail } from '../../hooks/fetch/useProductModels';
import { languagesOptions, renderField } from './ProductForm';
import { ModelField } from '../../model/ProductModelEntity';

const renderProductModelFields = (modelDataFields: ModelField[], language: string) => {
  if (!modelDataFields) return [];

  return modelDataFields.map((field) =>
    renderField({ ...field, key: `translation.${language}.data_model_value.${field.key}` })
  );
};

const TranslationProductForm: FC = () => {
  const { watch, setValue, } = useFormContext();
  const watchLanguage = watch("translation.current_language");
  const watchProductDataModel = watch('data_model_id');

  const { data: dataModelDetail } = useProductModelDetail(watchProductDataModel);
  const modelDataFields = (dataModelDetail?.data_fields ?? []) as ModelField[];

  return (
    <>
      <FormRow>
        <SelectInput
          name="translation.current_language"
          options={languagesOptions}
          title="Language"
          required
        />
      </FormRow>
      {watchLanguage && (
        <div className="w-full h-full" key={watchLanguage}>
          <FormRow>
            <TextInput name={`translation.${watchLanguage}.product_name`} title="Product name" />
          </FormRow>
          <FormRow>
            <RichTextEditor name={`translation.${watchLanguage}.description`} title="Description" />
          </FormRow>

          <FormRow>
            <DynamicTextInput name={`translation.${watchLanguage}.tags`} title="Tags" />
          </FormRow>
          {renderProductModelFields(modelDataFields, watchLanguage)}
        </div>
      )}
    </>
  );
};

export default TranslationProductForm;
