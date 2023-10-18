<script lang="ts">
  import type { Event } from "../models/event.model";
  import { Service } from "../services";

  export let events: Event[];
  let departureTime = "14:00";
  let arrivalTime = "15:00";

  $: {
    events;
    updateTimes(true);
  }

  function createEvent() {
    const event = {
      id: Service.uuid(),
      name: "",
      time: "00:30",
    };

    events = [...events, event];
  }

  function updateTimes(isArrival: boolean) {
    const MINUTE_TO_MILLISECONDS = 60_000;
    const baseTime = isArrival ? arrivalTime : departureTime;
    const baseDate = new Date(2000, 8, 23);

    const timeToAdd = events.reduce((total, event) => {
      const [hours, minutes] = event.time.split(":");
      const time =
        Number(hours) * (MINUTE_TO_MILLISECONDS * 60) +
        Number(minutes) * MINUTE_TO_MILLISECONDS;

      return total + (isArrival ? -time : time);
    }, 0);

    const [baseHours, baseMinutes] = baseTime.split(":");
    baseDate.setHours(Number(baseHours));
    baseDate.setMinutes(Number(baseMinutes));
    baseDate.setMilliseconds(timeToAdd);

    const dateToTime = `${addZero(baseDate.getHours())}:${addZero(
      baseDate.getMinutes()
    )}`;

    if (isArrival) {
      departureTime = dateToTime;
    } else {
      arrivalTime = dateToTime;
    }
  }

  function addZero(value: number) {
    return `${value < 10 ? "0" : ""}${value}`;
  }
</script>

<footer>
  <section>
    <p>Départ</p>
    <input
      bind:value={departureTime}
      on:change={() => updateTimes(false)}
      type="time"
      class="time"
    />
  </section>
  <button on:click={createEvent}>
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
        d="M32 64C40.4869 64 48.6263 60.6286 54.6274 54.6274C60.6286 48.6263 64 40.4869 64 32C64 23.5131 60.6286 15.3737 54.6274 9.37258C48.6263 3.37142 40.4869 0 32 0C23.5131 0 15.3737 3.37142 9.37258 9.37258C3.37142 15.3737 0 23.5131 0 32C0 40.4869 3.37142 48.6263 9.37258 54.6274C15.3737 60.6286 23.5131 64 32 64ZM35 19C35 18.2044 34.6839 17.4413 34.1213 16.8787C33.5587 16.3161 32.7957 16 32 16C31.2044 16 30.4413 16.3161 29.8787 16.8787C29.3161 17.4413 29 18.2044 29 19V29H19C18.2044 29 17.4413 29.3161 16.8787 29.8787C16.3161 30.4413 16 31.2044 16 32C16 32.7957 16.3161 33.5587 16.8787 34.1213C17.4413 34.6839 18.2044 35 19 35H29V45C29 45.7957 29.3161 46.5587 29.8787 47.1213C30.4413 47.6839 31.2044 48 32 48C32.7957 48 33.5587 47.6839 34.1213 47.1213C34.6839 46.5587 35 45.7957 35 45V35H45C45.7957 35 46.5587 34.6839 47.1213 34.1213C47.6839 33.5587 48 32.7957 48 32C48 31.2044 47.6839 30.4413 47.1213 29.8787C46.5587 29.3161 45.7957 29 45 29H35V19Z"
        fill="#8D8D8D"
      />
    </svg>
  </button>
  <section>
    <p>Arrivée</p>
    <input
      bind:value={arrivalTime}
      on:change={() => updateTimes(true)}
      type="time"
      class="time"
    />
  </section>
</footer>

<style>
  footer {
    position: fixed;
    inset: auto 0 0 0;
    display: flex;
    background: #262626;
    border-top: 2px solid #404040;
  }

  p,
  section {
    flex: 1 1 0%;
  }

  button {
    flex: none;
  }

  section,
  button {
    padding: 16px 32px;
  }
</style>
