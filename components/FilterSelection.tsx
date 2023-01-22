import { Option, Select } from "@material-tailwind/react";

export interface ISelectionProps {
  key: string | number;
  value: string;
  text: string;
}
export const FilterSelection: IComponent<{
  label: string;
  className?: string;
  selections: ISelectionProps[];
  onSelect: (value: string) => void;
}> = ({ label, className, selections, onSelect }) => {
  return (
    <div>
      <Select
        value={selections[0].text}
        label={`${label}`}
        className={className}
        onChange={onSelect as any}
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
