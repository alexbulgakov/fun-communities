const fetchGroups = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    import('../mocks/groups.json')
      .then((data) => {
        if (data.result === 1 && data.data) {
          resolve(data.data);
        } else {
          reject(new Error('Ошибка получения данных'));
        }
      })
      .catch(() => {
        reject(new Error('Ошибка загрузки файла groups.json'));
      });
  }, 1000);
});

export default fetchGroups;
