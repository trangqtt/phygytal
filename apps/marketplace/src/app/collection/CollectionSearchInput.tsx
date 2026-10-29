import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

const CollectionSearchInput = () => {
  return (
    <div className="flex w-full">
      <Select>
        <SelectTrigger className="w-50 rounded-l-lg rounded-r-none border-r-0">
          <SelectValue placeholder="Tìm theo sản phẩm" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tìm kiếm</SelectLabel>
            <SelectItem value="apple">Tìm theo sản phẩm</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className="rounded-r-lg rounded-l-none"
        placeholder="Tìm kiếm sản phẩm"
      />
    </div>
  );
};

export default CollectionSearchInput;
