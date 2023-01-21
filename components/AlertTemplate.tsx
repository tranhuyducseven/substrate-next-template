import { Alert } from "@material-tailwind/react";

interface IAlertTemplateProps {
  className?: string;
  header?: string;
  content: string;
}
export const AlertTemplate: IComponent<IAlertTemplateProps> = ({
  className,
  header,
  content,
}) => {
  return (
    <Alert
      className={className}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
    >
      {header && <div className="font-bold text-xl">{header}</div>}
      <div>{content}</div>
    </Alert>
  );
};
