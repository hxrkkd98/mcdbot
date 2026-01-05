<script setup>
import { useBotSystem } from './composables/useBotSystem';
import OrderCard from './components/OrderCard.vue';
import BotCard from './components/BotCard.vue';

const { pending, complete, bots, addOrder, addBot, removeBot } = useBotSystem();
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 text-slate-900">
    <header class="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 md:flex-row">
      <div>
        <h1 class="text-2xl font-black tracking-tight text-slate-800">
          McDonald's <span class="text-yellow-500 underline decoration-yellow-500/30">Bot Kitchen</span>
        </h1>
        <p class="text-sm font-medium text-slate-500 uppercase tracking-widest">Automation Dashboard</p>
      </div>

      <div class="flex flex-wrap gap-3">
        <button @click="addOrder('NORMAL')" 
                class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 text-shadow-sm">
          Normal Order
        </button>
        <button @click="addOrder('VIP')" 
                class="rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-black text-yellow-950 shadow-md transition-all hover:bg-yellow-500 active:scale-95">
          VIP Order
        </button>
        <button @click="addBot" 
                class="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700 active:scale-95 text-shadow-sm">
          + Bot
        </button>
        <button @click="removeBot" 
                class="rounded-lg bg-rose-100 px-5 py-2.5 text-sm font-bold text-rose-700 transition-all hover:bg-rose-200 active:scale-95">
          - Bot
        </button>
      </div>
    </header>

    <main class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <section class="flex flex-col rounded-3xl bg-slate-100/50 p-5 border-2 border-dashed border-slate-200">
        <h2 class="mb-6 flex items-center gap-2 text-lg font-bold text-slate-700">
          <span class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          PENDING ({{ pending.length }})
        </h2>
        <div class="space-y-3">
          <OrderCard v-for="o in pending" :key="o.id" :order="o" />
        </div>
      </section>

      <section class="flex flex-col rounded-3xl bg-white p-5 shadow-xl shadow-slate-200/50 border border-slate-100">
        <h2 class="mb-6 flex items-center gap-2 text-lg font-bold text-slate-700">
          <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          COOKING BOTS
        </h2>
        <div class="space-y-4">
          <BotCard v-for="b in bots" :key="b.id" :bot="b" />
        </div>
      </section>

      <section class="flex flex-col rounded-3xl bg-emerald-50/50 p-5 border border-emerald-100">
        <h2 class="mb-6 flex items-center gap-2 text-lg font-bold text-emerald-800">
          <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
          COMPLETE
        </h2>
        <div class="space-y-2">
          <div v-for="o in complete" :key="o.id" 
               class="flex items-center gap-3 rounded-xl bg-white p-4 text-sm font-bold text-slate-600 shadow-sm border border-emerald-100 animate-in fade-in slide-in-from-bottom-2">
            <span class="text-emerald-500">✔</span> Order #{{ o.id }}
          </div>
        </div>
      </section>
    </main>
  </div>
</template>