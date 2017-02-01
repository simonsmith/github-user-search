import {schema} from 'normalizr';

const userSchema = new schema.Entity('users');
const userListSchema = new schema.Array(userSchema);

export default userListSchema;
