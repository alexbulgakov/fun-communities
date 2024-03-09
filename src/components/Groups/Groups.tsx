import {
  PanelHeader,
  Placeholder,
  SimpleCell,
  Accordion,
  CardGrid,
  Spinner,
  Footer,
  Group,
  Title,
  Panel,
  View,
  Card,
} from '@vkontakte/vkui';
import { Icon56CancelCircleOutline, Icon28Users3, Icon36LogoVk } from '@vkontakte/icons';
import React, { useEffect, useState } from 'react';
import plural from 'plural-ru';

import { GroupType } from '../../types/types.ts';
import fetchGroups from '../../api/mockApi.ts';

export default function Groups() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openId, setOpenId] = React.useState(0);

  useEffect(() => {
    setLoading(true);
    fetchGroups()
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <View activePanel="main">
        <Panel style={{ maxWidth: '800px', margin: '0 auto' }} id="main">
          <PanelHeader before={<Icon36LogoVk />}>Мои сообщества</PanelHeader>
          <Group>
            <Placeholder icon={<Icon56CancelCircleOutline />} header="Ошибка">
              Произошла ошибка. Попробуйте позже
            </Placeholder>
          </Group>
        </Panel>
      </View>
    );
  }

  return (
    <View activePanel="main">
      <Panel style={{ maxWidth: '800px', margin: '0 auto' }} id="main">
        <PanelHeader before={<Icon36LogoVk />}>Мои сообщества</PanelHeader>
        <Group>
          {loading ? (
            <Spinner size="medium" />
          ) : (
            <CardGrid size="l">
              {groups.map((group) => (
                <Card key={group.id}>
                  <SimpleCell
                    before={
                    group.avatar_color ? (
                      <div
                        style={{
                          backgroundColor: group.avatar_color,
                          borderRadius: '50%',
                          height: '100px',
                          width: '100px',
                        }}
                      />
                    ) : (
                      <Icon28Users3 height={100} width={100} />
                    )
                  }
                    subtitle={`${group.members_count} ${plural(
                      group.members_count,
                      'участник',
                      'участника',
                      'участников',
                    )} | ${group.closed ? 'закрытая' : 'открытая'}`}
                  >
                    <Title level="3">{group.name}</Title>
                  </SimpleCell>
                  {group.friends && (
                  <Accordion
                    onChange={(e) => (e ? setOpenId(group.id) : setOpenId(0))}
                    expanded={openId === group.id}
                  >
                    <Accordion.Summary>
                      {`${group.friends.length} ${plural(
                        group.friends.length,
                        'друг',
                        'друга',
                        'друзей',
                      )} в группе`}
                    </Accordion.Summary>
                    <Accordion.Content>
                      {group.friends.map(
                        (friend: { first_name: string; last_name: string }) => (
                          <SimpleCell>
                            {`${friend.first_name} ${friend.last_name}`}
                          </SimpleCell>
                        ),
                      )}
                    </Accordion.Content>
                  </Accordion>
                  )}
                </Card>
              ))}
            </CardGrid>
          )}

        </Group>
        {!loading && (
        <Footer>
          {`${groups.length} ${plural(
            groups.length,
            'сообщество',
            'сообщества',
            'сообществ',
          )}`}
        </Footer>
        )}

      </Panel>
    </View>
  );
}
