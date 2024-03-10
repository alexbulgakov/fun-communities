import {
  SubnavigationButton,
  SubnavigationBar,
  VisuallyHidden,
  Counter,
  Group,
} from '@vkontakte/vkui';
import { Icon24Filter } from '@vkontakte/icons';
import React, { useContext } from 'react';

import { FilterContext } from '../../context/FilterContext/FilterContext.tsx';
import useLoadingAndError from '../../hooks/useLoadingAndError.ts';

export default function FilterPanel({ openModal }: { openModal: () => void }) {
  const { filters } = useContext(FilterContext);
  const { isLoading, error } = useLoadingAndError();

  return (
    <Group>
      <SubnavigationBar>
        <SubnavigationButton
          after={
            filters.filtersCount > 0 && (
              <Counter size="s">
                <VisuallyHidden>Применено: </VisuallyHidden>
                {filters.filtersCount}
              </Counter>
            )
          }
          selected={filters.filtersCount > 0}
          disabled={!!(isLoading || error)}
          before={<Icon24Filter />}
          onClick={openModal}
          expandable
        >
          Фильтры
        </SubnavigationButton>
      </SubnavigationBar>
    </Group>
  );
}
