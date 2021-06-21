import { io } from "socket.io-client";

export default class Session {
    constructor() {
        this.socket = io();
    }
}