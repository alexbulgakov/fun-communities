import { Icon56CancelCircleOutline } from '@vkontakte/icons';
import {
  Placeholder, Group,
} from '@vkontakte/vkui';
import React from 'react';

export default function Error() {
  return (
    <Group>
      <Placeholder icon={<Icon56CancelCircleOutline />} header="Ошибка">
        Произошла ошибка. Попробуйте позже
      </Placeholder>
    </Group>
  );
}
