<script setup lang="ts"></script>

<template>
  <div>
    <div>layout</div>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="" scoped></style>
