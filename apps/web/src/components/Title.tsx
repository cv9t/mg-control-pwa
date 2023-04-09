type TitleProps = {
  value: string;
};

export default function Title({ value }: TitleProps): JSX.Element {
  return <h1>{value}</h1>;
}
