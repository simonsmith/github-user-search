function getItem(key) {
  var item = sessionStorage.getItem(key);

  try {
    item = JSON.parse(item);
  } catch (e) {}

  return item;
}

function setItem(key, value) {
  var type = toType(value);

  if (/object|array/.test(type)) {
    value = JSON.stringify(value);
  }

  sessionStorage.setItem(key, value);
}

function removeItem(key) {
  sessionStorage.removeItem(key);
}

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}

export { getItem, setItem, removeItem }