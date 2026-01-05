import { ref, watch } from 'vue';

export function useBotSystem() {
  const pending = ref([]);
  const complete = ref([]);
  const bots = ref([]);
  let orderCounter = 1;
  let botCounter = 1;

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
      id: botCounter++,
      status: 'IDLE',
      currentOrder: null,
      timer: null,
      startTime: null, // Track when cooking started
      duration: 10000  // 10 seconds
    });
  };

  const removeBot = () => {
    const bot = bots.value.pop();
    botCounter--;
    if (bot && bot.status === 'PROCESSING') {
      clearTimeout(bot.timer);
      pending.value.unshift(bot.currentOrder); // Re-queue order
    }
  };

  // The "Auto-Cook" Manager
  watch([pending, bots], () => {
    const idleBot = bots.value.find(b => b.status === 'IDLE');
    if (idleBot && pending.value.length > 0) {
      const order = pending.value.shift();
      idleBot.status = 'PROCESSING';
      idleBot.currentOrder = order;
      idleBot.startTime = Date.now();

      idleBot.timer = setTimeout(() => {
        complete.value.push(order);
        idleBot.status = 'IDLE';
        idleBot.currentOrder = null;
        idleBot.timer = null;
        idleBot.startTime = null;
      }, 10000);
    }
  }, { deep: true });

  return { pending, complete, bots, addOrder, addBot, removeBot };
}