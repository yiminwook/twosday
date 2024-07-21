interface EditableTagProps {
  name: string;
}

export default function Editable({ name }: EditableTagProps) {
  return <div>{name}</div>;
}
