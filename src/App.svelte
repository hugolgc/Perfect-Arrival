<script lang="ts">
  import { EVENTS } from "./mocks/events.mock";
  import { Service } from "./services";
  import type { Event } from "./models/event.model";
  import EventDetail from "./components/EventDetail.svelte";
  import Information from "./components/Information.svelte";

  let events: Event[] = [];
  const eventService = Service.collection<Event>("events");

  $: {
    events;
    saveEvents();
  }

  getEvents();

  function getEvents() {
    const eventsFromService = eventService.find(() => true);
    events = eventsFromService.length ? eventsFromService : EVENTS;
  }

  function deleteEvent(event: { detail: Event }) {
    events = events.filter(({ id }) => id !== event.detail.id);
  }

  function saveEvents() {
    eventService.deleteMany(() => true);
    eventService.insertMany(events);
  }
</script>

<main>
  {#each events as event}
    <EventDetail bind:event on:deleteEvent={deleteEvent} />
  {/each}
</main>
<Information bind:events />

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 16px 114px;
  }
</style>
