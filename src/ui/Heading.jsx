function Heading({children, className, as = "h2"}) {
  const Tag = as;

  const baseStyles = {
    h1: "text-3xl font-semibold",
    h2: "text-2xl font-semibold",
    h3: "text-xl font-semibold",
    h4: "text-lg font-semibold",
    h5: "text-md font-semibold",
    h6: "text-sm font-semibold",
  };

  return <Tag className={`${baseStyles[as]} ${className}`}>{children}</Tag>;
}

export default Heading;
