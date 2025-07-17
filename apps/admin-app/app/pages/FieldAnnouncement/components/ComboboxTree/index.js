import { useEffect, useRef, useState } from 'react';

import {
  CaretDownOutlined,
  CaretRightOutlined,
  CloseCircleFilled,
  CloseOutlined,
  DownOutlined,
  Loading3QuartersOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { uniqueId } from 'lodash';

import cn from 'classnames';

import { Button } from 'antd';

import useStyles from './styles';
import { useOnClickOutside } from '@shared/hooks';
import { t } from '@shared/i18n';

/**
 * Renders a single option tag with a remove button.
 *
 * @param {Object} props
 * @param {Object} props.option - Selected option
 * @param {Function} props.onRemove - Callback function when a tag is removed
 *
 * @returns {React.Component} OptionTag
 */
const OptionTag = ({ option, onRemove }) => {
  const classes = useStyles();
  return (
    <div className={classes.comboboxTreeTag}>
      <span className={classes.comboboxTreeTagTitle}>{option.title}</span>
      <button type="button" className={classes.comboboxTreeTagRemoveButon} onClick={() => onRemove(option)} tabIndex={-1}>
        <CloseOutlined />
      </button>
    </div>
  );
};

/**
 * Renders a list of selected options as removable tags with a limit of maxTagCount.
 *
 * @param {Object} props
 * @param {Array} props.options - List of selected options
 * @param {Function} props.onRemove - Callback function when a tag is removed
 * @param {Number} props.maxTagCount - Maximum number of tags to display
 *
 * @returns {React.Component} OptionTagList
 */
const OptionTagList = ({ options, onRemove, maxTagCount = 20 }) => {
  const classes = useStyles();
  const tags = [];

  for (let i = 0; i < Math.min(options.length, maxTagCount); i++) {
    const option = options[i];
    tags.push(
      <OptionTag key={`option_tag_${i}_${option.value}`} option={option} onRemove={onRemove} />,
    );
  }

  const remainingCount = options.length - maxTagCount;

  return (
    <>
      {tags}
      {remainingCount > 0 && (
        <div className={classes.comboboxTreeTag}>
          <span className={classes.comboboxTreeTagTitle}>{`+ ${remainingCount} ...`}</span>
        </div>
      )}
    </>
  );
};

/**
 * Renders a combobox tree component.
 *
 * @param {Object} props
 * @param {Array} props.data - List of options to display
 * @param {Function} props.onChange - Callback function when an option is selected
 * @param {String} props.placeholder - Placeholder text
 * @param {Boolean} props.allowSelectAll - Whether to allow selecting all options
 * @param {Number} props.maxTagCount - Maximum number of tags to display
 *
 * @returns {React.Component} ComboboxTree
 */
const ComboboxTree = ({ data, onChange, placeholder, allowSelectAll, maxTagCount = 20, loading, disabled }) => {
  const classes = useStyles();
  const [currentOptions, setCurrentOptions] = useState(data);

  const [checkedOptions, setCheckedOptions] = useState([]);
  const [expandedOptions, setExpandedOptions] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const inputWidthRef = useRef(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setCurrentOptions(data);
  }, [data]);

  /**
   * This is used for supporting dynamic width of the input field.
   * Input should be as wide as the text inside it.
   */
  useEffect(() => {
    setWidth(inputWidthRef.current.offsetWidth * 1.2);
  }, [searchTerm]);

  /**
   * This is called when clicked outside of the component.
   * It closes the dropdown and resets the search term.
   */
  const handleOutsideClick = () => {
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  useOnClickOutside({ ref: containerRef, handler: handleOutsideClick });

  const changeSelectedOptions = options => {
    setCheckedOptions(options);
    if (typeof onChange === 'function') {
      onChange(options.map(option => option.value));
    }
  };

  /**
   * This is called when a parent is expanded or collapsed by clicking on the arrow icon.
   * It updates the expandedOptions state.
   *
   * @param {Object} option - Selected option
   */
  const handleExpandToggle = option => {
    const isExpanded = expandedOptions.includes(option.value);

    const updatedExpandedOptions = isExpanded
      ? expandedOptions.filter(parent => parent !== option.value)
      : [...expandedOptions, option.value];

    setExpandedOptions(updatedExpandedOptions);
  };

  /**
   * This is called when an option is checked or unchecked.
   * It updates the checkedOptions state.
   *
   * @param {Object} option - Selected option
   * @param {Boolean} currentValue - Current checked state of the option
   */
  const handleCheckToggle = (option, currentValue) => {
    let updatedCheckedOptions = [...checkedOptions];

    const isParent = option.children && option.children.length > 0;

    if (isParent) {
      // If a parent is checked we iterate through every child of the parent
      // and update their state accordingly
      const toggleChildren = children => {
        children.forEach(child => {
          if (child.children && child.children.length > 0) {
            toggleChildren(child.children);
          }
          else {
            updatedCheckedOptions = updatedCheckedOptions.filter(
              opt => opt.value !== child.value,
            );

            if (!currentValue) {
              updatedCheckedOptions.push(child);
            }
          }
        });
      };

      toggleChildren(option.children);
    }
    else if (currentValue) {
      // If the current option is a single option (leaf) and is checked, we remove it from the checked options
      updatedCheckedOptions = updatedCheckedOptions.filter(
        opt => opt.value !== option.value,
      );
    }
    else {
      // If the current option is a single option (leaf) and is not checked, we add it to the checked options
      updatedCheckedOptions.push(option);
    }

    changeSelectedOptions(updatedCheckedOptions);
  };

  /**
   * Gets all child options with no duplicate values
   *
   * @param {Array} options
   * @returns {Array}
   */
  const getAllOptions = options => {
    let allOptions = [];

    options.forEach(option => {
      const isParent = option.children && option.children.length > 0;

      if (isParent) {
        allOptions = [...allOptions, ...getAllOptions(option.children)];
      }
      else {
        allOptions.push(option);
      }
    });

    return allOptions.filter(
      (option, index, self) => index === self.findIndex(opt => opt.value === option.value),
    );
  };

  /**
   * Determines whether all children of a parent are checked.
   * This is used for determining the checked state of a parent.
   * If all children are checked, the parent should be checked as well.
   *
   * @param {Array} children - Children of the parent
   */
  const isAllChildrenChecked = children => {
    return children.every(child => {
      if (child.children && child.children.length > 0) {
        return isAllChildrenChecked(child.children);
      }

      return checkedOptions.find(option => option.value === child.value);
    });
  };

  /**
   * Determines whether parent has indeterminate state.
   * In other words, whether some of the children are checked and some are not.
   *
   * @param {Array} parentChildren
   * @returns {Boolean}
   */
  const isParentIndeterminate = parentChildren => {
    const allChildren = [];

    // Get all children recursively
    const getChildren = children => {
      children.forEach(option => {
        if (option.children) {
          getChildren(option.children);
        }
        else {
          allChildren.push(option.value);
        }
      });
    };

    getChildren(parentChildren);

    // Get the values of all checked options for ease of comparison
    const checkedOptionValues = checkedOptions.map(option => option.value);

    return allChildren.some(value => checkedOptionValues.includes(value)) && allChildren.some(value => !checkedOptionValues.includes(value));
  };

  /**
   * This is used for rendering the options.
   * It renders the options recursively.
   * If the option is a parent, it renders the children recursively.
   * If the option is a single option (leaf), it renders the checkbox.
   * If the option is a parent, it renders the arrow icon for expanding/collapsing the parent.
   *
   * @param {Array} options - Options to be rendered
   */
  const renderOptions = options => {
    return options.map(option => {
      const isParent = option.children && option.children.length > 0;
      const isExpanded = expandedOptions.includes(option.value);
      const isChecked = isParent ? isAllChildrenChecked(option.children) : checkedOptions.find(opt => opt.value === option.value) || false;

      const isIndeterminate = isParent && !isChecked ? isParentIndeterminate(option.children) : false;

      let shouldHide = false;

      if (isParent) {
        const isAnyChildMatched = option.children.some(child => {
          if (child.children && child.children.length > 0) {
            return child.children.some(grandChild => grandChild.title.toLowerCase().includes(searchTerm.toLowerCase()));
          }
          return child.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (!isAnyChildMatched) {
          shouldHide = true;
        }
      }
      else {
        shouldHide = !option.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      if (shouldHide) {
        return null;
      }

      const optionId = uniqueId('combobox-tree-option-');

      return (
        <>
          <div key={option.value} className={classes.comboboxTreeDropdownOption}>
            <div className={classes.comboboxTreeDropdownOptionHandler}>
              {isParent && (
                <button
                  type="button"
                  className={classes.comboboxTreeDropdownOptionHandlerButton}
                  onClick={() => {
                    handleExpandToggle(option);
                  }}
                >
                  {isExpanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
                </button>
              )}
            </div>
            <label htmlFor={optionId} className={classes.comboboxTreeDropdownOptionLabel}>
              <span className={classes.comboboxTreeDropdownOptionTitle}>{option.title}</span>
              <input
                id={optionId}
                className={classes.comboboxTreeDropdownOptionCheckbox}
                type="checkbox"
                checked={isChecked}
                disabled={disabled}
                onChange={() => {
                  handleCheckToggle(option, isChecked);
                }}
              />
              <span className={cn(classes.comboboxTreeDropdownOptionCheckmark, isIndeterminate && classes.comboboxTreeDropdownOptionCheckmarkInderminate)} />
            </label>
          </div>
          {isParent && isExpanded && <div className={classes.comboboxTreeDropdownOptionChildren}>{renderOptions(option.children)}</div>}
        </>
      );
    });
  };

  const handleSearch = e => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
  };

  const handleClear = () => {
    changeSelectedOptions([]);
    setSearchTerm('');
  };

  const handleSelectAll = () => {
    const allOptions = getAllOptions(currentOptions);
    changeSelectedOptions(allOptions);
  };

  const handleDeselectAll = () => {
    changeSelectedOptions([]);
  };

  const handleContanierClick = () => {
    if (!disabled && !loading) {
      inputRef.current.focus();
    }
  };

  const hasSelectedOptions = checkedOptions.length > 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        classes.comboboxTreeContainer,
        hasSelectedOptions && classes.comboboxTreeHasTags,
        searchTerm !== '' && classes.comboboxTreeIsSearching,
        isDropdownOpen && classes.comboboxTreeIsActive,
        loading && classes.comboboxTreeIsLoading,
        disabled && classes.comboboxTreeIsDisabled,
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={classes.comboboxTreeWrapper} onClick={handleContanierClick} aria-hidden="true">
        <div className={classes.comboboxTreeInputContainer}>
          <OptionTagList options={checkedOptions} onRemove={option => handleCheckToggle(option, true)} maxTagCount={maxTagCount} />
          <input
            ref={inputRef}
            className={classes.comboboxTreeInput}
            style={{ width }}
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder={hasSelectedOptions ? '' : placeholder}
            disabled={disabled}
          />
          <span className={classes.comboboxTreeInputWidth} ref={inputWidthRef}>{searchTerm}</span>
        </div>

        <div className={classes.comboboxTreeActionWrapper}>
          <button
            className={`${classes.comboboxTreeActionButton} ${classes.comboboxTreeActionButtonDown}`}
            type="button"
            tabIndex="-1"
          ><DownOutlined />
          </button>
          <button
            className={`${classes.comboboxTreeActionButton} ${classes.comboboxTreeActionButtonSearch}`}
            type="button"
            tabIndex="-1"
          ><SearchOutlined />
          </button>
          <button
            className={`${classes.comboboxTreeActionButton} ${classes.comboboxTreeActionButtonClear}`}
            type="button"
            tabIndex="-1"
            onClick={handleClear}
          ><CloseCircleFilled />
          </button>
          <button
            className={`${classes.comboboxTreeActionButton} ${classes.comboboxTreeActionButtonLoading}`}
            type="button"
            tabIndex="-1"
          ><Loading3QuartersOutlined spin />
          </button>
        </div>
      </div>
      <div className={`${classes.comboboxTreeDropdown} ${isDropdownOpen && classes.comboboxTreeDropdownIsOpen}`}>
        {allowSelectAll && (
          <div className={classes.comboboxTreeDropdownActions}>
            <Button type="link" size="small" onClick={handleDeselectAll}>{t('button:UNSELECT_ALL')}</Button>
            <Button type="link" size="small" onClick={handleSelectAll}>{t('global:SELECT_ALL')}</Button>
          </div>
        )}
        {renderOptions(currentOptions)}
      </div>
    </div>

  );
};

export default ComboboxTree;
