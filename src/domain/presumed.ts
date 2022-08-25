import { compose } from "lodash/fp";
import { percentage } from "../shared/math";

export type Invoicing = number;

export const pis = percentage(0.65);
export const cofins = percentage(3);
export const irpj = (invoicing: Invoicing) => {
  const base = compose(percentage(15), percentage(8))(invoicing);
  const additional = base > 20000 ? percentage(10)(base - 20000) : 0;
  return base + additional;
};

export const csll = compose(percentage(9), percentage(12));
export const totalValue = (invoicing: Invoicing) => {
  return [pis, cofins, irpj, csll]
    .map((calculate) => calculate(invoicing))
    .reduce((x, y) => x + y, 0);
};
