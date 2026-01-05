<script setup>
defineProps(['order']);
</script>
<template>
  <div :class="[
    'flex items-center justify-between rounded-xl border p-4 shadow-sm transition-all bg-white',
    order.type === 'VIP' ? 'border-yellow-200 bg-yellow-50/30' : 'border-slate-200'
  ]">
    <div>
      <p :class="['text-[10px] font-black uppercase tracking-tighter', 
                  order.type === 'VIP' ? 'text-yellow-600' : 'text-blue-600']">
        {{ order.type }}
      </p>
      <p class="text-lg font-black text-slate-800">#{{ order.id }}</p>
    </div>
    <div class="h-2 w-2 rounded-full bg-slate-300"></div>
  </div>
</template>