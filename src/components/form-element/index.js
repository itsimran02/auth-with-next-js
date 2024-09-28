import { Input } from "../ui/input";

export const CommonFormElements = ({
  currentItem,
  value,
  onChange,
}) => {
  let content = null;
  switch (currentItem?.componentType) {
    case "input":
      content = (
        <Input
          placeholder={currentItem?.placeholder}
          name={currentItem?.name}
          id={currentItem.name}
          type={currentItem?.type}
          value={value}
          onChange={onChange}
        />
      );
      break;

    default:
      content = (
        <Input
          placeholder={currentItem?.placeholder}
          name={currentItem?.name}
          id={currentItem?.name}
          type={currentItem?.type}
          value={value}
          onChange={onChange}
        />
      );
      break;
  }
  return content;
};
