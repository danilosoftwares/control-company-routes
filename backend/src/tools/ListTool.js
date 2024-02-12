function findDifference(list1, list2) {
  const set2 = new Set(list2.map(item => item.id));  
  const difference = list1.filter(item => !set2.has(item.id));
  return difference;
}

module.exports = {
    findDifference,
};
