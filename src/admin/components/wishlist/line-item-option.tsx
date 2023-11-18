import { ProductVariant } from "@medusajs/medusa";

type LineItemOptionsProps = { variant: ProductVariant };

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  return (
    <div className="text-xs">
      {variant.options.map((option) => {
        const optionName =
          variant.product.options.find((opt) => opt.id === option.option_id)
            ?.title || "Option";
        return (
          <div key={option.id} className="flex flex-col gap-y-1">
            <span>
              {optionName}: {option.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default LineItemOptions;
