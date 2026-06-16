import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";

function ThemeSelector({ aria, onSelect }) {
  const { theme, setTheme, themes } = useTheme();

  const handleChange = (value) => {
    setTheme(value);
    onSelect();
  };

  return (
    <RadioGroup
      defaultValue={theme}
      className="w-fit mt-2"
      aria-labelledby={aria}
      value={theme}
      onValueChange={handleChange}
    >
      {themes.map((themeOption) => (
        <div key={themeOption} className="flex items-center gap-3 ">
          <RadioGroupItem
            value={themeOption}
            id={themeOption}
            className="cursor-pointer"
          />
          <Label htmlFor={themeOption} className="capitalize">
            {themeOption}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default ThemeSelector;
