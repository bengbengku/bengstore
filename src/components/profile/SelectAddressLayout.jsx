import { Select } from '@mantine/core';
import React from 'react';

const SelectAddressLayout = ({
  form1,
  setId,
  label,
  placeholder,
  data,
  inputProp,
  valForm,
  valField,
  selectRef,
}) => {
  return (
    <Select
      {...form1.getInputProps(inputProp)}
      label={label}
      placeholder={placeholder}
      value={valForm}
      onChange={(val) => {
        form1.setFieldValue(valField, val);
        setId(val);
      }}
      data={data}
      nothingFound='Data Tidak Ditemukan.'
      ref={selectRef}
    />
  );
};

export default SelectAddressLayout;
