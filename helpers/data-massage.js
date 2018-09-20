module.exports = {
  dataToObj: function(arr) {
    const lists = {};
    arr.forEach((item) => {
      if (!lists[item.id]) {
        lists[item.id] = { title: item.title };
        lists[item.id][item.category] = [item.item];
      } else if (!lists[item.id][item.category]) {
        lists[item.id][item.category] = [item.item];
      } else {
        lists[item.id][item.category].push(item.item);
      }
    });
    return lists;
  }
}