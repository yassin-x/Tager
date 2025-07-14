import { IFormField, ValidationErrors } from "@/types/app";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface Props extends IFormField {
  error: ValidationErrors;
}
interface Props {
  onChange?: (value: boolean) => void;
  checked: boolean;
  label: IFormField["label"];
  name: IFormField["name"];
}

const Checkbox = ({ label, name, checked, onChange }: Props) => {
  return (
    <div className="text-muted-foreground flex items-center gap-2">
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <Switch
        id={name}
        checked={checked}
        onCheckedChange={(val) => {
          onChange?.(val);
        }}
      />
      <Label htmlFor={name} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
};

export default Checkbox;
