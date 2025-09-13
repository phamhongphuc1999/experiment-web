import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/shadcn-ui/select';
import { WordModeType } from 'src/global';

interface Props {
  selectedValue?: WordModeType;
  onValueChange: (value: WordModeType) => void;
}

export default function WordSelect({ selectedValue, onValueChange }: Props) {
  return (
    <Select value={selectedValue} onValueChange={(value) => onValueChange(value as WordModeType)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="null">--</SelectItem>
          <SelectItem value="noun">noun</SelectItem>
          <SelectItem value="verb">verb</SelectItem>
          <SelectItem value="adj">adj</SelectItem>
          <SelectItem value="adv">adv</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
