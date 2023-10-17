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
    const MINUTE_TO_MILLISECONDS = 1000 * 60;
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

    isArrival ? (departureTime = dateToTime) : (arrivalTime = dateToTime);
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
    <!-- ... Votre icône ... -->
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
