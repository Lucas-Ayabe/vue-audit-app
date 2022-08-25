<script setup lang="ts">
import _ from "lodash";
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import * as Presumed from "../domain/presumed";

const rawInvoicings = ref("");
const invoicings = computed(() =>
  rawInvoicings.value
    .split(";")
    .map(Number)
    .filter((n) => !_.isNaN(n))
);

const viewModel = computed(() => {
  const toBrl = (value: number) =>
    value.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
    });

  return invoicings.value.map((invoicing) => ({
    pis: toBrl(Presumed.pis(invoicing)),
    cofins: toBrl(Presumed.cofins(invoicing)),
    irpj: toBrl(Presumed.irpj(invoicing)),
    csll: toBrl(Presumed.csll(invoicing)),
    total: toBrl(Presumed.totalValue(invoicing)),
  }));
});
</script>

<template>
  <article>
    <h3>Calculadora de imposts usando valor presumido</h3>
    <input type="text" v-model="rawInvoicings" />

    <table>
      <caption class="caption">
        Impostos
      </caption>
      <thead>
        <th scope="col">PIS</th>
        <th scope="col">COFINS</th>
        <th scope="col">IRPJ</th>
        <th scope="col">CSLL</th>
        <th scope="col">TOTAL</th>
      </thead>
      <tbody>
        <template v-for="result in viewModel">
          <tr>
            <td>{{ result.pis }}</td>
            <td>{{ result.cofins }}</td>
            <td>{{ result.irpj }}</td>
            <td>{{ result.csll }}</td>
            <td>{{ result.total }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </article>
</template>

<style scoped>
.caption {
  text-align: left;
}
</style>
