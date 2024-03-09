import {
  PanelHeader,
  SplitLayout,
  usePlatform,
  SplitCol,
  AppRoot,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React from 'react';

import Groups from './components/Groups/Groups.tsx';

function App() {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
      >
        <SplitCol autoSpaced>
          <Groups />
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;
