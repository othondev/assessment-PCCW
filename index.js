/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (excludes, arr) => {
  return arr.map(item => {
    excludes.forEach( key => delete item[key])
    return item
  })
};

exports.excludeByProperty = (deleteFunc, arr) => {
  return arr.reduce((newArray, item) => {
    if(!item[deleteFunc]){
      newArray.push(item)
    }
    return newArray
  },[])
};

exports.sumDeep = (arr) => {
  return arr.map(item => {
    return {objects: item.objects.reduce((total, i) => total + i.val,0)}
  });
};

exports.applyStatusColor = (codes, arr) => {
  return arr.reduce((arrWithCode, item) => {

    const [ colorFound ] = Object.keys(codes).filter((color) => codes[color].includes(item.status))

    if(colorFound) {
      arrWithCode.push({status: item.status, color: colorFound})
    }
    return arrWithCode
  },[])
};

exports.createGreeting = (greetFunc, greetString) => {
  return (name) => greetFunc(greetString, name)
};

exports.setDefaults = (defaultKeys) => {
  return (object) => {
    const merge = {...defaultKeys, ...object}
    return merge
  }
};

exports.fetchUserByNameAndUsersCompany = async (name, {fetchUsers, fetchCompanyById, fetchStatus}) => {
  const userFetched = await fetchUsers()
  const [ userFilted ] = userFetched.filter(u => u.name === name)
  const result = await Promise.all([
    fetchStatus(),
    fetchCompanyById(userFilted.companyId)
  ])
  return {
    company: result[1],
    user: userFilted,
    status: result[0]
  }

};
