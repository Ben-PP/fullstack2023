interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  const { total } = props;
  return (
    <div>
      <h3>Number of exercises {total}</h3>
    </div>
  );
};

export default Total;
