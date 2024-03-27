
<template>
  <div>
  <div  class=" h-[160px] card bg-white rounded-xl flex flex-col text-gray-text p-2 mt-3 textbold gap-1 shadow-gray3 shadow-md" @mouseover="isHovered = true"
    @mouseleave="isHovered = false">

    <div class="flex items-center gap-3">
    <img src="../assets/check.svg" alt="">
    <span class="text-lg font-bold">{{ task.name }}{{ task.index }}</span>
    <img @click="edit = !edit" v-show="isHovered" class="h-4 w-4 mb-3 ml-auto" src="../assets/3dots.svg" alt="Menu">
    <div v-on-click-outside="closeModal2">
        <div v-show="edit" class="absolute right-0 w-32 z-10 rounded-xl bg-white shadow-sm border-[1px] border-gray-200 shadow-gray-300 p-4 flex flex-col gap-3">
            <div @click="openUpdateModal" class="flex gap-3 items-center hover:text-indigo-800  text-btntxt">
                <img src="../assets/edit.svg" alt="">
                <span class="text-base font-semibold ">Edit</span>
            </div>
            <div @click="deleteTask" class="flex gap-3 items-center hover:text-red  text-btntxt">
                <img  src="../assets/delete.svg" alt="">
                <span class="text-base font-semibold  ">Delete</span>
            </div>
        </div>
    </div>
</div>

    <div class="flex flex-col pl-7  gap-3">

      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-1">
          <span class="text-xs font-semibold">Description</span>
          <img class="w-4 h-4" src="../assets/description.svg"  alt="">
        </div>
        <p class="text-[11px] ">{{task.description}}</p>
      </div>

      <div class=" relative w-fit" >
        <div  v-on-click-outside="closeModal1">
        <button :class="['w-fit', 'rounded-2xl', 'py-0.3', 'px-3', getButtonColor(task.level)]" @click="change" >{{ task.level }}</button>
        
        <div v-show="showlevel"  class=" dorpdown absolute top-7 w-48 z-10 rounded-xl bg-white shadow-sm border-[1px] border-gray-200 shadow-gray-300 p-4 flex flex-col gap-3" ref="outside" >
            <div class="flex gap-3" @click="changeLevel('Low', 'bg-sky')">
              <img :class="{ 'visible': task.level  === 'Low', 'invisible': task.level  !== 'Low' }" src="../assets/checklvl.svg" alt="">
              <button class="w-fit rounded-2xl py-0.3 px-3 bg-sky">Low</button>
            </div>
            <div class="flex gap-3" @click="changeLevel('Medium', 'bg-yellow')">
              <img :class="{ 'visible': task.level  === 'Medium', 'invisible': task.level  !== 'Medium' }" src="../assets/checklvl.svg" alt="">
              <button class="w-fit rounded-2xl py-0.3 px-3 bg-yellow">Medium</button>
            </div>
            <div class="flex gap-3" @click="changeLevel('High', 'bg-purple')">
              <img :class="{ 'visible': task.level  === 'High', 'invisible': task.level  !== 'High' }" src="../assets/checklvl.svg" alt="">
              <button class="w-fit rounded-2xl py-0.3 px-3 bg-purple">High</button>
            </div>
        </div></div>
      </div>

      <div class="flex gap-4 items-center">
        <img class="h-7" src="../assets/u1.svg" alt="">
        <span id="current-date">Today - teest</span>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components'
// Props
// import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});
function closeModal1() {
  showlevel.value = false;
  console.log("click outside");
}

function closeModal2() {
  edit.value = false;
  console.log("click outside2");
}

function getBtnColor(getButtonColor) {
  if (level === 'Low') {
            return 'bg-sky '; // Example: High level is red background
        } else if (level === 'Medium') {
            return 'bg-yellow '; // Example: Medium level is yellow background
        } 
        else if (level === 'High') {
            return 'bg-purple'; // Example: Medium level is yellow background
        } 
        else {
            return 'bg-green-500 '; // Example: Low level is green background
        }
}



const getButtonColor = (name) => {
  // Function to determine the button color based on task name
  // You can customize this logic as per your requirement
  if (name === 'Low') {
    return 'bg-sky'; // Example color for 'Low' tasks
  } else if (name=== 'Medium') {
    return 'bg-yellow'; // Example color for 'Medium' tasks
  } else if (name=== 'High') {
    return 'bg-purple'; // Example color for 'High' tasks
  } else {
    return 'bg-gray'; // Default color
  }
};
// Data
const showlevel = ref(false);
const buttonLabel = ref(props.task.level);
const buttonColor = ref(getButtonColor(props.task.level)); // Default color
const isHovered = ref(false);
const edit = ref(false);
const emits = defineEmits(['delete-task', 'update-task'])
// Methods

const change = () => {
  
  showlevel.value = !showlevel.value; // Hide the dropdown after selection
};

const changeLevel = (level, color) => {
  props.task.level = level;
  buttonColor.value = color;
  showlevel.value = false; // Hide the dropdown after selection
};


  // Method to delete task
  const deleteTask = () => {
    // Emitting custom event with task ID or any necessary data
    emits('delete-task', props.task.id) // You can pass any additional data if needed
  }

// Method to open update modal
const openUpdateModal = () => {
  // Emitting custom event to open update modal with task data
  emits('update-task', props.task)
}

</script>

<style scoped>
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.drag .card {
 transform: rotate(5deg);
}
.ghost{
/* background: lightgray;
border-radius: 6px; */
background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%235E6FE1FF' stroke-width='3' stroke-dasharray='20%2c 10%2c 18' stroke-dashoffset='18' stroke-linecap='square'/%3e%3c/svg%3e");
border-radius: 16px;
}
.ghost >div {
  visibility: hidden;

}
</style>

