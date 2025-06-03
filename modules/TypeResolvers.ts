import { Globals2026 } from "@/models/globals2026";
import { Homev3 } from "@/models/homev3";
import { Upcomingeventitem } from "@/models/upcomingeventitem";


const KontentDelivery = require("@kentico/kontent-delivery");

export const TypeResolver = [
  new KontentDelivery.TypeResolver("Globals2026", (rawData: any) => new Globals2026()),
  new KontentDelivery.TypeResolver("Homev3", (rawData: any) => new Homev3()),
  new KontentDelivery.TypeResolver("Upcomingeventitem", (rawData: any) => new Upcomingeventitem()),
];
