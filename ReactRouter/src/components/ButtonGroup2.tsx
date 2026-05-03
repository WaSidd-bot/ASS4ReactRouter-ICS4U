import { Button } from '@/components/Button';

type ButtonGroup2Props = {
  value: string;
  options: Array<{
    label: string;
    value1: string;
    value2: string;
  }>;
  onClick: (value1: string, value2: string) => void;
};

export const ButtonGroup2 = ({ value, options, onClick }: ButtonGroup2Props) => {
  return (
    <div className="flex gap-3">
      {options.map((option) => (
        <Button key={option.value1} onClick={() => onClick(option.value1, option.value2)} variant={value === option.value1 ? 'primary' : 'grey'}>
          {option.label}
        </Button>
      ))}
    </div>
  );
};