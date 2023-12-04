interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  const { name } = props;
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default Header;
