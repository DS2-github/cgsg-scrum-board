import { io } from "socket.io-client";

class User {
    constructor() {
        this.username = "";
        this.doneTasks = {};
        this.myProjects = [];
        this.accessRights = "None";
    }
}

export default class Session {
    constructor() {
        this.socket = io();
        this.user = new User();
    }
}