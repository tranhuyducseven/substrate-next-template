import { Option, Select } from "@material-tailwind/react";

interface ISelectionProps {
  key: string | number;
  value: string;
  text: string;
}

interface ISelectionData {
  label: string;
  selection: ISelectionProps;
  state?: string | object;
}

interface IFilterSelectionProps {
  value?: string;
  label: string;
  className?: string;
  state?: string | object;
  selections: ISelectionProps[];
  onSelect?: (value: string) => void;
  onUpdate?: (data: any) => void;
}
export const FilterSelection: IComponent<IFilterSelectionProps> = ({
  label,
  value,
  className,
  state,
  selections,
  onSelect,
  onUpdate,
}) => {
  return (
    <div>
      <Select
        value={value}
        label={`${label}`}
        className={className}
        onChange={
          onUpdate
            ? (value) => {
                const data: ISelectionData = {
                  label,
                  selection: selections.find(
                    (s) => s.value === value
                  ) as ISelectionProps,
                  state,
                };
                onUpdate(data);
              }
            : (onSelect as any)
        }
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {selections.map(({ key, value, text }) => {
          return (
            <Option key={key} value={value}>
              {text}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
