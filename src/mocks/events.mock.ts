import type { Event } from "../models/event.model";
import { Service } from "../services";

export const EVENTS: Event[] = [
  { id: Service.uuid(), name: "Voiture", time: "00:15" },
  { id: Service.uuid(), name: "Train", time: "00:45" },
];
