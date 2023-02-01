import { Input } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";

export interface IInputData {
  label: string;
  placeholder?: string;
  state?: string | object;
  value: string;
}
interface ICustomInputProps {
  placeholder?: string;
  label: string;
  value: string;
  color?: string;
  type?: string;
  variant?: string;
  state?: string | object;
  onUpdate?: (data: any) => void;
}
export const CustomInput: IComponent<ICustomInputProps> = ({
  placeholder,
  label,
  value,
  color,
  type = "text",
  state,
  onUpdate,
}) => {
  return (
    <div className="flex items-stretch border border-gray-300 dark:border-white rounded-[7px] overflow-hidden">
      <span className="bg-gray-300 dark:bg-white h-inherit flex justify-center items-center text-blue-gray-700 font-normal text-sm px-3 py-2.5">
        {label}
      </span>
      <Input
        placeholder={placeholder}
        type={type}
        label={undefined}
        value={value}
        onChange={
          onUpdate
            ? (event) => {
                const data: IInputData = {
                  label,
                  state,
                  placeholder,
                  value: event.target.value,
                };
                onUpdate(data);
              }
            : undefined
        }
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        color={color as colors}
        className="!px-3 !py-2.5 focus:!border-0 text-gray-700 dark:text-white"
        variant="standard"
      />
    </div>
  );
};
