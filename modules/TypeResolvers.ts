import { Homev3 } from "@/models/homev3";
import { Menu } from "@/models/menu";






const KontentDelivery = require("@kentico/kontent-delivery");





export const TypeResolver = [
  new KontentDelivery.TypeResolver("Menu", (rawData: any) => new Menu()),
  new KontentDelivery.TypeResolver("Homev3", (rawData: any) => new Homev3()),



];
