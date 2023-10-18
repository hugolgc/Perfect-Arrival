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
  <button on:click={deleteEvent}>
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32 0C14.3262 0 0 14.3262 0 32C0 49.6738 14.3262 64 32 64C49.6738 64 64 49.6738 64 32C64 14.3262 49.6738 0 32 0ZM41.8462 34.4615C42.499 34.4615 43.1251 34.2022 43.5867 33.7406C44.0484 33.2789 44.3077 32.6528 44.3077 32C44.3077 31.3472 44.0484 30.7211 43.5867 30.2594C43.1251 29.7978 42.499 29.5385 41.8462 29.5385H22.1538C21.501 29.5385 20.8749 29.7978 20.4133 30.2594C19.9516 30.7211 19.6923 31.3472 19.6923 32C19.6923 32.6528 19.9516 33.2789 20.4133 33.7406C20.8749 34.2022 21.501 34.4615 22.1538 34.4615H41.8462Z"
        fill="#8D8D8D"
      />
    </svg>
  </button>
  <input
    bind:value={event.name}
    type="text"
    placeholder="Événement"
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
    text-align: center;
  }

  .time {
    color: rgba(245, 245, 245, 0.5);
  }
</style>
