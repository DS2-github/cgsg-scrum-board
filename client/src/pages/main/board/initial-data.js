const initialData = {
    tasks: {
        'task-0': { id: 'task-0', content: "", author: "Vasya Pupkin", },
        'task-1': { id: 'task-1', content: "gdhxfnxb", author: "Naklal Kalov", },
        'task-2': { id: 'task-2', content: "zfvzfv", author: "Kirill Submitov", },
        'task-3': { id: 'task-3', content: "tezvzdfvzdst3", author: "Daniil Smirnov", },
        'task-4': { id: 'task-4', content: "tzdveszdvzdfvzdt0", author: "Andrew Chugunov", },
        'task-5': { id: 'task-5', content: "zdvdtefvzfdvfzdst0", author: "Lana Sashovayz", },
        'task-6': { id: 'task-6', content: "tesvzdfvzdvt1", author: "Aleksey Romanov", },
    },
    columns: {
        'column-0': {
            id: 'column-0',
            tittle: 'To do',
            taskIds: ['task-0', 'task-5', 'task-2']
        },
        'column-1': {
            id: 'column-1',
            tittle: 'In progress',
            taskIds: ['task-1']
        },
        'column-2': {
            id: 'column-2',
            tittle: 'Review',
            taskIds: ['task-4', 'task-6']
        },
        'column-3': {
            id: 'column-3',
            tittle: 'Done',
            taskIds: ['task-3']
        },
    },
    columnOrder: ['column-0', 'column-1', 'column-2', 'column-3'],
    numOfTasks: 6,
    numOfColumns: 3,
};

export default initialData;
