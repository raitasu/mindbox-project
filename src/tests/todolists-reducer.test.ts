import { v1 } from "uuid";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
    TodolistType
} from "../components/redux/todolistsReducer";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistType> = [];
beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();
    startState = [
        { id: todolistId1, title: "First todo", filter: "all" },
        { id: todolistId2, title: "Second todo", filter: "all" },
    ];
});

test("correct todolist should be removed", () => {


    const action = removeTodolistAC(todolistId1)

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let newTodolistTitle = "New Todolist";

    const action = addTodolistAC(newTodolistTitle)

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("First todo");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
    let newFilter: 'all' | 'active' | 'completed' = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
