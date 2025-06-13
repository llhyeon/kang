export const Session = (() => {
  const load = (_storageKey: string) => {
    try {
      return JSON.parse(sessionStorage.getItem(_storageKey) || '{}');
    } catch {
      console.warn('Failed to parse sessionStorage data');
      return {};
    }
  };

  const save = (
    _storageKey: string,
    _itemKey: string,
    value: Record<string, string | number | boolean | []>,
  ) => {
    const _loadedData = load(_storageKey);

    let newData;

    // 내부 값이 객체이고, value도 객체면 병합
    if (
      typeof _loadedData[_itemKey] === 'object' &&
      _loadedData[_itemKey] !== null &&
      !Array.isArray(_loadedData[_itemKey]) &&
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      newData = {
        ..._loadedData,
        [_itemKey]: {
          ..._loadedData[_itemKey],
          ...value,
        },
      };
    } else {
      newData = {
        ..._loadedData,
        [_itemKey]: value,
      };
    }

    sessionStorage.setItem(_storageKey, JSON.stringify(newData));
  };

  const loadItem = (_storageKey: string) => {
    return JSON.parse(sessionStorage.getItem(_storageKey) || '{}');
  };

  const saveItems = (_storageKey: string, value: string | number | boolean | []) => {
    sessionStorage.setItem(_storageKey, JSON.stringify(value));
  };

  return {
    load,
    save,
    loadItem,
    saveItems,
  };
})();
