import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

const CollectionSortInput = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Giá thấp - cao" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Giá</SelectLabel>
          <SelectItem value="apple">Giá thấp - cao</SelectItem>
          <SelectItem value="banana">Giá cao - thấp</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CollectionSortInput;
