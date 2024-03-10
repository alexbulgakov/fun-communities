import {
  SimpleCell,
  Accordion,
  CardGrid,
  Spinner,
  Footer,
  Group,
  Title,
  Card,
} from '@vkontakte/vkui';
import React, { useContext, useEffect, useState } from 'react';
import {
  Icon28Users3,
} from '@vkontakte/icons';
import plural from 'plural-ru';

import { FilterContext } from '../../context/FilterContext/FilterContext.tsx';
import useLoadingAndError from '../../hooks/useLoadingAndError.ts';
import { GroupType } from '../../types/types.ts';
import fetchGroups from '../../api/mockApi.ts';
import Error from '../Error/Error.tsx';

export default function Groups() {
  const [filteredGroups, setFilteredGroups] = useState<GroupType[]>([]);
  const { setFilters, filters } = useContext(FilterContext);
  const [groups, setGroups] = useState<GroupType[]>([]);
  const {
    setLoading, isLoading, setError, error,
  } = useLoadingAndError();
  const [openId, setOpenId] = useState(0);

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
  }, [setError, setLoading]);

  useEffect(() => {
    if (groups.length > 0) {
      const uniqueAvatarColors = Array.from(new Set(groups.map((group) => group.avatar_color).filter((color): color is string => typeof color === 'string' && color !== '')));

      setFilters((prevFilters) => ({
        ...prevFilters,
        avatarColorFilterValues: uniqueAvatarColors,
      }));
    }
  }, [groups, setFilters]);

  useEffect(() => {
    const applyFilters = () => {
      const result = groups.filter((group) => {
        const privacyMatches = filters.privacyFilter === 'all'
          || (filters.privacyFilter === 'open' && !group.closed)
          || (filters.privacyFilter === 'closed' && group.closed);
        const friendsMatches = filters.friendsFilter === 'all'
          || (filters.friendsFilter === 'true' && Boolean(group.friends))
          || (filters.friendsFilter === 'false' && !group.friends);

        const avatarColorMatches = filters.avatarColorFilter.length === 0
          || filters.avatarColorFilter.includes(group.avatar_color || '');

        return privacyMatches && friendsMatches && avatarColorMatches;
      });
      setFilteredGroups(result);
    };

    applyFilters();
  }, [filters, groups]);
  if (error) {
    return (
      <Error />
    );
  }

  return (
    <Group>
      {isLoading ? (
        <Spinner size="medium" />
      ) : (
        <CardGrid size="l">
          {filteredGroups.map((group) => (
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
                        <SimpleCell key={friend.first_name}>
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
      {!isLoading && (
        <Footer>
          {`${filteredGroups.length} ${plural(
            filteredGroups.length,
            'сообщество',
            'сообщества',
            'сообществ',
          )}`}
        </Footer>
      )}
    </Group>
  );
}
