import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';

const CSVSelect = ({
  activeKey,
  value,
  label,
  description,
  clientListKey,
  selectable,
  single = false,
  tagValue,
  tagKey = 'id',
  onSelected,
  onBlur,
}) => {
  if (single) {
    return (
      <SingleSelect
        activeKey={activeKey}
        value={value}
        label={label}
        clientListKey={clientListKey}
        selectable={selectable}
        tagValue={tagValue}
        tagKey={tagKey}
        onSelected={onSelected}
      />
    );
  }

  return (
    <MultipleSelect
      activeKey={activeKey}
      value={value}
      label={label}
      description={description}
      clientListKey={clientListKey}
      selectable={selectable}
      onBlur={onBlur}
      tagValue={tagValue}
      tagKey={tagKey}
      showCSVImporter
    />
  );
};

export default CSVSelect;
