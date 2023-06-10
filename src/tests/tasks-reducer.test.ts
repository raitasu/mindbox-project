import {
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTasksAC,
    tasksReducer,
    TasksStateType
} from "../components/redux/tasksReducer";
import {addTodolistAC} from "../components/redux/todolistsReducer";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: "1",
                title: "CSS",
                isDone: false,
                todolistId: "todolistId1"
            },
            {
                id: "2",
                title: "JS",
                isDone: true,
                todolistId: "todolistId1"
            },
            {
                id: "3",
                title: "React",
                isDone: false,
                todolistId: "todolistId1"
            },
        ],
        todolistId2: [
            {
                id: "1",
                title: "bread",
                isDone: false,
                todolistId: "todolistId2"
            },
            {
                id: "2",
                title: "milk",
                isDone: true,
                todolistId: "todolistId2"
            },
            {
                id: "3",
                title: "tea",
                isDone: false,
                todolistId: "todolistId2"
            },
        ],
    };
});

test("correct task should be deleted from correct array", () => {
    const action = removeTasksAC("2", "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        todolistId1: [
            {
                id: "1",
                title: "CSS",
                isDone: false,
                todolistId: "todolistId1",
            },
            {
                id: "2",
                title: "JS",
                isDone: true,
                todolistId: 'todolistId1'
            },
            {
                id: "3",
                title: "React",
                isDone: false,
                todolistId: "todolistId1",
            },
        ],
        todolistId2: [
            {
                id: "1",
                title: "bread",
                isDone: false,
                todolistId: "todolistId2",
            },
            {
                id: "3",
                title: "tea",
                isDone: false,
                todolistId: "todolistId2",
            },
        ],
    });
});

test("correct task should be added to correct array", () => {
    const action = addTaskAC("todolistId2", 'new task');

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("new task");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId2"].length).toBe(3);
});

test("title of specified task should be changed", () => {
    const action = changeTaskTitleAC("2", "newTitle", "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].title).toBe("newTitle");
    expect(endState["todolistId2"].length).toBe(3);
});
