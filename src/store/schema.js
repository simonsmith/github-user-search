import {schema} from 'normalizr';
import pick from 'lodash/fp/pick';

const pickUserData = pick([
  'login',
  'id',
  'avatar_url',
]);

const user = new schema.Entity('users', {}, {
  processStrategy: entity => pickUserData(entity),
});

const userSchema = new schema.Array(user);
export default userSchema;
