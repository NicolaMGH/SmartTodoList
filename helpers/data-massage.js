module.exports = {
  dataToObj: function(arr) {
    const lists = {};
    arr.forEach((item) => {
      if (!lists[item.id]) {
        lists[item.id] = { title: item.title };
        if (item.item !== null) {
          lists[item.id][item.category] = [item.item];
        }
      } else if (!lists[item.id][item.category]) {
        lists[item.id][item.category] = [item.item];
      } else {
        if (!lists[item.id][item.category].includes(item.item)) {
          lists[item.id][item.category].push(item.item);
        }
      }
    });
    return lists;
  },
  countItems: function(arr) {
    const analytics = {};
    arr.forEach((item) => {
      if (!analytics[item.category] && item.category !== null){
        analytics[item.category] = 1;
      } else if (item.category !== null) {
        analytics[item.category] += 1;
      }
    })
    return analytics;
  }

}