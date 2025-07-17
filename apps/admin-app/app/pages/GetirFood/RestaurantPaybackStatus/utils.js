export const extractErrorMessages = errors => {
  const result = (
    <div>
      {errors.map(error => <div key={error}>{error}<br /></div>)}
    </div>
  );
  return result;
};
