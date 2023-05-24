import { onSnapshot, types } from "mobx-state-tree";
import data from "./data.json";
import UserModel from "./todo";

const Todos = types
  .model("Todos", {
    TODO: types.array(types.string),
  })
  .actions((self) => ({
    setTitleValue(value: string) {
      // self.TODO.map((item) => (item.title = value));
      // self.TODO.push({title : value})
      self.TODO.push(value);
      // console.log("cstyfd", value);
    },
    Remove(value: string) {
      // let index = JSON.stringify(self.TODO).indexOf(value)
      let index = self.TODO.indexOf(value);
      self.TODO.splice(index, 1);
      // console.log("csd", index);
    },
  }));

// const USERS = UserModel.create({
//   userId: 1,
//   id: 1,
//   title: "quis ut nam facilis et officia qui",
// });

// if(localStorage.getItem("TodoData")){
//   const json = JSON.parse(localStorage.getItem("TodoData"))
//   if (Todos.is(json)){TODO = json}
// }

const TodosAll = Todos.create({
  TODO: [],
});

onSnapshot(TodosAll, (snapshot) => {
  localStorage.setItem("TodoData", JSON.stringify(snapshot));
});

// export const TodosAll = Todos.create({
//   TODO: [],
// });

export default TodosAll;
