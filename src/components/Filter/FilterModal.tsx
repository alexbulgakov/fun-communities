import {
  FormLayoutGroup,
  RadioGroup,
  Checkbox,
  FormItem,
  Button,
  Radio,
} from '@vkontakte/vkui';
import React, { useContext, useState } from 'react';

import { FilterContext } from '../../context/FilterContext/FilterContext.tsx';
import { FILTERS_FRIENDS, FILTERS_PRIVACY } from '../../utils/constants.ts';

export default function FilterModal({ closeModal }: { closeModal: () => void }) {
  const { setFilters, filters } = useContext(FilterContext);
  const [filterPrivacy, setFilterPrivacy] = useState(filters.privacyFilter);
  const [filterColors, setFilterColors] = useState(filters.avatarColorFilter);
  const [filterFriends, setFilterFriends] = useState(filters.friendsFilter);

  const onChangeFilterColors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    if (checked) {
      setFilterColors([...filterColors, value]);
    } else {
      setFilterColors(filterColors.filter((v) => v !== value));
    }
  };

  const onChangeFilterFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFriends(e.currentTarget.value);
  };

  const onChangeFilterPrivacy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPrivacy(e.currentTarget.value);
  };

  const applyFilters = () => {
    let count = 0;

    if (filterColors.length > 0) {
      count += 1;
    }

    if (filterPrivacy !== 'all') {
      count += 1;
    }

    if (filterFriends !== 'all') {
      count += 1;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      avatarColorFilter: filterColors,
      privacyFilter: filterPrivacy,
      friendsFilter: filterFriends,
      filtersCount: count,
    }));

    closeModal();
  };

  return (
    <FormLayoutGroup>
      <FormItem top="Наличие друзей">
        <RadioGroup>
          {FILTERS_FRIENDS.map(({ label, value }) => (
            <Radio
              checked={filterFriends === value}
              onChange={onChangeFilterFriends}
              name="friends"
              value={value}
              key={value}
            >
              {label}
            </Radio>
          ))}
        </RadioGroup>
      </FormItem>

      <FormItem top="Приватность группы">
        <RadioGroup>
          {FILTERS_PRIVACY.map(({ label, value }) => (
            <Radio
              checked={filterPrivacy === value}
              onChange={onChangeFilterPrivacy}
              name="privacy"
              value={value}
              key={value}
            >
              {label}
            </Radio>
          ))}
        </RadioGroup>
      </FormItem>

      <FormItem
        top="Цвет аватарки"
      >
        {filters.avatarColorFilterValues.map((color) => (
          <Checkbox
            checked={filterColors.includes(color)}
            onChange={onChangeFilterColors}
            value={color}
            key={color}
          >
            {color}
          </Checkbox>
        ))}
      </FormItem>

      <FormItem>
        <Button onClick={applyFilters} stretched size="l">
          Показать результаты
        </Button>
      </FormItem>
    </FormLayoutGroup>
  );
}
