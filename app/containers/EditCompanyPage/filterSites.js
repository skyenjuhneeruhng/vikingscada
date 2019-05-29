const formForFilter = function(sites) {
  return sites.map(({ name, id }) => ({ name, value: id }));
};

const filterForRoot = function(state) {
  const { sites } = state.company.company;

  return sites ?
    formForFilter(sites) :
    [];
};

// const filterUserToGetSites = function(users, role) {
//   const { uniqueSites: sites } = users.reduce(
//     ({ uniqueSites, ids }, { [`site_${role}`]: site }) => (
//       site && ids.indexOf(site._id) === -1 ?
//         {
//           uniqueSites: [...uniqueSites, { name: site.name, value: site._id }],
//           ids: [...ids, site._id]
//         } :
//         { uniqueSites, ids }
//     ),
//     { uniqueSites: [], ids: [] }
//   );
//
//   return sites;
// };

const filterForUser = function(state) {
  const { entities } = state;

  // if (list_data.total < 10) {
  //   return filterUserToGetSites(list_data.list, role);
  // }

  return formForFilter(entities.list);
};

const filterSites = function(state, props, listRole) {
  const { role } = props;

  if (role === 'root') {
    return filterForRoot(state);
  } else if (role === 'company' || role === 'managers') {
    return filterForUser(state, listRole);
  }
  return [];
};

export default filterSites;
