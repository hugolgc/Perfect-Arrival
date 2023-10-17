<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Event } from "../models/event.model";

  export let event: Event;
  const dispatch = createEventDispatcher<{ deleteEvent: Event }>();

  function deleteEvent() {
    dispatch("deleteEvent", event);
  }
</script>

<section>
  <button on:click={deleteEvent}>Supprimer</button>
  <input
    bind:value={event.name}
    type="text"
    placeholder="Évènement"
    class="text"
  />
  <input bind:value={event.time} type="time" class="time" />
</section>

<style>
  section {
    padding: 16px;
    background: #262626;
    border-radius: 16px;
  }

  .text {
    flex: 1 1 0%;
  }

  .time {
    color: rgba(245, 245, 245, 0.5);
  }
</style>
