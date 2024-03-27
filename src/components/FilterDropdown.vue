<template>
    <div class="flex justify-between px-4 py-2">

<!-- left -->
    <div class="ml-8 mt-4 items-center"> 
    <button class="w-30 bg-primary2 hover:bg-btnhover px-4 py-1 mr-4 border-primary border-[1px] rounded-md font-semibold  text-btntxt">+ Add Task</button>
    <button  @click="edit = !edit" class="w-30 bg-primary2 hover:bg-btnhover px-9 py-1 mr-2 border-primary border-[1px] rounded-md font-semibold  text-btntxt">Filter</button>
    <div v-show="edit"  class="relative w-fit" >
      <div class="absolute left-12 z-10 rounded-xl bg-white shadow-sm border-[1px] border-gray2 shadow-gray3 p-4 flex flex-row gap-3 items-center">
        <button @click="selectLevel('All')" :class="{ 'peer-checked:bg-sky peer-checked:font-bold peer-checked:text-white': selectedLevel === 'All' }" class="hover:bg-gray0 rounded py-0.5 px-3 text-center font-medium text-gray-text border-[2px] border-gray2">All</button>
        <button @click="selectLevel('Low')" :class="{ 'peer-checked:bg-sky peer-checked:font-bold peer-checked:text-white': selectedLevel === 'Low' }" class="hover:bg-gray0 rounded py-0.5 px-3 text-center font-medium text-gray-text border-[2px] border-gray2">Low</button>
        <button @click="selectLevel('Medium')" :class="{ 'peer-checked:bg-sky peer-checked:font-bold peer-checked:text-white': selectedLevel === 'Medium' }" class="hover:bg-gray0 rounded py-0.5 px-3 text-center font-medium text-gray-text border-[2px] border-gray2">Medium</button>
        <button @click="selectLevel('High')" :class="{ 'peer-checked:bg-sky peer-checked:font-bold peer-checked:text-white': selectedLevel === 'High' }" class="hover:bg-gray0 rounded py-0.5 px-3 text-center font-medium text-gray-text border-[2px] border-gray2">High</button>
      </div>
    </div>
</div>

<!-- right -->
     <div class="flex mr-8 mt-3 items-center">
      <div class="flex justify-between px-4 py-2">
            <img src="../assets/u1.svg" alt="Logo" class="h-7 w-7 ml-1">
            <img src="../assets/u2.svg" alt="Logo" class="h-7 w-7 ml-1">
            <img src="../assets/u2.svg" alt="Logo" class="h-7 w-7 ml-1">
            
     </div>
      <div >
        <button class="w-30 bg-primary2 hover:bg-btnhover px-4 py-1  border-primary border-[1px] rounded-md text-btntxt flex items-center font-semibold ">
    <img src="../assets/share.svg" alt="Share Icon" class="w-4 h-4 mr-4"> 
    <span>Share</span>
  </button>
      </div>
    </div>

    </div>

    
  </template>
  
  <script setup>
  import { ref } from 'vue';
//   import { defineEmits } from 'vue';
  const emits = defineEmits(['selected']);
  const selectedLevel = ref('All');
  const edit = ref(false);
  const selectLevel = (level) => {
    selectedLevel.value = level;
    emits('selected', selectedLevel.value);
  }
  </script>