import React from 'react';
import { func, object, string } from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'aqueduct-components';

const MobileFilters = ({ className, children, mobileFilters, toggleMobileFilters }) => {
  const handleToggle = () => {
    toggleMobileFilters(!mobileFilters.open)
  };
  const classNames = classnames('c-mobile-filters', {
    '-opened': mobileFilters.open,
    [className]: !!className
  });

  return (
    <div className={classNames}>
      <button
        type="button"
        className="mobile-filters-btn"
        onClick={handleToggle}
      >
        <Icon name="icon-filters" className="-medium" />
        <span>Filters</span>
        <Icon name="icon-expand" className="-medium icon-toggle" />
      </button>

      <div className="mobile-filters-wrapper">
        {children}
      </div>
    </div>
  );
};

MobileFilters.propTypes = {
  children: object.isRequired,
  mobileFilters: object.isRequired,
  className: string,
  toggleMobileFilters: func.isRequired
};

MobileFilters.defaultProps = { className: null };

export default MobileFilters;
