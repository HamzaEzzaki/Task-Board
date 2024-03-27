// store/index.js
import { createStore } from 'vuex';

export default createStore({
  
  state: {
    columns: [
      { key: 'todo', title: 'To Do', tasks: [] },
      { key: 'inProgress', title: 'In Progress', tasks: [] },
      { key: 'review', title: 'Review', tasks: [] },
      { key: 'done', title: 'Done', tasks: [] }
    ],
    showModal: false,
    newTask: { id: 1, name: '', description: '', level: '' },
    currentColumnkey: '' ,
    showUpdateModal: false,
    Columnkey: null ,
    updatedTask: { id: null, name: ' ', description: ' ', level: ' ' },

  },
  mutations: {
    ADD_TASK(state, { task }) {
      const column = state.columns.find(col => col.key === state.currentColumnkey);
      if (column) {
        const newTask = { ...task, id: column.tasks.length + 1 };
        column.tasks.push(newTask);
      }
    },
    setShowModal(state, showModal) {
      state.showModal = showModal;
    },
    setNewTask(state, newTask) {
      state.newTask = newTask;
    },
    setCurrentColumnKey(state, columnkey) {
      state.currentColumnkey = columnkey
    },
    setTaskLevel(state, level) {
      state.newTask.level = level;
    },
    
    DELETE_TASK(state, { columnKey, taskId }) {

      const column = state.columns.find(col => col.key === columnKey);
      if (column) {
        column.tasks = column.tasks.filter(task => task.id !== taskId);
      }
    },
  
    UPDATE_TASK(state, { updatedTask }) {
      console.log('metatuidmldam' ,updatedTask)
      const column = state.columns.find(col => col.key === state.currentColumnkey);
      if (column) {
        const index = column.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          // Directly update the task in the array
          column.tasks[index] = updatedTask;
        }
      }
    },

    SHOW_UPDATE_MODAL(state) {
      state.showUpdateModal = true;
    },
    HIDE_UPDATE_MODAL(state) {
      state.showUpdateModal = false;
    },

    SET_UPDATED_TASK(state, task) {
      state.updatedTask = task;
    },
    SET_COLUMNKEY(state, Columnkey) {
      state.Columnkey = Columnkey;
    },
    MOVE_TASK_WITHIN_COLUMN(state, { columnKey, fromIndex, toIndex }) {
      const column = state.columns.find(col => col.key === columnKey);
      const taskToMove = column.tasks.splice(fromIndex, 1)[0];
      column.tasks.splice(toIndex, 0, taskToMove);
    },
    // Move task between columns
    MOVE_TASK_BETWEEN_COLUMNS(state, { fromColumnKey, toColumnKey, fromIndex, toIndex }) {
      const fromColumn = state.columns.find(col => col.key === fromColumnKey);
      const taskToMove = fromColumn.tasks.splice(fromIndex, 1)[0];
      const toColumn = state.columns.find(col => col.key === toColumnKey);
      toColumn.tasks.splice(toIndex, 0, taskToMove);
    }

  },

  actions: {
    
    openModal({ commit }, column) {
      commit('setCurrentColumnKey', column);
      console.log('openmodal ', column)
      commit('setShowModal', true);
    },
    closeModal({ commit }) {
      commit('setShowModal', false);
      commit('setNewTask', { name: '', description: '' });
    },
    
    addTask({ commit, state }, { task }) {
      commit('ADD_TASK', { task });
      commit('setShowModal', false);
      commit('setNewTask', { id: state.newTask.id, name: '', description: '', level: 'Medium' });
      
    },

    setTaskLevel({ commit }, level) {
      commit('setTaskLevel', level);
    },
    deleteTask({ commit, state }, { columnKey, taskId }) {
      commit('DELETE_TASK', { columnKey, taskId });
    },
  
    
    deleteTask({ commit, state }, { columnKey, taskId }) {
      commit('DELETE_TASK', { columnKey, taskId });
    },


    setUpdatedTask({ commit }, task) {
      commit('SET_UPDATED_TASK', task);
      commit('SHOW_UPDATE_MODAL');
    },
    setColumnkey({ commit }, Columnkey) {
      commit('SET_COLUMNKEY', Columnkey);
    },

    updateTask({ commit },   updatedTask) {
      console.log('action :' , updatedTask)
      commit('UPDATE_TASK', { updatedTask});
    
      commit('HIDE_UPDATE_MODAL');
    },

   

    hideUpdateModal({ commit }) {
      commit('HIDE_UPDATE_MODAL');
    },
    
    // Handle drag end within the same column
    moveTaskWithinColumn({ commit }, { columnKey, fromIndex, toIndex }) {
      commit('MOVE_TASK_WITHIN_COLUMN', { columnKey, fromIndex, toIndex });
    },
    // Handle drag end between columns
    moveTaskBetweenColumns({ commit }, { fromColumnKey, toColumnKey, fromIndex, toIndex }) {
      commit('MOVE_TASK_BETWEEN_COLUMNS', { fromColumnKey, toColumnKey, fromIndex, toIndex });
    }

  },

  modules: {
    // Optionally, you can define separate modules here
  }
});
