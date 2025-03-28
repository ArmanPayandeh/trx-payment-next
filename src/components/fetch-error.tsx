type Props = {
  error: unknown;
};

export const FetchError = (props: Props) => {
  const { error } = props;
  return <div>Something went wrong</div>;
};
