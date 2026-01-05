<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps(['bot']);
const remaining = ref(0);
let rafId = null;

const updateTimer = () => {
  if (props.bot.status === 'PROCESSING' && props.bot.startTime) {
    const elapsed = Date.now() - props.bot.startTime;
    const left = Math.max(0, (props.bot.duration - elapsed) / 1000);
    remaining.value = left.toFixed(1);
  } else {
    remaining.value = 0;
  }
  rafId = requestAnimationFrame(updateTimer);
};

onMounted(() => {
  updateTimer();
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-inner">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-slate-700 italic">Bot</h3>
      <span :class="['rounded px-2 py-0.5 text-[10px] font-black uppercase transition-colors', 
                     bot.status === 'IDLE' ? 'bg-slate-200 text-slate-500' : 'bg-emerald-500 text-white']">
        {{ bot.status }}
      </span>
    </div>

    <div v-if="bot.status === 'PROCESSING' && bot.currentOrder" class="mt-3">
      <div class="flex justify-between items-end mb-1">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
          Cooking #{{ bot.currentOrder.id }}
        </p>
        <p class="text-xs font-mono font-bold text-emerald-600">{{ remaining }}s</p>
      </div>
      
      <div class="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div 
          class="h-full bg-emerald-500"
          :style="{ 
            width: `${(remaining / 10) * 100}%`,
            transition: 'width 0.1s linear' 
          }"
        ></div>
      </div>
    </div>
    
    <p v-else class="mt-2 text-xs font-medium text-slate-400 uppercase tracking-tight">System Standby...</p>
  </div>
</template>