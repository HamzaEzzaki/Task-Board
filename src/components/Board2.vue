
<template>
  
  <!-- Filter dropdown -->
     <!-- Filter dropdown -->
     <FilterDropdown @selected="handleSelectedLevel" />
    <!-- Task Columns -->
    <div class="flex justify-between gap-8 mr-8 ml-8 px-4 py-2">
    <div v-for="(column, index) in columns" :key="index" class="relative w-1/4">
      <h2 class="text-lg text-btntxt font-semibold mb-4">{{ column.title }}</h2>
      <div class="absolute top-0 right-0 flex justify-between pr-1 py-2">
        <img src="../assets/plus.svg" alt="Logo" @click="openModal(column.key)" class=" bg-primary2 hover:bg-btnhover  h-4 w-4 ml-1">
        <img src="../assets/3dots.svg" alt="Logo" class=" h-4 w-4 ml-1">
      </div>
      <div class="min-h-96 bg-cardbg rounded-lg p-4">
        <div class="flex flex-col justify-between h-full">
          <div class="flex-1">
            <draggable v-model="column.tasks" group="nice" class="h-[160px]  rounded-lg mb-1 " drag-class="drag" ghost-class="ghost"  @change="log( $event,column.key)">
                <template v-if="filterLevel !== 'All'">
                      <TaskItem v-for="(task, taskIndex) in column.tasks.filter(t => t.level === filterLevel)" :key="taskIndex" :task="task" @update-task="openUpdateModal(column.key, task)" @delete-task="handleDeleteTask(column.key, task.id)" />
                      </template>
                <template v-else>
                      <TaskItem v-for="(task, taskIndex) in column.tasks" :key="taskIndex" :task="task" @update-task="openUpdateModal(column.key, task)" @delete-task="handleDeleteTask(column.key, task.id)" @change="log(column.key)" />
                      </template>
            </draggable>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Task Modal -->
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
  <div v-on-click-outside="closeModal" class="bg-white p-6 rounded-xl flex flex-col text-gray-text gap-4 shadow-gray3 shadow-md w-96">
    <h2 class="text-lg font-bold mb-4 text-center">Add Task</h2>
    <div class="flex flex-col gap-2">
      <label for="taskDescription" class="text-xs font-semibold">Task name</label>
      <input type="text" placeholder="Task Name" v-model="newTask.name" class="border border-gray-300 rounded-lg px-3 py-2 w-full">
    </div>
    <div class="flex flex-col gap-2">
      <label for="taskDescription" class="text-xs font-semibold">Description</label>
      <textarea id="taskDescription" placeholder="Task Description" v-model="newTask.description" class="border border-gray-300 rounded-lg px-3 py-2 w-full"></textarea>
    </div>

    <div class="flex flex-col gap-2">
      <label for="taskLevel" class="text-xs font-semibold">Task Level:</label>
      <select v-model="newTask.level" id="taskLevel" class="border border-gray-300 rounded-lg px-3 py-2 w-full">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>

    <div class="flex justify-end">
      <button @click="addTask({ ...newTask })" class="w-fit rounded-2xl py-1 px-4 bg-green-500 text-white mr-2">Add</button>
      <button @click="closeModal" class="w-fit rounded-2xl py-1 px-4 bg-red text-white mr-2">Cancel</button>
    </div>
  </div>
</div>

  <!-- Task Modal end-->

  <!-- Task Modal for Update -->
  <div  v-if="showUpdateModal" class="modal">
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
    <div v-on-click-outside="closeUpdateModal">
    <div class="bg-white p-6 rounded-xl flex flex-col text-gray-text gap-1 shadow-gray3 shadow-md w-96">
      <h2 class="text-lg font-bold mb-4 text-center">Update Task</h2>
        <div  class="flex flex-col gap-1 mb-2">
        <span class="text-xs font-semibold">Task name</span>
        <input type="text" v-model="localtask.name" class="border border-gray-300 rounded-lg px-3 py-2 w-full">
      </div>
 
        <div class="flex flex-col gap-1 mb-2">
          <div class="flex items-center gap-1">
            <span class="text-xs font-semibold">Description</span>
            <img class="w-4 h-4" src="../assets/description.svg" alt="">
          </div>
          <textarea v-model="localtask.description" class="border border-gray-300 rounded-lg px-3 py-2 w-full"></textarea>
        </div>

        <div class="mb-2 relative">
          <label for="updatedTaskLevel" class="block text-xs font-semibold">Task Level:</label>
          <select v-model="localtask.level" id="updatedTaskLevel" class="border border-gray-300 mb-3 rounded-lg px-3 py-2 w-full">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div class="flex justify-end">
          <button @click="updateTask" class="w-fit rounded-2xl py-1 px-4 bg-green-500 text-white mr-2">Update</button>
          <button @click="closeUpdateModal" class="w-fit rounded-2xl py-1 px-4 bg-red text-white mr-2">Cancel</button>
        </div>
       
    </div>
  </div>
  </div>
</div>



</template>

<script setup>
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import TaskItem from './Task.vue';
import FilterDropdown  from './FilterDropdown.vue';
import { vOnClickOutside } from '@vueuse/components'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ref } from 'vue'


const store = useStore()

// Mapping state
const columns = computed(() => store.state.columns)
const showModal = computed(() => store.state.showModal)
const newTask = computed(() => store.state.newTask)
const currentColumnkey = computed(() => store.state.currentColumnkey)
const localtask= ref({ name: '', description: '' ,level: ''})
const showUpdateModal = computed(() => store.state.showUpdateModal)
const updatedTask = computed(() => store.state.updatedTask)

// Mapping actions
const openModal = (columnkey) => {
  console.log( "currentkey ",columnkey)
  store.dispatch('openModal', columnkey)
  
}

const addTask = ( task) => {
  store.dispatch('addTask', { task })
  console.log('addTask', columns )
}
const closeModal = () => store.dispatch('closeModal')

const handleDeleteTask = (columnKey, taskId) => {
  store.dispatch('deleteTask', { columnKey, taskId, });

}





const openUpdateModal = (columnkey,task) => {

  store.dispatch('setUpdatedTask', task)
  localtask.value.id = updatedTask.value.id
  localtask.value.name = updatedTask.value.name
  localtask.value.description = updatedTask.value.description
  localtask.value.level = localtask.value.level
  store.commit('setCurrentColumnKey', columnkey)  
  
}





const updateTask = () => {
  var task ={id : 0, name: '', description: '' ,level: ''}
  task.id = localtask.value.id 
  task.name = localtask.value.name   
  task.description = localtask.value.description   
  task.level = localtask.value.level  
  console.log("board action",task)
  store.dispatch('updateTask',task )
  // store.commit('SET_UPDATED_TASK', null);
}


 

const closeUpdateModal = () => {
  store.dispatch('hideUpdateModal');
  console.log("hidiiiing")
}






const filteredTasks = computed(() => {
  const allTasks = columns.value.flatMap(column => column.tasks);
  const filtered = allTasks.filter(task => filterLevel.value === 'All' || task.level === filterLevel.value);
  return filtered;
});

 
const filterLevel = ref('All');


const updateFilterLevel = (level) => {
  filterLevel.value = level;
};

function handleSelectedLevel(level) {
  filterLevel.value = level;
  console.log('Selected level in parent:', level);
  // Now you can use the selected level in your parent component
}

const log = (evt,columnkey) => {
    console.log("wal l7maaaaaaaaaaaaaaa9",evt)
    console.log("wal l7maaaaaaaaaaaaaaa9",columnkey)
  }
</script>


 

