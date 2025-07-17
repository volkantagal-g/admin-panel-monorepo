import GetirJobsPostDetailSelect from '../../Select/GetirJobsPostDetailSelect';

const JobsPostDetailAction = (
  {
    postIdFieldName,
    postTypeFieldName,
    pageIdFieldName,
    disabled,
    form,
    actionObjName,
  },
) => {
  return (
    <GetirJobsPostDetailSelect
      postIdFieldName={postIdFieldName}
      postTypeFieldName={postTypeFieldName}
      pageIdFieldName={pageIdFieldName}
      disabled={disabled}
      form={form}
      actionObjName={actionObjName}
    />
  );
};

export default JobsPostDetailAction;
