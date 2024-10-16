import { Field } from "@/lib/document";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import Generics from "./generics";
import { CameraFill } from "./fonesa-icons";
import { cn } from "@/lib/utils";

interface RenderFieldsProps {
  fields: Field[];
  maxPerRow: number;
  inputData: Record<string, string>;
  inputErrors: Record<string, string>;
  applyData: (key: string, value: string) => void;
  openBarcodeScanner: () => void;
  disabled: boolean;
  selectedState: string | null;
}

type CommonPropsFunction = (field: Field) => {
  className: string;
  classNames: {
    base: string;
    helperWrapper: string;
  };
  color: "default";
  variant: "bordered";
  value: string;
  onChange: (val: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isDisabled: boolean;
  isInvalid: boolean;
  errorMessage: string;
  isRequired: boolean;
  label: string;
  size: "md";
};

interface RenderOptionsProps {
  options: Field;
  commonProps: CommonPropsFunction;
}

const RenderOptions = ({ options, commonProps }: RenderOptionsProps) => {
  return (
    <Select {...commonProps(options)}>
      {Array.isArray(options.data) ? (
        options.data.map((item, itemIndex) => (
          <SelectItem
            className="text-[#212121] dark:text-[#fafafa]"
            key={`item-${itemIndex}`}
            value={String(item)}
          >
            {String(item)}
          </SelectItem>
        ))
      ) : (
        <SelectItem
          className="text-[#212121] dark:text-[#fafafa]"
          key={`item`}
          value={"0"}
        >
          Nada
        </SelectItem>
      )}
    </Select>
  );
};

export const RenderFields = ({
  fields,
  maxPerRow = 3,
  inputData,
  inputErrors,
  applyData,
  openBarcodeScanner,
  disabled,
  selectedState,
}: RenderFieldsProps) => {
  const groupFields = (fields: Field[], maxPerRow: number): Field[][] => {
    return fields.reduce((acc, field, index) => {
      const groupIndex = Math.floor(index / maxPerRow);
      if (!acc[groupIndex]) {
        acc[groupIndex] = [];
      }
      acc[groupIndex].push(field);
      return acc;
    }, [] as Field[][]);
  };

  const [fieldGroups, setFieldsGroup] = useState(
    groupFields(fields, maxPerRow)
  );

  useEffect(() => {
    setFieldsGroup(groupFields(fields, maxPerRow));
  }, [fields, maxPerRow]);

  const commonProps = (field: Field) => {
    return {
      className: field.className || "",
      classNames: {
        base: "relative",
        helperWrapper: "absolute -bottom-[20px] left-0 min-w-max",
      },
      color: "default" as const,
      variant: "bordered" as const,
      value: inputData[field.id],
      onChange: (val: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = field?.mask
          ? field.mask(val.target.value)
          : val.target.value;
        applyData(field.id, value);
      },
      isDisabled: disabled,
      isInvalid: !!inputErrors[field.id],
      errorMessage: inputErrors[field.id],
      isRequired: field.mandatory ?? false,
      label: field.label,
      size: "md" as const,
    };
  };

  return (
    <>
      {fieldGroups.map((group, index) => (
        <div key={`group-${index}`} className="flex flex-row gap-4 w-full">
          {group.map((field, fieldIndex) => (
            <div className="flex-1" key={`field-${field.id}-${fieldIndex}`}>
              {field.type === "select" ? (
                <RenderOptions
                  key={`select-${field.id}-${fieldIndex}`}
                  options={field}
                  commonProps={commonProps}
                />
              ) : (
                <>
                  {field.conditional ? (
                    selectedState &&
                    !field.conditional({ state: selectedState }) && (
                      <Input
                        key={`input-${field.id}-${fieldIndex}`}
                        {...commonProps(field)}
                      />
                    )
                  ) : (
                    <div
                      className={cn(
                        "flex flex-row gap-4",
                        field.classNames?.base
                      )}
                      style={{...field.styles?.base }}
                    >
                      <Input
                        key={`input-${field.id}-${fieldIndex}`}
                        {...commonProps(field)}
                      />
                      {field.type === "barcode" && (
                        <Generics.Button
                          key={`barcode-button-${field.id}-${fieldIndex}`}
                          color="primary"
                          variant="solid"
                          size="md"
                          className="h-14 text-2xl text-[#fafafa] order-last"
                          isDisabled={disabled}
                          onPress={openBarcodeScanner}
                        >
                          <CameraFill />
                        </Generics.Button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
