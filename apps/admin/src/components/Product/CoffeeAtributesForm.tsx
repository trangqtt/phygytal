import { FC } from "react";
import FormRow from "../common/form-ui-kit/FormRow";
import TextInput from "../common/form-ui-kit/TextInput";
import SliderInput from "../common/form-ui-kit/SliderInput";
import UploadVideo from "../common/form-ui-kit/UploadVideo";
import UploadImage from "../common/form-ui-kit/UploadImage";

const CoffeeAtributesForm: FC = () => {
  return (
    <div>
      <FormRow>
        <TextInput name="attribute.farm_name" title="Farm name" />
        <TextInput name="attribute.country_name" title="Country name" />
      </FormRow>
      <FormRow>
        <TextInput name="attribute.process" title="Process" />
        <TextInput name="attribute.varietal" title="Varietal" />
      </FormRow>
      <FormRow>
        <TextInput name="attribute.farm_area" title="Farm area" />
        <TextInput name="attribute.farm_height" title="Farm height" />
      </FormRow>
      <FormRow>
        <UploadVideo name="attribute.farm_video" title="Farm video" required />
      </FormRow>
      <FormRow>
        <UploadImage name="attribute.farm_image" title="Farm image" required />
      </FormRow>
      <FormRow>
        <UploadVideo name="attribute.country_video" title="Country video" required />
      </FormRow>
      <FormRow>
        <UploadImage name="attribute.country_image" title="Country image" required />
      </FormRow>
      <FormRow>
        <TextInput name="attribute.brewing_time" title="Brewing time" />
        <TextInput name="attribute.link_buy_product" title="Link buy product" />
      </FormRow>
      <FormRow>
        <SliderInput name="attribute.acidity" title="Acidity" min={0} />
      </FormRow>
      <FormRow>
        <SliderInput name="attribute.sweet" title="Sweet" min={0} />
      </FormRow>
      <FormRow>
        <SliderInput name="attribute.bitter" title="Bitter" min={0} />
      </FormRow>
    </div>
  );
}

export default CoffeeAtributesForm;
