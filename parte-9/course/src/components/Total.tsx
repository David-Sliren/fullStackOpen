interface Props {
  total: number;
}

export const Total = ({ total }: Props) => {
  return (
    <>
      <h2>Total</h2>
      <span>{total}</span>
    </>
  );
};
