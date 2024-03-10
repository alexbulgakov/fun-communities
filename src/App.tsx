import {
  ModalPageHeader,
  PanelHeader,
  SplitLayout,
  usePlatform,
  ModalRoot,
  ModalPage,
  SplitCol,
  AppRoot,
  Panel,
  View,
} from '@vkontakte/vkui';
import { Icon36LogoVk } from '@vkontakte/icons';
import React, { useState } from 'react';
import '@vkontakte/vkui/dist/vkui.css';

import { LoadingAndErrorProvider } from './context/LoadingAndErrorContext/LoadingAndErrorContext.tsx';
import FilterProvider from './context/FilterContext/FilterContext.tsx';
import FilterPanel from './components/FilterPanel/FilterPanel.tsx';
import FilterModal from './components/Filter/FilterModal.tsx';
import Groups from './components/Groups/Groups.tsx';

function App() {
  const platform = usePlatform();
  const [filtersModalOpened, setFiltersModalOpened] = useState(false);

  const openModal = () => {
    setFiltersModalOpened(true);
  };

  const closeModal = () => {
    setFiltersModalOpened(false);
  };

  const modal = (
    <ModalRoot activeModal={filtersModalOpened ? 'filters' : null}>
      <ModalPage
        header={<ModalPageHeader>Фильтры</ModalPageHeader>}
        onClose={closeModal}
        id="filters"
      >
        <FilterModal closeModal={closeModal} />
      </ModalPage>
    </ModalRoot>
  );

  return (
    <AppRoot>
      <LoadingAndErrorProvider>
        <FilterProvider>
          <SplitLayout
            header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
            modal={modal}
          >
            <SplitCol autoSpaced>
              <View activePanel="main">
                <Panel style={{ maxWidth: '800px', margin: '0 auto' }} id="main">
                  <PanelHeader before={<Icon36LogoVk />}>
                    Мои сообщества
                  </PanelHeader>
                  <FilterPanel openModal={openModal} />
                  <Groups />
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
        </FilterProvider>
      </LoadingAndErrorProvider>
    </AppRoot>
  );
}

export default App;
