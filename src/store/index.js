import { makeAutoObservable, onBecomeObserved } from "mobx";
import { getComment, addComment, deleteComment, getTasks, getTask, getUsersFilter, getUsers, getUser, editUser, loginUser, addOrEditTask, deleteTask, changeStatus, addWorkTime } from '../api';

class TasksStore {
	data = [];
	currentTask = {};
	filtredData =[];
	filterForm = {};
	pagination = {
		page:0,
		limit: 10,
		total:0,
	};
	currentComment = [];

	constructor() {
		makeAutoObservable(this, {}, {
		  autoBind: true,
		});
		onBecomeObserved(this, 'filtredData', this.fetch);
	  }

	*fetch() {
		const response = yield getTasks(this.filterForm, this.pagination);
		this.data = response.data;
		this.filtredData = response.data; 
		this.pagination.total = response.total;
	}

	*addTask(data) {
		yield addOrEditTask(data);
		yield this.fetch();
	}

	*editTask(data) {
		yield addOrEditTask(data);
		yield this.fetch();
	}

	*deleteTask(id) {
		yield deleteTask(id);
		yield this.fetch;
	}

	*getTask(id) {
		const response = yield getTask(id);
		this.currentTask = response;
		const responceCom = yield getComment(this.currentTask.id);
		this.currentComment = responceCom;
	}

	*addWorkTime(id, timeData) {
		yield addWorkTime(id, timeData);
	}

	getTaskOnFilter(form) {
		this.filterForm = form;
		this.fetch();
	}

	*changeStatus(id, status) {
		yield changeStatus(id, status);
		yield this.fetch();
		yield this.getTask(id);
	}

	// Comments //

	*addComment(data) {
		yield addComment(data);
	}

	*deleteComment(id) {
		yield deleteComment(id);
	}
}

class UsersStore {
	data = [];
	allUsers = [];
	usersFilter = {};
	pagination = {
		page:0,
		limit:10,
		total:0,
	};

	constructor() {
		makeAutoObservable(this, {}, {
		autoBind: true,
		});

		onBecomeObserved(this, 'data', this.fetch);
	}

	*getUsers() {
		const response = yield getUsers();
    	response.map(item => {this.allUsers[item.id] = item.username});
	}

	*getUser(id) {
		return getUser(id);
	}

	loginUser(login, password) {
		return loginUser(login, password);
	}


	*fetch() {
		const response = yield getUsersFilter(this.usersFilter, this.pagination);
		this.data = response.data;
		this.pagination.total = response.total; 
  	}

	*editUser(data) {
		yield editUser(data);
		yield this.fetch();
	  }

	*deleteUser(id) {
		yield this.deleteUser(id);
		yield this.fetch();
	}
	
};

export const tasks = new TasksStore();
export const users = new UsersStore();