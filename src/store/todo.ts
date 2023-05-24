import { types } from "mobx-state-tree";

const UserModel = types
  .model({
    // id: types.optional(types.number, 1),
    title: types.string,
  })
  .actions((self) => ({
    setTitle(value: string) {
      self.title = value;
    },
  }));

export default UserModel;
