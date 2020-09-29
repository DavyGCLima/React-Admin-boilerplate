import Roles from '../../models/Roles';

export const roleIsManufacturer = (role) => (role === Roles.MANUFACTURER);

export const filterProductsByRole = (products, user) => {
  if (roleIsManufacturer(user.role))
    return products.filter((product) => product.manufacturer.id === user.entity);
  return products;
};

export const getProductsWithFilter = (searchFilter, productsByRole) => {
  return searchFilter ? productsByRole.filter(item => !item.name.toLowerCase()
    .indexOf(searchFilter.toLowerCase()))
    : productsByRole;
};

export const filterManufacturerByRole = (manufacturers, user) => {
  if (roleIsManufacturer(user.role))
    return manufacturers.filter((manufacturer) => manufacturer.id === user.entity);
  return manufacturers;
};
