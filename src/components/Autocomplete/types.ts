export interface AutocompleteProps<T> {
  onSelect: (item: T) => void;
  onChange: (value: string) => void;
  placeholder: string;
  value?: string;
  highlight?: boolean;
  isLoading?: boolean;
  error?: string;
  keyName: string;
  titleName: string;
  data: T[];
}
