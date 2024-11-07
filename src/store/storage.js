const Storage = window.localStorage;

export function setStorage(name, data) {
  if (data === '' || data === null || typeof data === "undefined") {
    Storage.removeItem(name)
    return
  }
  if (typeof data === 'object') {
    Storage.setItem(name, JSON.stringify(data))
  } else {
    Storage.setItem(name, data)
  }
}

export function getStorage(name) {
  const data = Storage.getItem(name);
  try {
    if (data){
      return JSON.parse(data)
    }
  } catch (e) {

  }
  return data
}
