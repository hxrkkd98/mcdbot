// src/composables/useBotSystem.js
import { ref, watch } from 'vue';

export function useBotSystem() {
  const pending = ref([]);
  const complete = ref([]);
  const bots = ref([]);
  let orderCounter = 1;
  let botCounter = 1; // Internal tracker

  const addOrder = (type) => {
    const newOrder = { id: orderCounter++, type };
    if (type === 'VIP') {
      const lastVip = pending.value.findLastIndex(o => o.type === 'VIP');
      pending.value.splice(lastVip + 1, 0, newOrder);
    } else {
      pending.value.push(newOrder);
    }
  };

  const addBot = () => {
    bots.value.push({
      id: botCounter++, // ID stays unique
      status: 'IDLE',
      currentOrder: null,
      timer: null,
      startTime: null,
      duration: 10000 
    });
  };

  const removeBot = () => {
    const bot = bots.value.pop();
    // Do NOT botCounter-- here. Keep IDs unique like a serial number.
    if (bot && bot.status === 'PROCESSING') {
      clearTimeout(bot.timer);
      pending.value.unshift(bot.currentOrder); 
    }
  };

  // FIXED: Auto-Cook Manager now loops through all available bots
  watch([pending, bots], () => {
    // Check all bots that are currently IDLE
    bots.value.forEach(bot => {
      if (bot.status === 'IDLE' && pending.value.length > 0) {
        const order = pending.value.shift();
        
        bot.status = 'PROCESSING';
        bot.currentOrder = order;
        bot.startTime = Date.now();

        bot.timer = setTimeout(() => {
          complete.value.push(order);
          bot.status = 'IDLE';
          bot.currentOrder = null;
          bot.timer = null;
          bot.startTime = null;
        }, 10000);
      }
    });
  }, { deep: true });

  return { pending, complete, bots, addOrder, addBot, removeBot };
}