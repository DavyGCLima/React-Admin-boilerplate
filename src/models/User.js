import Roles from './Roles';

/**
 * Possible values to user status
 * @readonly
 * @enum {String}
 */
export const userStatus = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  BLOCKED: 'Blocked',
}

/**
 * @typedef User
 * @property {String} id
 * @property {String} name
 * @property {String} email
 * @property {Roles} role
 * @property {userStatus} status
 * @property {String} entity
 * @param {User} attributes
 */
export default function User(attributes = {}) {
  const user = {};
  user.id = attributes.id || '';
  user.name = attributes.name || '';
  user.email = attributes.email || '';
  user.role = attributes.role ? Roles[attributes.role] : '';
  user.status = attributes.status
    ? userStatus[attributes.status]
    : userStatus.INACTIVE;
  user.entity = attributes.entity || '';
  return user;
};

/**
 * Prepare the user to be persisted
 * @param {User} user
 * @returns {Object} prepared to be persisted
 */
export function toJson(user) {
  delete user.id;
  delete user.__typename;
  delete user.entity;
  return user;
};


/**
 * Transform a User from API to an version that can be used in componentes
 * @param {Object} user
 * @return {User}
 */
export function fromJson(user) {
  return User(user);
};
