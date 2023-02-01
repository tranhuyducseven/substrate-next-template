import { INTERACT_TYPE, TransactionButton } from "ts-substrate-lib";

export const TransactionButtonGroup: IComponent = (props: any) => {
  return (
    <div className="flex gap-4">
      <TransactionButton
        label="Unsigned"
        type={INTERACT_TYPE.UNSIGNED}
        color="indigo"
        {...props}
      />

      <TransactionButton
        label="Signed"
        type={INTERACT_TYPE.SIGNED}
        color="blue"
        {...props}
      />
      <TransactionButton
        label="SUDO"
        type={INTERACT_TYPE.SUDO}
        color="red"
        {...props}
      />
    </div>
  );
};
