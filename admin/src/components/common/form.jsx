import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setformData,
  onSubmit,
  buttonText,
  isEditable = true,
}) {
  const types = {
    INPUT: "input",
    SELECT: "select",
    TEXTAREA: "textarea",
  };
  let element = null;
  function renderInputElement(ControlItem) {
    const value = formData[ControlItem.name] || "";
    switch (ControlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            id={ControlItem.name}
            name={ControlItem.name}
            value={value}
            type={ControlItem.type}
            placeholder={ControlItem.placeholder}
            onChange={(event) => {
              setformData((prev) => ({
                ...prev,
                [ControlItem.name]: event.target.value,
              }));
            }}
          />
        );
        break;
      case types.SELECT:
        element = (
          <Select
            value={value}
            onvValueChange={(event) => {
              setformData((prev) => ({
                ...prev,
                [ControlItem.name]: event.target.value,
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={ControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {ControlItem.options && ControlItem.options.length > 0
                ? ControlItem.options.map((option) => (
                    <SelectItem key={option.id} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
      case types.TEXTAREA:
        <Textarea
          id={ControlItem.name}
          name={ControlItem.name}
          placeholder={ControlItem.placeholder}
          value={value}
          onChange={(event) => {
            setformData((prev) => ({
              ...prev,
              [ControlItem.name]: event.target.value,
            }));
          }}
        />;

      default:
        element = (
          <Input
            id={ControlItem.name}
            name={ControlItem.name}
            value={value}
            type={ControlItem.type}
            placeholder={ControlItem.placeholder}
            onChange={(event) => {
              setformData((prev) => ({
                ...prev,
                [ControlItem.name]: event.target.value,
              }));
            }}
          />
        );
        break;
    }
    return element;
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          {formControls.map((controls) => (
            <div key={controls.name} className="grid w-full gap-1.5">
              <Label htmlFor={controls.name}>{controls.label}</Label>
              {renderInputElement(controls)}
            </div>
          ))}
        </div>
        <Button
          type="submit"
          className={`mt-3 w-full cursor-pointer ${
            !isEditable
              ? "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
              : ""
          }`}
          disabled={!isEditable}
        >
          {buttonText || "Submit"}
        </Button>
      </form>
    </div>
  );
}
export default CommonForm;
