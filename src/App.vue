<script setup lang="ts">
import { RouterView } from "vue-router"
import Loading from "@/components/Loading.vue"
import ClearStorage from "@/components/ClearStorage.vue"
</script>

<template>
	<loading></loading>
	<clear-storage></clear-storage>
	<router-view />
</template>

<style scoped></style>
